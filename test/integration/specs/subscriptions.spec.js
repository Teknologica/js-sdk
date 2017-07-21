import chai from 'chai';
import apiInstance from '../api-instance';
import {createSubscriptionData, createWebsiteData, createCustomerData, createPlanData, createInvoiceData} from '../utils.js';

const expect = chai.expect;

describe('when using the subscriptions resource', () => {

    let sharedSubscriptionId, sharedData={};
    // const testIds = {with: null, without: null};

    before(async () => {
        const {id : customerId, ...customerData} = createCustomerData(true);
        const {id : websiteId, ...websiteData} = createWebsiteData(true);
        const customer = await apiInstance.customers.create({id : customerId, data: customerData});

        const website = await apiInstance.websites.create({id : websiteId, data: websiteData});

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
        const {id: subscriptionId, ...subscriptionData} = createSubscriptionData(true, sharedData);
        const subscription = await apiInstance.subscriptions.create({id: subscriptionId, data: subscriptionData});
        expect(subscription.response.status).to.be.equal(201);
    });
    //
    // it('I can get a list of subscriptions', async () => {
    //     const subscriptions = await apiInstance.subscriptions.getAll();
    //     expect(subscriptions.total).to.not.be.equal(0);
    //     const [subscriptionsItem] = subscriptions.items;
    //     expect(subscriptionsItem.fields.id).to.not.be.undefined;
    //     expect(subscriptions.response.status).to.be.equal(200);
    //     sharedSubscriptionId = subscriptionsItem.fields.id;
    // });
    //
    // it('I can get a subscription by its ID', async () => {
    //     const subscription = await apiInstance.subscriptions.get({id: sharedSubscriptionId});
    //     expect(subscription.fields.id).to.be.equal(sharedSubscriptionId);
    //     expect(subscription.response.status).to.be.equal(200);
    // });
    //




});
