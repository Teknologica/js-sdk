import chai from 'chai';
import apiInstance from '../api-instance';
import {createWebsiteData} from '../utils';

const expect = chai.expect;

describe('when using the websites resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a website without an ID', async () => {
        const data = createWebsiteData();
        const website = await apiInstance.websites.create({data: data});
        testIds.without = website.fields.id;
        expect(website.fields.value).to.be.equal(data.value);
    });

    it('I can create a website with an ID', async () => {
        const {id, ...data} = createWebsiteData(true);
        const website = await apiInstance.websites.create({id, data});
        expect(website.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(website.fields.value).to.be.equal(data.value);
    });

    it('I can get a list of websites', async () => {
        const websites = await apiInstance.websites.getAll();
        expect(websites.total).to.not.be.equal(0);
        const [websitesItem] = websites.items;
        expect(websitesItem.fields.id).to.not.be.undefined;
    });

    it('I can get a website by using its ID', async () => {
        const websiteItem = await apiInstance.websites.get({id: testIds.with});
        expect(websiteItem.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a website by using its ID', async () => {
        const data = createWebsiteData();
        const website = await apiInstance.websites.update({id: testIds.with, data: data});
        expect(website.fields.value).to.be.equal(data.value);
        expect(website.response.status).to.be.equal(200);

    });

    it('I can delete the websites I just created', async () => {
        const firstDelete = await apiInstance.websites.delete({id: testIds.with});
        const secondDelete = await apiInstance.websites.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
