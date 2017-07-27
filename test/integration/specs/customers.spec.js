import chai from 'chai';
import apiInstance from '../api-instance';
import {
    createCustomerData,
    createLeadSourceData,
    createWebsiteData,
    createPaymentCard,
    createGatewayAccountData
} from '../utils.js';

const expect = chai.expect;

describe('when using the customers resource', () => {
    let cachedLeadSource;
    let website;
    let cachedCustomer;
    let paymentCard;
    let gatewayAccount;
    let sharedData;

    before(async () => {
        /**
         *  create a new website and a new gateway account
         */
        const websiteStub = createWebsiteData();
        website = await apiInstance.websites.create({data: websiteStub});
        const organizations = await apiInstance.organizations.getAll();
        const [organization] = organizations.items;
        const gatewayAccountStub = createGatewayAccountData(false, {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        });
        gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountStub});
    });

    it('I can create a customer without an ID', async () => {
        const customerStub = createCustomerData();
        cachedCustomer = await apiInstance.customers.create({data: customerStub});
        expect(cachedCustomer.fields.primaryAddress.firstName).to.be.equal(customerStub.primaryAddress.firstName);
        expect(cachedCustomer.response.status).to.be.equal(201);
    });

    it('I can set a default payment instrument for the newly created customer', async () => {
        const paymentCardStub = createPaymentCard(false, {
            customerId: cachedCustomer.fields.id,
            billingAddress: cachedCustomer.fields.primaryAddress
        });
        paymentCard = await apiInstance.paymentCards.create({data: paymentCardStub});
        sharedData = {
            defaultPaymentInstrument: {
                method: 'payment-card',
                paymentCardId: paymentCard.fields.id,
                gatewayAccountId: gatewayAccount.fields.id
            }
        };
        const customerStub = {...cachedCustomer.fields, ...sharedData};
        const updatedCustomer = await apiInstance.customers.update({id: cachedCustomer.fields.id , data: customerStub});
        expect(updatedCustomer.fields.defaultPaymentInstrument.paymentCardId).to.be.equal(sharedData.defaultPaymentInstrument.paymentCardId);
        expect(updatedCustomer.response.status).to.be.equal(200);
    });

    it('I can create a customer with an ID', async () => {
        const {id, ...data} = createCustomerData(true);
        const customer = await apiInstance.customers.create({id, data});
        expect(customer.fields.primaryAddress.firstName).to.be.equal(data.primaryAddress.firstName);
        expect(customer.response.status).to.be.equal(201);
    });

    it('I can get a customer using its ID', async () => {
        const customer = await apiInstance.customers.get({id: cachedCustomer.fields.id});
        expect(customer.fields.primaryAddress.firstName).to.be.equal(cachedCustomer.fields.primaryAddress.firstName);
        expect(customer.response.status).to.be.equal(200);
    });

    it('I can get a list of customers', async () => {
        const customers = await apiInstance.customers.getAll();
        expect(customers.total).to.not.be.equal(0);
        const [customer] = customers.items;
        expect(customer.fields.id).to.not.be.undefined;
        expect(customers.response.status).to.be.equal(200);
    });

    it('I can create a lead source for a customer by using its ID', async () => {
        const data = createLeadSourceData();
        const leadSource = await apiInstance.customers.createLeadSource({id: cachedCustomer.fields.id, data: data});
        cachedLeadSource = leadSource;
        expect(leadSource.fields.id).to.not.be.undefined;
        expect(leadSource.fields.campaign).to.be.equal(data.campaign);
        expect(leadSource.response.status).to.be.equal(201);
    });

    it('I can update a lead source for a customer by using its ID', async () => {
        const {campaign} = createLeadSourceData();
        const data = {...cachedLeadSource.fields, campaign};
        const leadSource = await apiInstance.customers.updateLeadSource({id: cachedCustomer.fields.id, data: data});
        expect(leadSource.fields.campaign).to.be.equal(campaign);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can get a lead source by using the customer ID', async () => {
        const leadSource = await apiInstance.customers.getLeadSource({id: cachedCustomer.fields.id});
        expect(leadSource.fields.medium).to.be.equal(cachedLeadSource.fields.medium);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can delete a lead source that I just created for a specific customer ID', async () => {
        const leadSource = await apiInstance.customers.deleteLeadSource({id: cachedCustomer.fields.id});
        expect(leadSource.response.status).to.be.equal(204);
    });
});
