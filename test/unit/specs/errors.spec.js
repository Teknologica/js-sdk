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
        const response = {data: {error: 'Not Found'}};
        try {
            throw new Errors.RebillyNotFoundError ({response});
        } catch (err) {
            expect(err.message).to.be.equal(response.data.error);
            expect(err.name).to.be.equal('RebillyNotFoundError');
            expect(err.response).to.be.deep.equal(response);
        }
    });

    it('should return the response status code when present', () => {
        const response = {
            data: {error: 'Generic Error', details: ['Wrong format']},
            status: 422,
            statusText: 'Generic Error'
        };
        try {
            throw new Errors.RebillyValidationError({response});
        } catch (err) {
            expect(err.message).to.be.equal(response.data.error);
            expect(err.name).to.be.equal('RebillyValidationError');
            expect(err.response).to.be.deep.equal(response);
            expect(err.status).to.be.equal(response.status);
        }
    });

    it('should return the response status text when present', () => {
        const response = {
            data: {error: 'Generic Error', details: ['Invalid Operation']},
            status: 409,
            statusText: 'Generic Error'
        };
        try {
            throw new Errors.RebillyInvalidOperationError({response});
        } catch (err) {
            expect(err.message).to.be.equal(response.data.error);
            expect(err.name).to.be.equal('RebillyInvalidOperationError');
            expect(err.response).to.be.deep.equal(response);
            expect(err.statusText).to.be.equal(response.statusText);
        }
    });

    it('should return the error details text when present', () => {
        const response = {
            data: {error: 'Generic Error', details: ['Not Allowed']},
            status: 405,
            statusText: 'Generic Error'
        };
        try {
            throw new Errors.RebillyMethodNotAllowedError({response});
        } catch (err) {
            expect(err.message).to.be.equal(response.data.error);
            expect(err.name).to.be.equal('RebillyMethodNotAllowedError');
            expect(err.response).to.be.deep.equal(response);
            expect(err.statusText).to.be.equal(response.statusText);
        }
    });
});

