import chai from 'chai';
import apiInstance from '../api-instance';
import {
    createCustomerData,
    createPaypalAccountData,
    createWebsiteData,
    createPaypalAccountActivateData
} from '../utils';

const expect = chai.expect;

describe('when using the paypal accounts resource', () => {
    const testIds = {with: null, without: null};
    let customer;
    let sharedData;
    let website;

    before(async () => {
        customer = await apiInstance.customers.create({data: createCustomerData()});
        website = await apiInstance.websites.create({data: createWebsiteData()});
        sharedData = {
            customerId: customer.fields.id,
            billingAddress: customer.fields.primaryAddress
        }
    });

    it('I can create Paypal account without an ID', async () => {
        const paypalAccountStub = createPaypalAccountData(false, sharedData);
        const paypalAccount = await apiInstance.paypalAccounts.create({data: paypalAccountStub});
        testIds.without = paypalAccount.fields.id;
        expect(paypalAccount.fields.customerId).to.be.equal(paypalAccountStub.customerId);
    });

    it('I can create Paypal account with an ID', async () => {
        const {id, ...data} = createPaypalAccountData(true, sharedData);
        const paypalAccount = await apiInstance.paypalAccounts.create({id, data});
        testIds.with = paypalAccount.fields.id;
        expect(paypalAccount.fields.customerId).to.be.equal(data.customerId);
        expect(paypalAccount.fields.id).to.be.equal(id);
    });

    it('I get a list of Paypal accounts', async () => {
        const accounts = await apiInstance.paypalAccounts.getAll();
        expect(accounts.total).to.not.be.equal(0);
        expect(accounts.response.status).to.be.equal(200);
    });

    it('I get a Paypal account using its ID', async () => {
        const paypalAccount = await apiInstance.paypalAccounts.get({id: testIds.with});
        expect(paypalAccount.fields.id).to.be.equal(testIds.with);
        expect(paypalAccount.response.status).to.be.equal(200);
    });

    it.skip('I can activate a Paypal account', async () => {
        const data = createPaypalAccountActivateData(website.fields.id);
        const paypalAccount = await apiInstance.paypalAccounts.activate({id: testIds.with, data});
        expect(paypalAccount.fields.status).to.be.equal('active');
        expect(paypalAccount.response.status).to.be.equal(201);
    });

    it('I can deactivate a Paypal account', async () => {
        const paypalAccount = await apiInstance.paypalAccounts.deactivate({id: testIds.with});
        expect(paypalAccount.fields.status).to.be.equal('deactivated');
        expect(paypalAccount.response.status).to.be.equal(201);
    });
});
