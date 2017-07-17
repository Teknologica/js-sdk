import axios from 'axios';
import Member from './member';
import Collection from './collection';
import Errors from './errors';

export default function ApiHandler({options}) {
    /**
     * Create an instance of the Rebilly API handler.
     * @param axios {Object}
     * @param options {*} configuration options
     */
    // constructor({axios, options}) {
        //     this.axios = axios;
        //     this.options = options;
        //     this.instance = this.createInstance();
    // }

    const configOptions = options;
    const instance = createInstance();

    /**
     * Create an Axios instance for Rebilly.
     */
    this.prototype.createInstance = function() {
        return axios.create(this.getInstanceOptions().bind(this));
    }

    /**
     * Generate the minimum configuration options for the current Axios instance.
     * @returns {{baseURL: {string}, timeout: {number}, headers: {Object}}}
     */
    this.prototype.getInstanceOptions = function() {
        return {
            baseURL: this.getBaseURL(),
            timeout: configOptions.requestTimeout,
            headers: this.getRequestHeaders()
        }
    }

    /**
     * Get the base URL for API calls for the current environment selection (live/sandbox) including the version.
     * @returns {string}
     */
    this.prototype.getBaseURL = function() {
        const url = configOptions.isSandbox ? configOptions.apiEndpoints.sandbox : configOptions.apiEndpoints.live;
        return `${url}/v${configOptions.apiVersion}`;
    }

    /**
     * Generate the request headers at instantiation with the `REB-API-KEY` if present.
     * @returns {Object}
     */
    this.prototype.getRequestHeaders = function() {
        if (configOptions.apiKey) {
            return {
                'REB-API-KEY': configOptions.apiKey
            }
        }
        return {};
    }

    /**
     * Define the default timeout delay in milliseconds for the current API instance.
     * @param timeout number timeout delay in milliseconds
     */
    this.prototype.setTimeout = function(timeout) {
        configOptions.requestTimeout = Number(timeout);
        instance.defaults.timeout = configOptions.requestTimeout;
    }

    /**
     * Define a consumer identification Header string for use with Rebilly. This allows you to identify your app in the API logs.
     * @param consumerId {string} a string to identify your application or plugin request
     * @example
     * const api = new RebillyAPI();
     * api.setApiConsumer('Acme Application v1.0.1');
     */
    this.prototype.setApiConsumer = function(consumerId) {
        instance.defaults.headers.common['REB-API-CONSUMER'] = consumerId;
    }

    /**
     * Use a JWT session token to identify API request. This removes the private API key header if present.
     * @param token string
     */
    this.prototype.setSessionToken = function(token) {
        console.warn(configOptions, this);
        configOptions.apiKey = null;
        configOptions.jwt = token;
        delete instance.defaults.headers.common['REB-API-KEY'];
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Define a proxy for the current API instance.
     * @param host {string}
     * @param port {number}
     * @param auth {Object}
     * @prop auth.username {string}
     * @prop auth.password {string}
     */
    this.prototype.setProxyAgent = function({host, port, auth}) {
        instance.defaults.proxy = {
            host,
            port,
            auth
        };
    }

    /**
     * Update the endpoints URL for live, sandbox or both environments in the current API instance's active URL.
     * @param live {string}
     * @param sandbox
     * @example
     * const api = new RebillyAPI();
     * api.setEndpoints({live: 'https://api-test.rebilly.com'});
     */
    this.prototype.setEndpoints = function({live = null, sandbox = null}) {
        if (live) {
            configOptions.apiEndpoints.live = live;
        }
        if (sandbox) {
            configOptions.apiEndpoints.sandbox = sandbox;
        }
        //after changing the endpoints, update the Axios instance URL too
        instance.defaults.baseURL = this.getBaseURL();
    }

    this.prototype.getCancellationToken = function() {
        throw 'Method not implemented';
    }

    /**
     * Adds a request interceptor to the current API instance.
     * @param thenDelegate {Function} defines the delegate logic to run when the request is completed
     * @param catchDelegate {Function} (optional) defines a callback to run before the catch block of the request is executed for this interceptor
     */
    this.prototype.addRequestInterceptor = function({thenDelegate, catchDelegate = () => {}}) {
        instance.interceptors.request.use(thenDelegate, catchDelegate);
    }

    /**
     * Removes a specific request interceptor from the current API instance.
     * @param interceptor {Function} defines the interceptor delegate to remove
     */
    this.prototype.removeRequestInterceptor = function(interceptor) {
        instance.interceptors.request.eject(interceptor);
    }

    /**
     * Adds a request response to the current API instance.
     * @param thenDelegate {Function} defines the delegate logic to run before the response is completed
     * @param catchDelegate {Function} (optional) defines a callback to run before the catch block of the response is executed for this interceptor
     */
    this.prototype.addResponseInterceptor = function({thenDelegate, catchDelegate = () => {}}) {
        instance.interceptors.response.use(thenDelegate, catchDelegate);
    }

    /**
     * Removes a specific response interceptor from the current API instance.
     * @param interceptor {Function} defines the interceptor delegate to remove
     */
    this.prototype.removeResponseInterceptor = function(interceptor) {
        instance.interceptors.response.eject(interceptor);
    }

    /**
     * Wraps an Axios request to handle both the response and errors and return wrapped objects.
     * @param request {Promise}
     * @param isCollection {boolean} defines whether the request is done to a collection or a member of the API
     * @returns {Promise.<*>}
     */
    this.prototype.wrapRequest = async function(request, {isCollection = false} = {}) {
        try {
            const response = await request;
            return this.processResponse(response, isCollection)
        }
        catch(error) {
            return this.processError(error);
        }
    }

    /**
     * Creates a Member or Collection from the response based on the type flag `isCollection`.
     * @param response {Object} raw API response
     * @param isCollection {boolean}
     * @returns {Member|Collection}
     */
    this.prototype.processResponse = function(response, isCollection) {
        if (isCollection) {
            return new Collection(response);
        }
        return new Member(response);
    }

    /**
     * Throws an instance of a Rebilly Error from the base Axios error.
     * @param error {Object}
     */
    this.prototype.processError = function(error) {
        if (error.response) {
            switch (Number(error.response.status)) {
                case 401: //forbidden
                    throw new Errors.RebillyForbiddenError(error);
                case 404: //not found
                    throw new Errors.RebillyNotFoundError(error);
                case 409: //invalid operation
                    throw new Errors.RebillyInvalidOperationError(error);
                case 422: //validation error
                    throw new Errors.RebillyValidationError(error);
                default:
                    //for anything else we will use the default error
                    throw new Errors.RebillyRequestError(error);
            }
        }
        else if (error.request) { //5xx errors without a response
            throw new Errors.RebillyRequestError(error);
        }
        else {
            throw new Errors.RebillyRequestError(error);
        }
    }

    this.prototype.get = function(url) {
        return this.wrapRequest(instance.get(url));
    }

    this.prototype.getAll = function(url, params) {
        return this.wrapRequest(instance.get(url, {params}), {isCollection: true});
    }

    this.prototype.post = function(url, data) {
        return this.wrapRequest(instance.post(url, data));
    }

    this.prototype.put = function(url, data) {
        return this.wrapRequest(instance.put(url, data));
    }

    this.prototype.patch = function(url, data) {
        return this.wrapRequest(instance.patch(url, data));
    }

    this.prototype.delete = function(url) {
        return this.wrapRequest(instance.delete(url));
    }

    this.prototype.create = function(url, data) {
        if (true) {
            //check if ID exists, throw error
        }
        else {
            //otherwise process
        }
    }
};
