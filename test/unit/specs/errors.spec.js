import Errors from '../../../src/errors';
import chai from 'chai';

const expect = chai.expect;

describe('when using the Errors object', () => {
    it('should expose different Rebilly error types', () => {
        expect(Errors).to.be.a('object');
        expect(Errors).to.have.property('RebillyError');
        expect(Errors).to.have.property('RebillyRequestError');
        expect(Errors).to.have.property('RebillyValidationError');
        expect(Errors).to.have.property('RebillyNotFoundError');
        expect(Errors).to.have.property('RebillyInvalidOperationError');
        expect(Errors).to.have.property('RebillyForbiddenError');
        expect(Errors).to.have.property('RebillyMethodNotAllowedError');
        expect(Errors).to.have.property('RebillyTimeoutError');
    });
});

describe('when throwing errors', () => {
    it('should create an instance with default properties', () => {
        try {
            throw new Errors.RebillyError({error: {message: 'base error'}});
        } catch (err) {
            expect(err.message).to.be.equal('base error');
            expect(err.name).to.be.equal('RebillyError');
            expect(err.response).to.be.equal(null);
            expect(err.request).to.be.equal(null);
            expect(err.config).to.be.equal(null);
            expect(err.status).to.be.equal(null);
            expect(err.statusText).to.be.equal(null);
            expect(err.details).to.be.equal(null);
        }
    });

    it('should use the response error as the error message', () => {
        const response = {data: {error: 'Data Validation Failed'}};
        try {
            throw new Errors.RebillyValidationError({response});
        } catch (err) {
            expect(err.message).to.be.equal(response.data.error);
            expect(err.name).to.be.equal('RebillyValidationError');
            expect(err.response).to.be.deep.equal(response);
        }
    });

    it('should return the response status, details and text', () => {
        const response = {
            data: {error: 'Data Validation Failed', details: ['Wrong format']},
            status: 422,
            statusText: 'Data Validation Failed'
        };
        try {
            throw new Errors.RebillyValidationError({response});
        } catch (err) {
            expect(err.message).to.be.equal(response.data.error);
            expect(err.name).to.be.equal('RebillyValidationError');
            expect(err.response).to.be.deep.equal(response);
            expect(err.status).to.be.equal(response.status);
            expect(err.statusText).to.be.equal(response.statusText);
            expect(err.details).to.be.equal(response.data.details);
        }
    });

    it('should return error names that match the error types thrown', () => {
        const message = 'Bad Request';
        try {
            throw new Errors.RebillyRequestError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyRequestError');
        }
        try {
            throw new Errors.RebillyValidationError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyValidationError');
        }
        try {
            throw new Errors.RebillyNotFoundError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyNotFoundError');
        }
        try {
            throw new Errors.RebillyInvalidOperationError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyInvalidOperationError');
        }
        try {
            throw new Errors.RebillyForbiddenError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyForbiddenError');
        }
        try {
            throw new Errors.RebillyMethodNotAllowedError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyMethodNotAllowedError');
        }
        try {
            throw new Errors.RebillyTimeoutError({message});
        } catch (err) {
            expect(err.name).to.be.equal('RebillyTimeoutError');
        }
    });
});

