import chai from 'chai';
import apiInstance from '../api-instance';
import {createBlacklistData} from '../utils';

const expect = chai.expect;

describe('when using the blacklists resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a blacklist item without an ID', async () => {
        const blacklistItemStub = createBlacklistData();
        const blacklistItem = await apiInstance.blacklists.create({data: blacklistItemStub});
        testIds.without = blacklistItem.fields.id;
        expect(blacklistItem.fields.value).to.be.equal(blacklistItemStub.value);
    });

    it('I can create a blacklist item with an ID', async () => {
        const {id, ...data} = createBlacklistData(true);
        const blackistItem = await apiInstance.blacklists.create({id, data});
        expect(blackistItem.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(blackistItem.fields.value).to.be.equal(value);
    });

    it('I can get a list of blacklist items', async () => {
        const blacklistItems = await apiInstance.blacklists.getAll();
        expect(blacklistItems.total).to.not.be.equal(0);
        const [blacklistItem] = blacklistItems.items;
        expect(blacklistItem.fields.id).to.not.be.undefined;
    });

    it('I can get a blacklist item by using its ID', async () => {
        const blacklistItem = await apiInstance.blacklists.get({id: testIds.with});
        expect(blacklistItem.fields.id).to.be.equal(testIds.with);
    });

    it('I can delete the blacklist items I just created', async () => {
        const firstDelete = await apiInstance.blacklists.delete({id: testIds.with});
        const secondDelete = await apiInstance.blacklists.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
