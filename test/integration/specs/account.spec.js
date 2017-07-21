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

    it.skip('I can activate a user account', () => {
       //cannot run this test as the activation link is sent by email
    });

    it.skip('I can login to my new account', () => {
        //cannot run this test without the account being activated
    });
});
