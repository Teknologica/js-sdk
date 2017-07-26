import chai from 'chai';
import {experimentalApiInstance} from '../../api-instance';
import {generateFutureAPIDate} from '../../utils';

const expect = chai.expect;

describe('when using the reports experimental resource', () => {
    it('I can retrieve a cumulative subscriptions plans report', async () => {
        const report = await experimentalApiInstance.reports.getCumulativeSubscriptionsPlans({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a cumulative subscriptions report', async () => {
        const report = await experimentalApiInstance.reports.getCumulativeSubscriptions({aggregationField: 'day', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a DCC markup report', async () => {
        const report = await experimentalApiInstance.reports.getDccMarkup({aggregationField: 'day', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a disputes report', async () => {
        const report = await experimentalApiInstance.reports.getDisputes({aggregationField: 'website', periodMonth: '2017-07'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve an events triggered summary report', async () => {
        const report = await experimentalApiInstance.reports.getEventsTriggeredSummary({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a rules matched summary report', async () => {
        const report = await experimentalApiInstance.reports.getRulesMatchedSummary({eventType: 'dispute-created', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a future renewals report', async () => {
        const report = await experimentalApiInstance.reports.getFutureRenewals({periodStart: generateFutureAPIDate(), periodEnd: generateFutureAPIDate()});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a renewal sales report', async () => {
        const report = await experimentalApiInstance.reports.getRenewalSales({periodStart: '2017-07', periodEnd: '2017-08'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a retention percentage report', async () => {
        const report = await experimentalApiInstance.reports.getRetentionPercentage({aggregationField: 'month', aggregationPeriod: 'month', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a retention value report', async () => {
        const report = await experimentalApiInstance.reports.getRetentionValue({aggregationField: 'month', aggregationPeriod: 'month', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a retry transaction report', async () => {
        const report = await experimentalApiInstance.reports.getRetryTransaction({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve statistics report', async () => {
        const report = await experimentalApiInstance.reports.getStatistics();
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a subscription cancellation report', async () => {
        const report = await experimentalApiInstance.reports.getSubscriptionCancellation({aggregationField: 'canceledBy', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a subscription renewal list report', async () => {
        const report = await experimentalApiInstance.reports.getSubscriptionRenewalList({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a subscription renewal report', async () => {
        const report = await experimentalApiInstance.reports.getSubscriptionRenewal({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a time series transaction report', async () => {
        const report = await experimentalApiInstance.reports.getTimeSeriesTransaction({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z', type: 'count', subaggregate: 'gateway-account'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a transactions plan report', async () => {
        const report = await experimentalApiInstance.reports.getTransactionsPlan({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a transactions time dispute report', async () => {
        const report = await experimentalApiInstance.reports.getTransactionsTimeDispute({aggregationField: 'day', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a transactions report', async () => {
        const report = await experimentalApiInstance.reports.getTransactions({aggregationField: 'website', periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });

    it('I can retrieve a payments success by decline reason report', async () => {
        const report = await experimentalApiInstance.reports.getPaymentsSuccessByDeclineReason({periodStart: '2017-07-19T00:00:00Z', periodEnd: '2017-07-26T23:59:59Z'});
        expect(report.response.status).to.be.equal(200);
    });
});
