import chai from 'chai';
import {experimentalApiInstance} from '../../api-instance';

const expect = chai.expect;

describe('when using the cumulative subscriptions plans experimental resource', () => {
    it('I can retrieve a cumulative subscriptions plans report', async () => {
        const report = await experimentalApiInstance.cumulativeSubscriptionsPlans.getAll({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        console.log(report.items[0].fields);
    });
});
