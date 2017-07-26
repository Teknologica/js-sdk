import chai from 'chai';
import {experimentalApiInstance} from '../../api-instance';

const expect = chai.expect;

describe('when using the histograms experimental resource', () => {

    it('I can get transaction histogram report data', async () => {
        const data = await experimentalApiInstance.histograms.getTransactionHistogramReport({periodStart: '2017-07-19T00:00:00Z',
                                                                                             periodEnd: '2017-07-28T23:59:59Z',
                                                                                            aggregationField: 'transactionResult',
                                                                                            aggregationPeriod: 'day',
                                                                                            metric: 'ApprovalThroughput' });
        console.log(data);
    });
});
