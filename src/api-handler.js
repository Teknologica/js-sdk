import Member from './member';
import Collection from './collection';
import Errors from './errors';

export default class ApiHandler {
    /**
     * Create an instance of the Rebilly API handler.
     * @param axios {Object}
     * @param options {*} configuration options
     */
    constructor({axios, options}) {
        this.axios = axios;
        this.options = options;
        this.instance = this.createInstance();
    }

    /**
     * Create an Axios instance for Rebilly.
     */
    createInstance() {
        return this.axios.create(this.getInstanceOptions());
    }

    /**
     * Generate the minimum configuration options for the current Axios instance.
     * @returns {{baseURL: {string}, timeout: {number}, headers: {Object}}}
     */
    getInstanceOptions() {
        return {
            baseURL: this.getBaseURL(),
            timeout: this.options.requestTimeout,
            headers: this.getRequestHeaders()
        }
    }

    /**
     * Get the base URL for API calls for the current environment selection (live/sandbox).
     * @returns {string}
     */
    getBaseURL() {
        return this.options.isSandbox ? this.options.apiEndpoints.sandbox : this.options.apiEndpoints.live;
    }

    /**
     * Generate the request headers at instantiation with the `REB-API-KEY` if present.
     * @returns {Object}
     */
    getRequestHeaders() {
        if (this.options.apiKey) {
            return {
                'REB-API-KEY': this.options.apiKey
            }
        }
        return {};
    }

    /**
     * Define the default timeout delay in milliseconds for the current API instance.
     * @param timeout number timeout delay in milliseconds
     */
    setTimeout(timeout) {
        this.options.requestTimeout = Number(timeout);
        this.instance.defaults.timeout = this.options.requestTimeout;
    }

    /**
     * Define a consumer identification Header string for use with Rebilly. This allows you to identify your app in the API logs.
     * @param consumerId {string} a string to identify your application or plugin request
     * @example
     * const api = new RebillyAPI();
     * api.setApiConsumer('Acme Application v1.0.1');
     */
    setApiConsumer(consumerId) {
        this.instance.defaults.headers.common['REB-API-CONSUMER'] = consumerId;
    }

    /**
     * Use a JWT session token to identify API request. This removes the private API key header if present.
     * @param token string
     */
    setSessionToken(token) {
        this.options.apiKey = null;
        this.options.jwt = token;
        delete this.instance.defaults.headers.common['REB-API-KEY'];
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Define a proxy for the current API instance.
     * @param host {string}
     * @param port {number}
     * @param auth {Object}
     * @prop auth.username {string}
     * @prop auth.password {string}
     */
    setProxyAgent({host, port, auth}) {
        this.instance.defaults.proxy = {
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
    setEndpoints({live = null, sandbox = null}) {
        if (live) {
            this.options.apiEndpoints.live = live;
        }
        if (sandbox) {
            this.options.apiEndpoints.sandbox = sandbox;
        }
        //after changing the endpoints, update the Axios instance URL too
        this.instance.defaults.baseURL = this.getBaseURL();
    }

    getCancellationToken() {
        throw 'Method not implemented';
    }

    addRequestInterceptor() {
        throw 'Method not implemented';
    }

    removeRequestInterceptor() {
        throw 'Method not implemented';
    }

    addResponseInterceptor() {
        throw 'Method not implemented';
    }

    removeResponseInterceptor() {
        throw 'Method not implemented';
    }

    /**
     * Wraps an Axios request to handle both the response and errors and return wrapped objects.
     * @param request {Promise}
     * @param isCollection {boolean} defines whether the request is done to a collection or a member of the API
     * @returns {Promise.<*>}
     */
    async wrapRequest(request, {isCollection = false} = {}) {
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
    processResponse(response, isCollection) {
        if (isCollection) {
            return new Collection(response);
        }
        return new Member(response);
    }

    /**
     * Throws an instance of a Rebilly Error from the base Axios error.
     * @param error {RebillyError}
     */
    processError(error) {
        if (error.response) {
            switch (Number(error.response.status)) {
                case 401: //forbidden
                    throw new Errors.RebillyRequestError(error);
                case 404: //not found
                    throw new Errors.RebillyRequestError(error);
                case 409: //invalid operation
                    throw new Errors.RebillyRequestError(error);
                case 422: //validation error
                    throw new Errors.RebillyValidationError(error);
                default:
                    throw new Errors.RebillyRequestError(error);
            }
        }
        else if (error.request) { //5xx errors
            throw new Errors.RebillyRequestError(error);
        }
        else {
            //unexpected case
        }
    }

    get(url) {
        return this.wrapRequest(this.axios.get(url));
    }

    getAll(url, params) {
        return this.wrapRequest(this.axios.get(url, params), {isCollection: true});
    }

    post(url, data) {
        return this.wrapRequest(this.axios.post(url, data));
    }

    put(url, data) {
        return this.wrapRequest(this.axios.put(url, data));
    }

    patch(url, data) {
        return this.wrapRequest(this.axios.patch(url, data));
    }

    delete(url) {
        return this.wrapRequest(this.axios.delete(url));
    }

    create(url, data) {
        if (true) {
            //check if ID exists, throw error
        }
        else {
            //otherwise process
        }
    }
};
