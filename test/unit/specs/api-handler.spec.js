import chai from 'chai';
import createApiTestHandler from '../create-api-test-handler';

const expect = chai.expect;
const options = {
    version: 1,
    apiEndpoints: {live: '', sandbox: ''},
    apiKey: '000000000',
    apiVersion: 1,
    isSandbox: false,
    requestTimeout: 1,
    jwt: null
};
const apiHandler = createApiTestHandler({options});

describe('when I use an API handler', () => {
    it('should allow the timeout to be set to a different value', () => {
        const timeout = 1234;
        apiHandler.setTimeout(timeout);
        expect(apiHandler.getInstance().defaults.timeout).to.equal(timeout);
    });
    it('should allow the API consumer to be set to a different value', () => {
        const consumer = 'Rebilly Tests';
        apiHandler.setApiConsumer(consumer);
        expect(apiHandler.getInstance().defaults.headers.common['REB-API-CONSUMER']).to.equal(consumer);
    });
    it('should set the Authorization token and delete the API key', () => {
        const token = '12345678';
        apiHandler.setSessionToken(token);
        expect(apiHandler.getInstance().defaults.headers.common['REB-API-KEY']).to.be.undefined;
        expect(apiHandler.getInstance().defaults.headers.common['Authorization']).to.equal(`Bearer ${token}`);
        expect(options.apiKey).to.be.null;
        expect(options.jwt).to.equal(token);
    });
});
