import chai from 'chai';
import RebillyAPI from '../rebilly-js-sdk';

const expect = chai.expect;
const api = new RebillyAPI({apiKey: '00000000000000000'});

describe('when I get all customers', () => {
    let customers;
    before(async () => {
        customers = await api.customers.getAll();
    });
    it('should find a total of 2 customers', () => {
        expect(customers.total).to.be.equal(2);
    });
    it('should start from an offset of zero', () => {
        expect(customers.offset).to.be.equal(0);
    });
    it('should have a default limit of 100', () => {
        expect(customers.limit).to.be.equal(100);
    });
    it('should be immutable', () => {
        expect(customers.limit).to.be.frozen;
    });
});

describe('when I get one customer with ID f9171662-0585-44ac-a8a1-874c8de9db85', () => {
    let customer;
    before(async () => {
        customer = await api.customers.get({id: 'f9171662-0585-44ac-a8a1-874c8de9db85'});
    });
    it('should find a customer called Gael', () => {
        expect(customer.fields.firstName).to.be.equal('Gael');
    });
    it('should be immutable', () => {
        expect(customer.fields.firstName).to.be.frozen;
    });
});
