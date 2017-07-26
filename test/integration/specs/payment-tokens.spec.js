import chai from 'chai';
import apiInstance from '../api-instance';
import {createPaymentTokenData} from '../utils';

const expect = chai.expect;

describe('when using the payment tokens resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a payment token', async () => {
        const paymentTokenData = createPaymentTokenData();
        const paymentToken = await apiInstance.paymentTokens.create({data: paymentTokenData});
        testIds.without = paymentToken.fields.id;
        expect(paymentToken.fields.used).to.be.equal(false);
    });

    it('I can get a list of paymentTokens', async () => {
        const paymentTokens = await apiInstance.paymentTokens.getAll();
        expect(paymentTokens.total).to.not.be.equal(0);
        const [paymentToken] = paymentTokens.items;
        expect(paymentToken.fields.id).to.not.be.undefined;
    });

    it('I can get a payment token by using its ID', async () => {
        const paymentToken = await apiInstance.paymentTokens.get({id: testIds.without});
        expect(paymentToken.fields.id).to.be.equal(testIds.without);
    });

    it('I can expire a payment token', async () => {
        const expiredPaymentToken = await apiInstance.paymentTokens.expire({id: testIds.without});
        expect(expiredPaymentToken.response.status).to.be.equal(201);
        expect(expiredPaymentToken.fields.expiredTime).to.not.be.null;
    });
});
