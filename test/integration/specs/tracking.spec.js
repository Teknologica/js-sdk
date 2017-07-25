import chai from 'chai';
import apiInstance from '../api-instance';

const expect = chai.expect;

describe('when using the tracking resource', () => {
    let sharedApiLogId;
    let sharedSubscriptionLogId;
    let sharedWebhookNotificationLogId;

    it('I can get a list of api logs', async () => {
        const apiLogs = await apiInstance.tracking.getAllApiLogs();
        expect(apiLogs.total).to.not.be.equal(0);
        const [apiLogsItem] = apiLogs.items;
        expect(apiLogsItem.fields.id).to.not.be.undefined;
        expect(apiLogs.response.status).to.be.equal(200);
        sharedApiLogId = apiLogsItem.fields.id;
    });

    it('I can get a api log by its ID', async () => {
        const apiLog = await apiInstance.tracking.getApiLog({id: sharedApiLogId});
        expect(apiLog.fields.id).to.be.equal(sharedApiLogId);
        expect(apiLog.response.status).to.be.equal(200);
    });

    it.skip('I can get a list of subscription logs', async () => {
        const subscriptionLogs = await apiInstance.tracking.getAllSubscriptionLogs();
        expect(subscriptionLogs.total).to.not.be.equal(0);
        const [subscriptionLogsItem] = subscriptionLogs.items;

        expect(subscriptionLogsItem.fields.id).to.not.be.undefined;
        expect(subscriptionLogs.response.status).to.be.equal(200);
        sharedSubscriptionLogId = subscriptionLogsItem.fields.id;
    });


    it.skip('I can get a subscription log by its ID', async() => {
        const subscriptionLog = await apiInstance.tracking.getSubscriptionLog({id: sharedSubscriptionLogId});
        expect(subscriptionLog.fields.id).to.be.equal(sharedSubscriptionLogId);
        expect(subscriptionLog.response.status).to.be.equal(200);
    });


    it.skip('I can get a list of webhook notification logs', async () => {
        const webhookNotificationLogs = await apiInstance.tracking.getAllWebhookNotificationLogs();
        expect(webhookNotificationLogs.total).to.not.be.equal(0);
        const [webhookNotificationLogsItem] = subscriptionLogs.items;
        expect(webhookNotificationLogsItem.fields.id).to.not.be.undefined;
        expect(webhookNotificationLogs.response.status).to.be.equal(200);
        sharedWebhookNotificationLogId = webhookNotificationLogsItem.fields.id;
    });

    it.skip('I can get a webhook notification log by its ID', async() => {
        const webhookNotificationLog = await apiInstance.tracking.getLeadSource({id: sharedWebhookNotificationLogId});
        expect(webhookNotificationLog.fields.id).to.be.equal(sharedSubscriptionLogId);
        expect(webhookNotificationLog.response.status).to.be.equal(200);
    });

    it.skip('I can get a list of changes history', async () => {
        const changesHistory = await apiInstance.tracking.getAllListsChangesHistory();
        expect(changesHistory.total).to.not.be.equal(0);
        const [changesHistoryItem] = subscriptionLogs.items;
        expect(changesHistoryItem.fields.id).to.not.be.undefined;
        expect(changesHistory.response.status).to.be.equal(200);
    });

});


