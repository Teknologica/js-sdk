import chai from 'chai';
import apiInstance, {experimentalApiInstance} from '../../api-instance';
import {createCustomerData} from '../../utils.js';

const expect = chai.expect;

describe('when using the histograms experimental resource', () => {
    let sharedCustomerId;

    before(async() => {

        const {id: id, ...data} = createCustomerData(true);
        const customer = await apiInstance.customers.create({id:id, data: data});
        sharedCustomerId = customer.fields.id;
    });

    it('I can get  histogram report data', async () => {
        const data = await experimentalApiInstance.customers.getTransactionHistogramReport({periodStart: '2017-07-19T00:00:00Z',
            periodEnd: '2017-07-23T23:59:59Z',
            aggregationField: 'website',
            aggregationPeriod: 'day',
            metric: 'SalesCount' });
        console.log(data);
    });
});
