import createPathInterpolator from './create-path-interpolator';

export default class ApiHandler {
    constructor({axios, options}) {
        this.axios = axios;
        this.options = options;
        this.instance = this.createInstance();
    }

    createInstance() {
        return this.axios.create(this.getInstanceOptions());
    }

    getInstanceOptions() {
        return {
            baseURL: this.getBaseURL(),
            timeout: this.options.requestTimeout,
            headers: this.getRequestHeaders()
        }
    }

    getBaseURL() {
        return this.options.isSandbox ? this.options.apiEndpoints.sandbox : this.options.apiEndpoints.live;
    }

    getRequestHeaders() {
        if (this.options.apiKey) {
            return {
                'REB-API-KEY': this.options.apiKey
            }
        }
        return {};
    }

    setTimeout(timeout) {
        this.options.requestTimeout = Number(timeout);
        this.instance.defaults.timeout = this.options.requestTimeout;
    }

    setApiConsumer(consumerId) {
        this.instance.defaults.headers.common['REB-API-CONSUMER'] = consumerId;
    }

    setSessionToken(token) {
        this.options.apiKey = null;
        this.options.jwt = token;
        delete this.instance.defaults.headers.common['REB-API-KEY'];
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    setProxyAgent() {
        
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
