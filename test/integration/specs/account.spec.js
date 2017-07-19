import chai from 'chai';
import apiInstance from '../api-instance';
import {createMerchantSignupData} from '../utils';

const expect = chai.expect;

describe('when using the account resource', () => {

    it('I can signup to Rebilly', async () => {
        const merchant = createMerchantSignupData();
        const user = await apiInstance.account.signUp({data: merchant});
        expect(user.fields.firstName).to.be.equal(merchant.firstName);
    });
});
