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
        createLeadSourceData} from '../utils.js';

const expect = chai.expect;

describe('when using the subscriptions resource', () => {

    let sharedSubscriptionId;
    let sharedData = {};

    beforeEach(async () => {

        const {id : customerId, ...customerData} = createCustomerData(true);
        const {id : websiteId, ...websiteData} = createWebsiteData(true);
        const customer = await apiInstance.customers.create({id : customerId, data: customerData});
        const website = await apiInstance.websites.create({id : websiteId, data: websiteData});
        const {id : paymentCardId, ...paymentCardData} = createPaymentCard(true, {customerId: customer.fields.id, billingAddress: customer.fields.primaryAddress});
        const paymentCard = await apiInstance.paymentCards.create({id: paymentCardId, data: paymentCardData});
        const organizations = await apiInstance.organizations.getAll();
        const [organization] = organizations.items;
        const gatewayAccountData = createGatewayAccountData(false, {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        });

        const gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountData});
        customerData.defaultPaymentInstrument = {
            method: 'payment-card',
            paymentCardId: paymentCard.fields.id,
            gatewayAccountId: gatewayAccount.fields.id
        };

        const updateCustomer = await apiInstance.customers.update({id: customerId, data: customerData});

        sharedData.customerId = customer.fields.id;
        sharedData.websiteId = website.fields.id;

        const {id : planId, ...planData} = createPlanData(true);
        const {id : invoiceId, ...invoiceData} = createInvoiceData(true, sharedData);
        const plan = await apiInstance.plans.create({id: planId, data: planData});
        const invoice = await apiInstance.invoices.create({id: invoiceId, data: invoiceData});

        sharedData.initialInvoiceId = invoice.fields.id;
        sharedData.planId = plan.fields.id;

    });


    it('I can create a subscription with ID', async() => {
        const {id: subscriptionId, ...data} = createSubscriptionData(true, sharedData);
        const subscription = await apiInstance.subscriptions.create({id: subscriptionId, data: data});
        expect(subscription.response.status).to.be.equal(201);
        sharedSubscriptionId = subscriptionId;
    });


    it('I can create a subscription without ID', async() => {
        const {id: subscriptionId, ...data} = createSubscriptionData(false, sharedData);
        const subscription = await apiInstance.subscriptions.create({id: subscriptionId, data: data});
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
        const subscription = await apiInstance.subscriptions.get({id: sharedSubscriptionId});
        expect(subscription.fields.id).to.be.equal(sharedSubscriptionId);
        expect(subscription.response.status).to.be.equal(200);
    });


    it('I can update a subscription by its ID', async() => {
        const {id: subscriptionId, ...data} = createSubscriptionData(false, sharedData);
        const subscription = await apiInstance.subscriptions.update({id: sharedSubscriptionId, data: data});
        expect(subscription.response.status).to.be.equal(200);
    });


    it('I can cancel a subscription by its ID', async() => {
        const data = createSubscriptionCancelData();
        const subscriptionCancel = await apiInstance.subscriptions.cancel({id: sharedSubscriptionId, data: data});
        expect(subscriptionCancel.response.status).to.be.equal(201);

    });


    it('I can switch a subscription by its ID', async() => {
        const data = createSubscriptionSwitchData({planId: sharedData.planId, websiteId: sharedData.websiteId });
        const subscriptionSwitch = await apiInstance.subscriptions.switch({id: sharedSubscriptionId, data: data});
        expect(subscriptionSwitch.response.status).to.be.equal(201);
    });


    it('I can create a lead source for subscription by its ID', async() => {
        const data = createLeadSourceData();
        const leadSource = await apiInstance.subscriptions.createLeadSource({id: sharedSubscriptionId, data: data});
        expect(leadSource.fields.id).to.not.be.undefined;
        expect(leadSource.fields.campaign).to.be.equal(data.campaign);
        expect(leadSource.response.status).to.be.equal(201);
    });


    it('I can get a lead source by its ID', async() => {
        const leadSource = await apiInstance.subscriptions.getLeadSource({id: sharedSubscriptionId});
        expect(leadSource.response.status).to.be.equal(200);
    });


    it('I can delete a lead source by its ID' ,async() => {
        const leadSource = await apiInstance.subscriptions.deleteLeadSource({id: sharedSubscriptionId});
        expect(leadSource.response.status).to.be.equal(204);
    })
});
