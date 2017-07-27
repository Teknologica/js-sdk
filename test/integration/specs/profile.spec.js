import chai from 'chai';
import apiInstance from '../api-instance';
import {createProfileData, createProfileDataTotp} from '../utils.js';

const expect = chai.expect;

describe('when using the profile resource', () => {
    let sharedProfileId;

    it('I can get a profile', async() => {
        const profile = await apiInstance.profile.get();
        expect(profile.response.status).to.be.equal(200);
        sharedProfileId = profile.fields.id;
    });

    it('I can update a profile', async() => {
        const data = createProfileDataTotp();
        const profile = await apiInstance.profile.update({data});
        expect(profile.response.status).to.be.equal(200);
    });

    /**
     * current password can't be retrieved
     */
    it.skip('I can update the password of a profile', async() => {

    });

    it('I can reset totp', async () => {
        const totpSecret = await apiInstance.profile.resetTotp();
        expect(totpSecret.response.status).to.be.equal(201);
    });

    it('I can update a profile', async() => {
        const data = createProfileData();
        const profile = await apiInstance.profile.update({data});
        expect(profile.response.status).to.be.equal(200);
    });
});
