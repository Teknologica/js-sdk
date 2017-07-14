import RebillyError from './rebilly-error';

class RebillyRequestError extends RebillyError {
    constructor(error) {
        super({...error, name: 'RebillyRequestError'});
    }
}

class RebillyValidationError extends RebillyError {
    constructor(error) {
        super({...error, name: 'RebillyValidationError'});
    }
}

class RebillyNotFoundError extends RebillyError {
    constructor(error) {
        super({...error, name: 'RebillyNotFoundError'});
    }
}

class RebillyInvalidOperationError extends RebillyError {
    constructor(error) {
        super({...error, name: 'RebillyInvalidOperationError'});
    }
}

class RebillyForbiddenError extends RebillyError {
    constructor(error) {
        super({...error, name: 'RebillyForbiddenError'});
    }
}

const Errors = {
    RebillyRequestError,
    RebillyValidationError,
    RebillyNotFoundError,
    RebillyInvalidOperationError,
    RebillyForbiddenError,
};

export default Errors;
