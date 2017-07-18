import RebillyAPI from '../../src';
import apiKey from './api-key';

const endpoints = {
    live: 'api.dev-local.rebilly.com',
    sandbox: 'api-sandbox.dev-local.rebilly.com'
};

const liveApi = new RebillyAPI({apiKey: apiKey.live});
liveApi.setEndpoints(endpoints);

const sandboxApi = new RebillyAPI({apiKey: apiKey.sandbox, sandbox: true});
sandboxApi.setEndpoints(endpoints);

export default {live: liveApi, sandbox: sandboxApi};
