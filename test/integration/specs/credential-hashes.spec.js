import chai from 'chai';
import apiInstance from '../api-instance';
import {createWebhookCredData, createEmailCredData} from '../utils';

const expect = chai.expect;

describe('when using the credential hashes resource', () => {
    const testHashes = {webhook: null, email: null};

    it('I can create a website credential hash', async () => {
        const webhookStub = createWebhookCredData();
        const credential = await apiInstance.credentialHashes.createWebhookCredential({data: webhookStub});
        testHashes.webhook = credential.fields.hash;
        expect(credential.fields.host).to.be.equal(webhookStub.host);
    });

    it('I can retrieve a website credential by its hash', async () => {
        const credential = await apiInstance.credentialHashes.getWebhookCredential({hash: testHashes.webhook});
        expect(credential.fields.hash).to.be.equal(testHashes.webhook);
    });

    it('I can create an email credential hash', async () => {
        const emailStub = createEmailCredData();
        const credential = await apiInstance.credentialHashes.createEmailCredential({data: emailStub});
        testHashes.email = credential.fields.hash;
        expect(credential.fields.host).to.be.equal(emailStub.host);
    });

    it('I can retrieve an email credential by its hash', async () => {
        const credential = await apiInstance.credentialHashes.getEmailCredential({hash: testHashes.email});
        expect(credential.fields.hash).to.be.equal(testHashes.email);
    });
    
});
