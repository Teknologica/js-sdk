import chai from 'chai';
import apiInstance from '../api-instance';
import {
    createTransactionData,
    createLeadSourceData,
    createWebsiteData,
    createCustomerData,
    createPaymentCard,
    createGatewayAccountData
} from '../utils.js';

const expect = chai.expect;

describe('when using the transactions resource', () => {
    const testIds = {with: null, without: null};
    let cachedTransaction;
    let scheduledTransactionId;
    let cachedLeadSource;
    let website;
    let customer;
    let paymentCard;
    let sharedData;

    before(async () => {
        const customerStub = createCustomerData();
        const websiteStub = createWebsiteData();
        let organizations;
        [customer, website, organizations] = await Promise.all([
            apiInstance.customers.create({data: customerStub}),
            apiInstance.websites.create({data: websiteStub}),
            apiInstance.organizations.getAll()
        ]);
        const paymentCardStub = createPaymentCard(false, {
            customerId: customer.fields.id,
            billingAddress: customer.fields.primaryAddress
        });
        const [organization] = organizations.items;
        const gatewayAccountStub = createGatewayAccountData(false, {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        });
        const gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountStub});
        paymentCard = await apiInstance.paymentCards.create({data: paymentCardStub});
        sharedData = {
            customerId: customer.fields.id,
            websiteId: website.fields.id,
            paymentInstrument: {
                method: 'payment-card',
                paymentCardId: paymentCard.fields.id,
                gatewayAccountId: gatewayAccount.fields.id
            }
        };
    });

    it('I can create a transaction without an ID', async () => {
        const transactionStub = createTransactionData(false, sharedData);
        const transaction = await apiInstance.transactions.create({data: transactionStub});
        expect(transaction.fields.customerId).to.be.equal(transactionStub.customerId);
        expect(transaction.fields.websiteId).to.be.equal(transactionStub.websiteId);
        expect(transaction.response.status).to.be.equal(201);
    });

    it('I can create a scheduled transaction without an ID', async () => {
        const transactionStub = createTransactionData(false, sharedData, true);
        const transaction = await apiInstance.transactions.create({data: transactionStub});
        expect(transaction.fields.payment.customerId).to.be.equal(transactionStub.customerId);
        expect(transaction.fields.payment.websiteId).to.be.equal(transactionStub.websiteId);
        expect(transaction.response.status).to.be.equal(202);
    });

    it('I can create a transaction with an ID', async () => {
        const {id, ...data} = createTransactionData(true, sharedData);
        const transaction = await apiInstance.transactions.create({id, data});
        testIds.with = id;
        cachedTransaction = transaction;
        expect(transaction.fields.customerId).to.be.equal(data.customerId);
        expect(transaction.fields.websiteId).to.be.equal(data.websiteId);
        expect(transaction.fields.id).to.be.equal(id);
        expect(transaction.response.status).to.be.equal(201);
    });

    it('I can create a scheduled transaction with an ID', async () => {
        const {id, ...data} = createTransactionData(true, sharedData, true);
        const transaction = await apiInstance.transactions.create({id, data});
        scheduledTransactionId = id;
        expect(transaction.fields.payment.customerId).to.be.equal(data.customerId);
        expect(transaction.fields.payment.websiteId).to.be.equal(data.websiteId);
        expect(transaction.fields.id).to.be.equal(id);
        expect(transaction.response.status).to.be.equal(202);
    });

    it('I can a list of transaction', async () => {
        const transactions = await apiInstance.transactions.getAll();
        expect(transactions.total).to.not.be.equal(0);
        const [transaction] = transactions.items;
        expect(transaction.fields.id).to.not.be.undefined;
        expect(transactions.response.status).to.be.equal(200);
    });

    it('I can get a transaction by its ID', async () => {
        const transaction = await apiInstance.transactions.get({id: testIds.with});
        expect(transaction.fields.id).to.be.equal(testIds.with);
        expect(transaction.response.status).to.be.equal(200);
    });

    it('I can get gateway logs by transaction ID', async () => {
        const gatewayLogs = await apiInstance.transactions.getGatewayLogs({id: testIds.with});
        expect(gatewayLogs.response.status).to.be.equal(200);
    });

    it('I can cancel a scheduled transaction by using its ID', async () => {
        const transaction = await apiInstance.transactions.cancel({id: scheduledTransactionId});
        expect(transaction.fields.id).to.be.equal(scheduledTransactionId);
        expect(transaction.response.status).to.be.equal(201);
    });

    it('I can refund a transaction by using its ID', async () => {
        const transaction = await apiInstance.transactions.refund({id: cachedTransaction.fields.id, data: {amount: cachedTransaction.fields.amount}});
        expect(transaction.fields.parentTransactionId).to.be.equal(cachedTransaction.fields.id);
        expect(transaction.response.status).to.be.equal(201);
    });

    it('I can create a lead source for a transaction by using its ID', async () => {
        const data = createLeadSourceData();
        const leadSource = await apiInstance.transactions.createLeadSource({id: testIds.with, data: data});
        cachedLeadSource = leadSource;
        expect(leadSource.fields.id).to.not.be.undefined;
        expect(leadSource.fields.campaign).to.be.equal(data.campaign);
        expect(leadSource.response.status).to.be.equal(201);
    });

    it('I can update a lead source for a transaction by using its ID', async () => {
        const {campaign} = createLeadSourceData();
        const data = {...cachedLeadSource.fields, campaign};
        const leadSource = await apiInstance.transactions.updateLeadSource({id: testIds.with, data: data});
        expect(leadSource.fields.campaign).to.be.equal(campaign);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can get a lead source by using the transsaction ID', async () => {
        const leadSource = await apiInstance.transactions.getLeadSource({id: testIds.with});
        expect(leadSource.fields.medium).to.be.equal(cachedLeadSource.fields.medium);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can delete a lead source that I just created for a specific transaction ID', async () => {
        const leadSource = await apiInstance.transactions.deleteLeadSource({id: testIds.with});
        expect(leadSource.response.status).to.be.equal(204);
    });
});
