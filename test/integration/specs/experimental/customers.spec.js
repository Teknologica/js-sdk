import chai from 'chai';
import apiInstance, {experimentalApiInstance} from '../../api-instance';
import {createCustomerData} from '../../utils.js';

const expect = chai.expect;

describe('when using the customers experimental resource', () => {
    let sharedCustomerId;

    before(async() => {
        const {id: id, ...data} = createCustomerData(true);
        const customer = await apiInstance.customers.create({id:id, data: data});
        sharedCustomerId = customer.fields.id;
    });

    it('I can get customer lifetime summary metrics', async () => {
        const metricsData = await experimentalApiInstance.customers.getCustomerLifetimeSummaryMetrics({customerId: sharedCustomerId});
        expect(metricsData.response.status).to.be.equal(200);
    });
});
