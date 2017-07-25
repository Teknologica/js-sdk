import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomerData, createCustomerCredentialsData} from '../utils';

const expect = chai.expect;

describe('when using the customer-authentication resource', () => {
    let customer = null;
    let existingCredentials = null;
    const testIds = {with: null, without: null};

    it('I can update authentication options', async () => {
        const data = {
            passwordPattern: null,
            credentialTtl: 10,
            authTokenTtl: 20,
            resetTokenTtl: 30
        };
        const authOptions = await apiInstance.customerAuthentication.updateAuthOptions({data});
        //TODO: values get set to credentialTtl value - investigate further, seems buggy
        expect(authOptions.fields.authTokenTtl).to.be.equal(data.credentialTtl);
    });


    it('I can get authentication options', async () => {
        const authOptions = await apiInstance.customerAuthentication.getAuthOptions();
        expect(authOptions.fields.credentialTtl).to.be.equal(10);
    });

    //TODO: /authentication-tokens endpoints, as soon as we figure out how to populate the response to GET /authentication-tokens
    it.skip('I can login a customer', async () => {
        const credentialsData = createCustomerCredentialsData({customerId: customer.fields.id});
        const customerLogin = await apiInstance.customerAuthentication.login({data: credentialsData});
    });

    it.skip('I can get a list of authentication tokens', async () => {
        const authTokens = await apiInstance.customerAuthentication.getAllAuthTokens();
        expect(authTokens.total).to.not.be.equal(0);
        const [authToken] = authTokens.items;
        expect(authToken.fields.id).to.not.be.undefined;
    });

    it.skip('I can verify an authentication token', async () => {

    });

    it.skip('I can logout a customer', async () => {

    });

    it('I can create customer login credentials without an ID', async () => {
        const {id: customerId, ...data} = createCustomerData(true);
        customer = await apiInstance.customers.create({customerId, data});
        const credentialsData = createCustomerCredentialsData({customerId: customer.fields.id});
        const customerCredentials = await apiInstance.customerAuthentication.createCredential({data: credentialsData});
        existingCredentials = customerCredentials;
        expect(customerCredentials.fields.username).to.be.equal(credentialsData.username);
    });

    it('I can create customer login credentials with an ID', async () => {
        const {id: credentialsId, ...credentialsData} = createCustomerCredentialsData({withId: true, customerId: customer.fields.id});
        const customerCredentials = await apiInstance.customerAuthentication.createCredential({id: credentialsId, data: credentialsData});
        testIds.with = credentialsId;
        expect(customerCredentials.fields.id).to.be.equal(credentialsId);
    });

    it('I can get a list of customer login credentials', async () => {
        const customerCredentialsList = await apiInstance.customerAuthentication.getAllCredentials();
        const [customerCredentialsListItems] = customerCredentialsList.items;
        expect(customerCredentialsList.total).to.not.be.equal(0);
        expect(customerCredentialsListItems.fields.id).to.not.be.undefined;
    });

    it('I can get a customer login credential by using its ID', async () => {
        const customerCredentials = await apiInstance.customerAuthentication.getCredential({id: testIds.with});
        expect(customerCredentials.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a customer login credential', async () => {
        const credentialsData = createCustomerCredentialsData({customerId: customer.fields.id});
        const customerCredentials = await apiInstance.customerAuthentication.updateCredential({id: testIds.with, data: credentialsData});
        expect(customerCredentials.fields.username).to.be.equal(credentialsData.username);
        expect(customerCredentials.response.status).to.be.equal(200);
    });

    it('I can delete a customer login credential', async () => {
        const deletedCredential = await apiInstance.customerAuthentication.deleteCredential({id: testIds.with});
        expect(deletedCredential.response.status).to.be.equal(204);
    });

    it('I can create a reset password token', async () => {
        const customerCredentials = {
            username: existingCredentials.fields.username,
            password: 'pa$$word',
            expiredTime: '2017-07-20T16:22:55Z'
        };
        const passwordToken = await apiInstance.customerAuthentication.createResetPasswordToken({data: customerCredentials});
        expect(passwordToken.fields.token).to.not.be.undefined;
        expect(passwordToken.fields.username).to.be.equal(customerCredentials.username);
    });

    //TODO: GET /password-tokens always returns empty
    it.skip('I can get a list of reset password tokens', async () => {
        const passwordTokensList = await apiInstance.customerAuthentication.getAllResetPasswordTokens();
        const [passwordTokensListItems] = passwordTokensList.items;
        expect(passwordTokensList.total).to.not.be.equal(0);
        expect(passwordTokensListItems.fields.id).to.not.be.undefined;
    });

    //TODO: GET /password-tokens/id doesn't work, no IDs found
    it.skip('I can get a reset password token by using its ID', async () => {
        const passwordToken = await apiInstance.customerAuthentication.getAllResetPasswordTokens({id: testIds.with});
        expect(passwordToken.fields.id).to.be.equal(testIds.with);
    });

    //TODO: DELETE /password-tokens/id doesn't work, no IDs found
    it.skip('I can delete a reset password token', async () => {
        const deletedToken = await apiInstance.customerAuthentication.deleteResetPasswordToken({id: testIds.with});
        expect(deletedToken.response.status).to.be.equal(204);
    });
});
