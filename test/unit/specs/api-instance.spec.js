import chai from 'chai';
import createApiTestHandler from '../create-api-test-handler';
import createApiInstance from '../../../src/create-api-instance';

const expect = chai.expect;
const options = {
    version: 1,
    apiEndpoints: {live: 'new-live-url', sandbox: 'new-sandbox-url'},
    apiKey: '0123456789',
    apiVersion: 1,
    isSandbox: false,
    requestTimeout: 1,
    jwt: null
};
const apiHandler = createApiTestHandler({options});
const apiInstance = createApiInstance({apiHandler});

describe('when I create an API instance', () => {
    it('should expose resource methods', () => {
        expect(apiInstance.customers).to.be.an('object');
    });
    it('should expose helper methods', () => {
        expect(apiInstance.setSessionToken).to.be.a('function');
    });
});
