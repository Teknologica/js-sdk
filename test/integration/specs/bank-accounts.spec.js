import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomerData, createBankAccountData} from '../utils';

const expect = chai.expect;

describe('when using the bank accounts resource', () => {
    const testIds = {with: null, without: null};
    let customer;
    let sharedData;

    before(async () => {
        /**
         * create a new customer and fill the shared data with customer ID and primary address
         */
        const {id, ...data} = createCustomerData(true);
        customer = await apiInstance.customers.create({id, data});
        sharedData = {
            customerId: customer.fields.id,
            address: {...customer.fields.primaryAddress}
        };
    });

    it('I can create a bank account without an ID', async () => {
        const bankAccountStub = createBankAccountData(false, sharedData);
        const account = await apiInstance.bankAccounts.create({data: bankAccountStub});
        testIds.without = account.fields.id;
        expect(account.fields.customerId).to.be.equal(bankAccountStub.customerId);
    });

    it('I can create a bank account with an ID', async () => {
        const {id, ...data} = createBankAccountData(true, sharedData);
        const account = await apiInstance.bankAccounts.create({id, data});
        testIds.with = id;
        expect(account.fields.customerId).to.be.equal(data.customerId);
    });

    it('I can get a list of bank accounts', async () => {
        const accounts = await apiInstance.bankAccounts.getAll();
        expect(accounts.total).to.not.be.equal(0);
        const [account] = accounts.items;
        expect(account.fields.id).to.not.be.undefined;
    });

    it('I can get a bank account using its ID', async () => {
        const account = await apiInstance.bankAccounts.get({id: testIds.with});
        expect(account.fields.id).to.be.equal(testIds.with);
        expect(account.fields.customerId).to.be.equal(sharedData.customerId);
    });

    it('I can deactivate the bank accounts I just created', async () => {
        const firstDelete = await apiInstance.bankAccounts.deactivate({id: testIds.with});
        const secondDelete = await apiInstance.bankAccounts.deactivate({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(201);
        expect(secondDelete.response.status).to.be.equal(201);
    });
});
