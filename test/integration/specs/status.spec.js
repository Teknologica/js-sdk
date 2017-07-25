import chai from 'chai';
import apiInstance from '../api-instance';

const expect = chai.expect;

describe('when using the status resource', () => {

    it('I can get a status', async () => {
        const status = await apiInstance.status.get();
        expect(status.response.status).to.be.equal(200);
    });
});
