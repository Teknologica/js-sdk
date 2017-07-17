export default class RebillyError extends Error {
    constructor({config, name, response = null, request = null}) {
        let message = 'Request Error';
        if (response) {
            if (response.data && response.data.error) {
                message = response.data.error;
            }
        }
        super(message);
        this.name = name;
        this.response = response;
        this.request = request;
        this.config = config;
        this.status = response ? response.status : (request ? 500 : null);
        this.statusText = response.statusText || null;
    }
}
