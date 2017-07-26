import chai from 'chai';
import apiInstance from '../api-instance';
import {createOrganizationData} from '../utils';

const expect = chai.expect;

describe('when using the organizations resource', () => {
    const testIds = {with: null, without: null};

    it('I can create an organization without an ID', async () => {
        const organizationData = createOrganizationData();
        const key = await apiInstance.organizations.create({data: organizationData});
        testIds.without = key.fields.id;
        expect(key.fields.name).to.be.equal(organizationData.name);
    });

    it('I can create an organization with an ID', async () => {
        const {id, ...data} = createOrganizationData(true);
        const key = await apiInstance.organizations.create({id, data: data});
        expect(key.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(key.fields.country).to.be.deep.equal(data.country);
    });

    it('I can get a list of organizations', async () => {
        const keys = await apiInstance.organizations.getAll();
        expect(keys.total).to.not.be.equal(0);
        const [key] = keys.items;
        expect(key.fields.id).to.not.be.undefined;
    });

    it('I can get an organization by using its ID', async () => {
        const key = await apiInstance.organizations.get({id: testIds.with});
        expect(key.fields.id).to.be.equal(testIds.with);
    });

    it('I can update an organization', async () => {
        const organizationData = createOrganizationData();
        const key = await apiInstance.organizations.update({id: testIds.without, data: organizationData});
        expect(key.fields.id).to.be.equal(testIds.without);
        expect(key.fields.city).to.be.equal(organizationData.city);
    });

    it('I can delete an organization', async () => {
        const firstDelete = await apiInstance.organizations.delete({id: testIds.with});
        const secondDelete = await apiInstance.organizations.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
