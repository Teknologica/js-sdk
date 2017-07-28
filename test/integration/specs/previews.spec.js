import chai from 'chai';
import apiInstance from '../api-instance';
import {
    getWebhookRequestBinUrl,
    createEmailCredData,
    createWebhookCredData,
    createWebhookPreviewData,
    createTriggerWebhookPreviewData,
    createSendEmailPreviewData
} from '../utils';

const expect = chai.expect;

describe('when using the previews resource', () => {
    let webhookTestUrl;

    before(async () => {
        /**
         * create a new webhook test url
         */
        webhookTestUrl = await getWebhookRequestBinUrl();
    });

    it('I can trigger a preview for a global webhook', async () => {
        const credentialsStub = createWebhookCredData(webhookTestUrl);
        const credentials = await apiInstance.credentialHashes.createWebhookCredential({data: credentialsStub});
        const webhookPreviewStub = createWebhookPreviewData({
            url: webhookTestUrl,
            credentialHash: credentials.fields.hash
        });
        const preview = await apiInstance.previews.webhook({data: webhookPreviewStub});
        expect(preview.response.status).to.be.equal(204);
    });

    it('I can trigger a preview for a rule action webhook', async () => {
        const credentialsStub = createWebhookCredData(webhookTestUrl);
        const credentials = await apiInstance.credentialHashes.createWebhookCredential({data: credentialsStub});
        const webhookPreviewStub = createTriggerWebhookPreviewData({
            url: webhookTestUrl,
            credentialHash: credentials.fields.hash
        });
        const preview = await apiInstance.previews.triggerWebhookRuleAction({data: webhookPreviewStub});
        expect(preview.response.status).to.be.equal(204);
    });

    it('I can trigger a preview for a rule action email', async () => {
        const credentialsStub = createEmailCredData();
        const credentials = await apiInstance.credentialHashes.createEmailCredential({data: credentialsStub});
        const sendEmailPreviewStub = createSendEmailPreviewData({credentialHash: credentials.fields.hash});
        const preview = await apiInstance.previews.sendEmailRuleAction({data: sendEmailPreviewStub});
        expect(preview.response.status).to.be.equal(204);
    });
});
