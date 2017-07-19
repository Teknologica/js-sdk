import chai from 'chai';
import apiInstance from '../api-instance';
import {createMerchantSignupData} from '../utils';

const expect = chai.expect;

describe('when using the account resource', () => {
    const merchant = createMerchantSignupData();
    it('I can signup to Rebilly', async () => {
        const user = await apiInstance.account.signUp({data: merchant});
        expect(user.fields.firstName).to.be.equal(merchant.firstName);
    });
    it('I can trigger the forgot password action', async () => {
        const {email} = merchant;
        const user = await apiInstance.account.forgotPassword({data: {email}});
        expect(user.response.status).to.be.equal(204);
    });
});
