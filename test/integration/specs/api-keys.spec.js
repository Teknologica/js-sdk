import chai from 'chai';
import apiInstance from '../api-instance';
import {createApiKeyData} from '../utils';

const expect = chai.expect;

describe('when using the API keys resource', () => {
    const testIds = {with: null, without: null};

    it('I can create an API key without an ID', async () => {
        const keyStub = createApiKeyData();
        const key = await apiInstance.apiKeys.create({data: keyStub});
        testIds.without = key.fields.id;
        expect(key.fields.description).to.be.equal(keyStub.description);
    });

    it('I can create an API key with an ID', async () => {
        const {id, description} = createApiKeyData(true);
        const key = await apiInstance.apiKeys.create({id, data: {description}});
        expect(key.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(key.fields.description).to.be.equal(description);
    });

    it('I can get a list of API keys', async () => {
        const keys = await apiInstance.apiKeys.getAll();
        expect(keys.total).to.not.be.equal(0);
        const [key] = keys.items;
        expect(key.fields.id).to.not.be.undefined;
    });

    it('I can get an API key by using its ID', async () => {
        const key = await apiInstance.apiKeys.get({id: testIds.with});
        expect(key.fields.id).to.be.equal(testIds.with);
    });

    it('I can update an API key', async () => {
        const keyStub = createApiKeyData();
        const key = await apiInstance.apiKeys.update({id: testIds.without, data: keyStub});
        expect(key.fields.id).to.be.equal(testIds.without);
        expect(key.fields.description).to.be.equal(keyStub.description);
    });

    it('I can delete an API key', async () => {
        const firstDelete = await apiInstance.apiKeys.delete({id: testIds.with});
        const secondDelete = await apiInstance.apiKeys.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
