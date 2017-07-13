import RebillyError from './rebilly-error';

class RebillyRequestError extends RebillyError {
    constructor(error) {
        super(error);
        this.name = 'RebillyRequestError';
    }
}

class RebillyValidationError extends RebillyError {
    constructor(error) {
        super(error);
        this.name = 'RebillyValidationError';
    }
}

const Errors = {
    RebillyRequestError,
    RebillyValidationError
};

export default Errors;
