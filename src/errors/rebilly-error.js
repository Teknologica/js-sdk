export default class RebillyError extends Error {
    constructor({config, name, response = null, request = null, message = null}) {
        let errorMessage = message || 'Request Error';
        if (response && response.data && response.data.error) {
            errorMessage = response.data.error;
        }
        super(errorMessage);
        this.name = name;
        this.response = response;
        this.request = request;
        this.config = config;
        this.status = response ? response.status : null;
        this.statusText = response ? response.statusText : null;
    }
}
