import chai from 'chai';
import RebillyAPI from '../rebilly-js-sdk';

chai.expect();

const expect = chai.expect;
const api = new RebillyAPI({apiKey: '00000000000000000'});

describe('Given an instance of the API', () => {
    describe('when I get all customers', () => {
        it('should have only 2 in total', async () => {
            const customers = await api.customers.getAll();
            expect(customers.total).to.be.equal(2);
        });
    });
});
