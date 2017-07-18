import libraryVersion from '../version';
import createApiHandler from './create-api-handler';
import createApiInstance from './create-api-instance';
import Errors from './errors';

const baseApiVersion = '2.1';
const baseEndpoints = {
    live: 'https://api.rebilly.com',
    sandbox: 'https://api-sandbox.rebilly.com'
};
const baseTimeoutMs = 6000;

/**
 * Create an instance of the Rebilly API
 * @param apiKey {string}
 * @param version {string}
 * @param sandbox {boolean}
 * @param timeout {number}
 * @constructor
 */
export default function RebillyAPI({apiKey = null, version = baseApiVersion, sandbox = false, timeout = baseTimeoutMs} = {}) {
    /**
     * Internal configuration options
     * @type {{version: string, apiKey: string|null, apiVersion: string, isSandbox: boolean, requestTimeout: number, jwt: string|null}}
     */
    const options = {
        version: libraryVersion,
        apiEndpoints: baseEndpoints,
        apiKey: apiKey,
        apiVersion: version,
        isSandbox: sandbox,
        requestTimeout: timeout,
        jwt: null
    };

    const apiHandler = createApiHandler({options});
    return createApiInstance({apiHandler});
};

/**
 * Create an instance of the experimental Rebilly API
 * @param apiKey {string}
 * @param sandbox {boolean}
 * @param timeout {number}
 * @returns {{account, apiKeys, bankAccounts, blacklists, checkoutPages, coupons, customers, customerAuthentication, customEvents, customFields, credentialHashes, disputes, events, files, gatewayAccounts, invoices, layouts, lists, notes, organizations, paymentCards, paymentTokens, paypalAccounts, plans, previews, products, profile, sessions, shippingZones, status, subscriptions, tracking, transactions, threeDSecure, users, webhooks, websites, addRequestInterceptor, removeRequestInterceptor, addResponseInterceptor, removeResponseInterceptor, setTimeout, setProxyAgent, setSessionToken, setApiConsumer, setEndpoints, getCancellationToken}}
 * @constructor
 */
function RebillyExperimentalAPI({apiKey = null, sandbox = false, timeout = baseTimeoutMs} = {}) {
    /**
     * Internal configuration options
     * @type {{version: string, apiEndpoints: {live: string, sandbox: string}, apiKey: *, isSandbox: boolean, requestTimeout: number, jwt: null}}
     */
    const options = {
        version: libraryVersion,
        apiEndpoints: baseEndpoints,
        apiKey: apiKey,
        isSandbox: sandbox,
        requestTimeout: timeout,
        jwt: null
    };

    //TODO map to experimental
    const apiHandler = createApiHandler({options});
    return createApiInstance({apiHandler});
}

export {Errors as RebillyErrors, RebillyExperimentalAPI};
