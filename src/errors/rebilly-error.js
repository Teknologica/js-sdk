export default class RebillyError extends Error {
    constructor({config, name, response = null, request = null, message = 'Request Error'}) {
        if (response && response.data && response.data.error) {
            message = response.data.error;
        }
        super(message);
        this.name = name;
        this.response = response;
        this.request = request;
        this.config = config;
        this.status = response ? response.status : (request ? 500 : null);
        this.statusText = response ? response.statusText : null;
    }
}
