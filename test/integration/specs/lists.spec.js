import chai from 'chai';
import apiInstance from '../api-instance';
import {createListData} from '../utils';

const expect = chai.expect;

describe('when using the lists resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a list without an ID', async () => {
        const listData = createListData();
        const list = await apiInstance.lists.create({data: listData});
        testIds.without = list.fields.id;
        expect(list.fields.name).to.be.equal(listData.name);
    });

    it('I can create a list with an ID', async () => {
        const {id, ...data} = createListData(true);
        const list = await apiInstance.lists.create({id, data: data});
        expect(list.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(list.fields.values).to.be.deep.equal(data.values);
    });

    it('I can get a list of lists', async () => {
        const lists = await apiInstance.lists.getAll();
        expect(lists.total).to.not.be.equal(0);
        const [list] = lists.items;
        expect(list.fields.id).to.not.be.undefined;
    });

    it('I can get a list by using its ID', async () => {
        const list = await apiInstance.lists.get({id: testIds.with});
        expect(list.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a list', async () => {
        const listData = createListData();
        const list = await apiInstance.lists.update({id: testIds.without, data: listData});
        expect(list.fields.id).to.be.equal(testIds.without);
        expect(list.fields.description).to.be.equal(listData.description);
    });

    it('I can delete a list', async () => {
        const firstDelete = await apiInstance.lists.delete({id: testIds.with});
        const secondDelete = await apiInstance.lists.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
