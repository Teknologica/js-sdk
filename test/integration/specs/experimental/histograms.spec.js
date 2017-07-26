import chai from 'chai';
import {experimentalApiInstance} from '../../api-instance';

const expect = chai.expect;

describe('when using the histograms experimental resource', () => {

    it('I can get transaction histogram report data', async () => {
        const histogramData = await experimentalApiInstance.histograms.getTransactionHistogramReport(
            {
                periodStart: '2017-07-19T00:00:00Z',
                periodEnd: '2017-07-23T23:59:59Z',
                aggregationField: 'website',
                aggregationPeriod: 'day',
                metric: 'sales'
            });

        expect(histogramData.response.status).to.be.equal(200);

    });
});
