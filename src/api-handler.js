export default class ApiHandler {
    /**
     * Create an instance of the Rebilly API handler.
     * @param axios {axios}
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

    get(url) {
        return this.axios.get(url);
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    put(url, data) {
        return this.axios.put(url, data);
    }

    patch(url, data) {
        return this.axios.patch(url, data);
    }

    delete(url) {
        return this.axios.delete(url);
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
