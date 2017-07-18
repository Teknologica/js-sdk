import chai from 'chai';
import RebillyAPI from '../rebilly-js-sdk';

const expect = chai.expect;
const api = new RebillyAPI({apiKey: '00000000000000000', sandbox: true});

describe('when I get a collection', () => {
    let customers;
    before(async () => {
        customers = await api.customers.getAll();
    });
    it('should be immutable', () => {
        expect(customers.limit).to.be.frozen;
    });
    it('should return a mutable JSON object when requested', () => {
        expect(customers.getJSON()).to.not.be.frozen;
    });
});

describe('when I get a member', () => {
    let customer;
    before(async () => {
        customer = await api.customers.get({id: 'f9171662-0585-44ac-a8a1-874c8de9db85'});
    });
    it('should be immutable', () => {
        expect(customer.fields.firstName).to.be.frozen;
    });
    it('should return a mutable JSON object when requested', () => {
        expect(customer.getJSON()).to.not.be.frozen;
    });
});
