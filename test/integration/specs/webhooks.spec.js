import chai from 'chai';
import apiInstance from '../api-instance';
import {createWebhookCredData, createWebhookData} from '../utils';

const expect = chai.expect;

describe('when using the webhooks resource', () => {
    const testIds = {with: null, without: null};
    let sharedData = {};

    before(async () => {
        const data = createWebhookCredData();
        const WebhookCredHash = await apiInstance.credentialHashes.createWebhookCredential({data});
        sharedData.credentialHash = WebhookCredHash.fields.hash;

    });

    it('I can create a webhook without an ID', async () => {
        const data = createWebhookData(false, sharedData);
        const webhook = await apiInstance.webhooks.create({data});
        testIds.without = webhook.fields.id;
        expect(webhook.fields.value).to.be.equal(data.value);
        expect(webhook.response.status).to.be.equal(201);
    });

    it('I can create a webhook with an ID', async () => {
        const {id, ...data} = createWebhookData(true, sharedData);
        const webhook = await apiInstance.webhooks.create({id, data});
        expect(webhook.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(webhook.fields.value).to.be.equal(data.value);
        expect(webhook.response.status).to.be.equal(201);
    });

    it('I can get a list of webhooks', async () => {
        const webhook = await apiInstance.webhooks.getAll();
        expect(webhook.total).to.not.be.equal(0);
        const [webhookItem] = webhook.items;
        expect(webhookItem.fields.id).to.not.be.undefined;
    });

    it('I can get a webhook by using its ID', async () => {
        const webhookItem = await apiInstance.webhooks.get({id: testIds.with});
        expect(webhookItem.fields.id).to.be.equal(testIds.with);
        expect(webhookItem.response.status).to.be.equal(200);
    });

    it('I can update a webhook by using its ID', async () => {
        const data = createWebhookData(false, sharedData);
        const webhook = await apiInstance.webhooks.update({id: testIds.with, data: data});
        expect(webhook.fields.value).to.be.equal(data.value);
        expect(webhook.response.status).to.be.equal(200);
    });
});
