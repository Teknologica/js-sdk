import chai from 'chai';
import createApiTestHandler from '../create-api-test-handler';
import createApiInstance from '../../../src/create-api-instance';

const expect = chai.expect;
//options should perhaps be moved to a beforeEach block, so that they are reset to their initial value before each test is run
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
const apiInstance = createApiInstance({apiHandler});

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
        expect(apiHandler.getInstance().defaults.headers.common['REB-APIKEY']).to.be.undefined;
        expect(apiHandler.getInstance().defaults.headers.common['Authorization']).to.equal(`Bearer ${token}`);
        expect(options.apiKey).to.be.null;
        expect(options.jwt).to.equal(token);
    });
    it('should alloq the proxy agent to be set', () => {
        const params = {host: 'testHost', port: 888, auth: {key: 'foo', value: 'bar'}};
        apiHandler.setProxyAgent(params);
        expect(apiHandler.getInstance().defaults.proxy).to.deep.equal(params);
    });
    it('should allow the endpoints to be set', () => {
        apiHandler.setEndpoints({live: 'live-endpoint.rebilly.com', sandbox: 'sandbox-endpoint.rebilly.com'});
        expect(apiHandler.getInstance().defaults.baseURL).to.equal('live-endpoint.rebilly.com/v1');
        options.apiVersion = 2;
        options.isSandbox = true;
        apiHandler.setEndpoints({live: 'live-endpoint.rebilly.com', sandbox: 'sandbox-endpoint.rebilly.com'});
        expect(apiHandler.getInstance().defaults.baseURL).to.equal('sandbox-endpoint.rebilly.com/v2');
    });
});
