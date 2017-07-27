import chai from 'chai';
import apiInstance from '../api-instance';
import {createSubscriptionData,
        createWebsiteData,
        createCustomerData,
        createPlanData,
        createInvoiceData,
        createPaymentCard,
        createGatewayAccountData,
        createSubscriptionCancelData,
        createSubscriptionSwitchData,
        createLeadSourceData
} from '../utils.js';

const expect = chai.expect;

describe('when using the subscriptions resource', () => {
    let testIds = {with: null, without: null};

    async function prepareStub()  {
        let sharedData = {};
        /**
         * create a new customer, a new website and get a list of organizations
         */
        const {id : customerId, ...customerData} = createCustomerData(true);
        const {id : websiteId, ...websiteData} = createWebsiteData(true);
        const [customer, website, organizations] = await Promise.all([
            apiInstance.customers.create({id : customerId, data: customerData}),
            apiInstance.websites.create({id : websiteId, data: websiteData}),
            apiInstance.organizations.getAll()
        ]);
        /**
         * create a new payment card
         */
        const {id : paymentCardId, ...paymentCardData} = createPaymentCard(true, {customerId: customer.fields.id, billingAddress: customer.fields.primaryAddress});
        const paymentCard = await apiInstance.paymentCards.create({id: paymentCardId, data: paymentCardData});
        /**
         * get a organization and create a new gateway account
         */
        const [organization] = organizations.items;
        const gatewayAccountData = createGatewayAccountData(false, {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        });
        const gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountData});
        /**
         * update the existing customer that just created with default payment instrument
         */
        customerData.defaultPaymentInstrument = {
            method: 'payment-card',
            paymentCardId: paymentCard.fields.id,
            gatewayAccountId: gatewayAccount.fields.id
        };
        await apiInstance.customers.update({id: customerId, data: customerData});
        /**
         * fill the shared data object with the customer ID and website ID
         */
        sharedData.customerId = customer.fields.id;
        sharedData.websiteId = website.fields.id;
        /**
         * create a new plan and a new invoice
         */
        const {id: planId, ...planData} = createPlanData(true);
        const {id: invoiceId, ...invoiceData} = createInvoiceData(true, sharedData);
        const [plan, invoice] = await Promise.all([
            apiInstance.plans.create({id: planId, data: planData}),
            apiInstance.invoices.create({id: invoiceId, data: invoiceData})
        ]);
        /**
         * fill the shared data object with the plan ID and invoice ID
         */
        sharedData.initialInvoiceId = invoice.fields.id;
        sharedData.planId = plan.fields.id;
        return sharedData;
    }

    it('I can create a subscription with ID', async() => {
        const sharedData = await prepareStub();
        const {id, ...data} = createSubscriptionData(true, sharedData);
        const subscription = await apiInstance.subscriptions.create({id, data});
        testIds.with = id;
        expect(subscription.response.status).to.be.equal(201);
    });

    it('I can create a subscription without ID', async() => {
        const sharedData = await prepareStub();
        const {id, ...data} = createSubscriptionData(false, sharedData);
        const subscription = await apiInstance.subscriptions.create({id, data});
        testIds.without = subscription.fields.id;
        expect(subscription.response.status).to.be.equal(201);
    });

    it('I can get a list of subscriptions', async () => {
        const subscriptions = await apiInstance.subscriptions.getAll();
        expect(subscriptions.total).to.not.be.equal(0);
        const [subscriptionsItem] = subscriptions.items;
        expect(subscriptionsItem.fields.id).to.not.be.undefined;
        expect(subscriptions.response.status).to.be.equal(200);
    });

    it('I can get a subscription by its ID', async () => {
        const subscription = await apiInstance.subscriptions.get({id: testIds.with});
        expect(subscription.fields.id).to.be.equal(testIds.with);
        expect(subscription.response.status).to.be.equal(200);
    });

    it('I can update a subscription by its ID', async() => {
        const sharedData = await prepareStub();
        const {id, ...data} = createSubscriptionData(false, sharedData);
        const subscription = await apiInstance.subscriptions.update({id: testIds.with, data});
        expect(subscription.response.status).to.be.equal(200);
    });

    it('I can cancel subscriptions that I created by their IDs', async() => {
        const firstData = createSubscriptionCancelData();
        const SecondData = createSubscriptionCancelData();
        const firstSubscriptionCancel = await apiInstance.subscriptions.cancel({id: testIds.with, data: firstData});
        const SecondSubscriptionCancel = await apiInstance.subscriptions.cancel({id: testIds.without, data: SecondData});
        expect(firstSubscriptionCancel.response.status).to.be.equal(201);
        expect(SecondSubscriptionCancel.response.status).to.be.equal(201);
    });

    it('I can switch a subscription by its ID', async() => {
        const sharedData = await prepareStub();
        const data = createSubscriptionSwitchData({planId: sharedData.planId, websiteId: sharedData.websiteId });
        const subscriptionSwitch = await apiInstance.subscriptions.switch({id: testIds.with, data});
        expect(subscriptionSwitch.response.status).to.be.equal(201);
    });

    it('I can create a lead source for subscription by its ID', async() => {
        const data = createLeadSourceData();
        const leadSource = await apiInstance.subscriptions.createLeadSource({id: testIds.with, data});
        expect(leadSource.fields.id).to.not.be.undefined;
        expect(leadSource.fields.campaign).to.be.equal(data.campaign);
        expect(leadSource.response.status).to.be.equal(201);
    });

    it('I can get a lead source by its ID', async() => {
        const leadSource = await apiInstance.subscriptions.getLeadSource({id: testIds.with});
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can delete a lead source by its ID' ,async() => {
        const leadSource = await apiInstance.subscriptions.deleteLeadSource({id: testIds.with});
        expect(leadSource.response.status).to.be.equal(204);
    })
});
