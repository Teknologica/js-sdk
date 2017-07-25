import chai from 'chai';
import apiInstance from '../api-instance';
import {
    createDisputeData,
    createWebsiteData,
    createCustomerData,
    createPaymentCard,
    createGatewayAccountData,
    createTransactionData
} from '../utils';

const expect = chai.expect;

describe('when using the disputes resource', () => {
    const testIds = {with: null, without: null};
    let payment = null;
    let sharedData = null;

    before(async () => {
        const customerStub = createCustomerData();
        const websiteStub = createWebsiteData();
        const [customer, website, organizations] = await Promise.all([
            apiInstance.customers.create({data: customerStub}),
            apiInstance.websites.create({data: websiteStub}),
            apiInstance.organizations.getAll()
        ]);
        const [organization] = organizations.items;
        const paymentCardStub = createPaymentCard(false, {customerId: customer.fields.id, billingAddress: customer.fields.primaryAddress});
        const gatewayAccountStub = createGatewayAccountData(false, {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        });
        const [paymentCard, gatewayAccount] = await Promise.all([
            apiInstance.paymentCards.create({data: paymentCardStub}),
            apiInstance.gatewayAccounts.create({data: gatewayAccountStub})
        ]);
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

    beforeEach(async () => {
        const paymentStub = createTransactionData(false, sharedData);
        payment = await apiInstance.transactions.create({data: paymentStub});
    });

    it('I can create a dispute without an ID', async () => {
        const disputeData = createDisputeData({transactionId: payment.fields.id});
        const dispute = await apiInstance.disputes.create({data: disputeData});
        testIds.without = dispute.fields.id;
        expect(dispute.fields.transactionId).to.be.equal(disputeData.transactionId);
    });

    it('I can create a dispute with an ID', async () => {
        const {id, ...disputeData} = createDisputeData({withId: true, transactionId: payment.fields.id});
        const dispute = await apiInstance.disputes.create({id, data: disputeData});
        expect(dispute.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(dispute.fields.transactionId).to.be.equal(disputeData.transactionId);
    });

    it('I can get a list of disputes', async () => {
        const disputesList = await apiInstance.disputes.getAll();
        expect(disputesList.total).to.not.be.equal(0);
        const [dispute] = disputesList.items;
        expect(dispute.fields.id).to.not.be.undefined;
    });

    it('I can get a dispute by using its ID', async () => {
        const dispute = await apiInstance.disputes.get({id: testIds.with});
        expect(dispute.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a dispute', async () => {
        const disputeData = createDisputeData({transactionId: payment.fields.id});
        const dispute = await apiInstance.disputes.update({id: testIds.without, data: disputeData});
        expect(dispute.fields.id).to.be.equal(testIds.without);
        expect(dispute.fields.acquirerReferenceNumber).to.be.equal(disputeData.acquirerReferenceNumber);
    });
});
