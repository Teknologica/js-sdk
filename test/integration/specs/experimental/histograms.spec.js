import chai from 'chai';
import {experimentalApiInstance} from '../../api-instance';

const expect = chai.expect;

describe('when using the histograms experimental resource', () => {
    it('I can get transaction histogram report data', async () => {
        const data = await experimentalApiInstance.histograms.getAll();
        console.log(data);
    });
});
