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
     * Get the base URL for API calls for the current environment selection (live/sandbox) including the version.
     * @returns {string}
     */
    getBaseURL() {
        const url = this.options.isSandbox ? this.options.apiEndpoints.sandbox : this.options.apiEndpoints.live;
        return `${url}/v${this.options.apiVersion}`;
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
        console.warn(this.options, this);
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

    /**
     * Adds a request interceptor to the current API instance.
     * @param thenDelegate {Function} defines the delegate logic to run when the request is completed
     * @param catchDelegate {Function} (optional) defines a callback to run before the catch block of the request is executed for this interceptor
     */
    addRequestInterceptor({thenDelegate, catchDelegate = () => {}}) {
        this.instance.interceptors.request.use(thenDelegate, catchDelegate);
    }

    /**
     * Removes a specific request interceptor from the current API instance.
     * @param interceptor {Function} defines the interceptor delegate to remove
     */
    removeRequestInterceptor(interceptor) {
        this.instance.interceptors.request.eject(interceptor);
    }

    /**
     * Adds a request response to the current API instance.
     * @param thenDelegate {Function} defines the delegate logic to run before the response is completed
     * @param catchDelegate {Function} (optional) defines a callback to run before the catch block of the response is executed for this interceptor
     */
    addResponseInterceptor({thenDelegate, catchDelegate = () => {}}) {
        this.instance.interceptors.response.use(thenDelegate, catchDelegate);
    }

    /**
     * Removes a specific response interceptor from the current API instance.
     * @param interceptor {Function} defines the interceptor delegate to remove
     */
    removeResponseInterceptor(interceptor) {
        this.instance.interceptors.response.eject(interceptor);
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
     * @param error {Object}
     */
    processError(error) {
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

    get(url) {
        return this.wrapRequest(this.instance.get(url));
    }

    getAll(url, params) {
        return this.wrapRequest(this.instance.get(url, {params}), {isCollection: true});
    }

    post(url, data) {
        return this.wrapRequest(this.instance.post(url, data));
    }

    put(url, data) {
        return this.wrapRequest(this.instance.put(url, data));
    }

    patch(url, data) {
        return this.wrapRequest(this.instance.patch(url, data));
    }

    delete(url) {
        return this.wrapRequest(this.instance.delete(url));
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
