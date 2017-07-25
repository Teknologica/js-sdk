import chai from 'chai';
import apiInstance from '../api-instance';
import {createPlanData, createWebsiteData, createCheckoutPageData} from '../utils';

const expect = chai.expect;

describe('when using the checkout pages resource', () => {
    const testIds = {with: null, without: null};
    let plan;
    let website;
    let sharedData;

    before(async () => {
        const {id, ...data} = createPlanData(true);
        const websiteData = createWebsiteData();
        plan = await apiInstance.plans.create({id, data});
        website = await apiInstance.websites.create({data: websiteData});
        sharedData = {
            planId: plan.fields.id,
            websiteId: website.fields.id
        };
    });

    it('I can create a checkout page item without an ID', async () => {
        const checkoutPageStub = createCheckoutPageData(false, sharedData);
        const checkoutPage = await apiInstance.checkoutPages.create({data: checkoutPageStub});
        testIds.without = checkoutPage.fields.id;
        expect(checkoutPage.fields.uriPath).to.be.equal(checkoutPageStub.uriPath);
        expect(checkoutPage.fields.planId).to.be.equal(checkoutPageStub.planId);
        expect(checkoutPage.fields.websiteId).to.be.equal(checkoutPageStub.websiteId);
    });

    it('I can create a checkout page item with an ID', async () => {
        const {id, ...data} = createCheckoutPageData(true, sharedData);
        const checkoutPage = await apiInstance.checkoutPages.create({id, data});
        expect(checkoutPage.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(checkoutPage.fields.uriPath).to.be.equal(data.uriPath);
        expect(checkoutPage.fields.planId).to.be.equal(data.planId);
        expect(checkoutPage.fields.websiteId).to.be.equal(data.websiteId);
    });

    it('I can get a list of checkout pages', async () => {
        const checkoutPages = await apiInstance.checkoutPages.getAll();
        expect(checkoutPages.total).to.not.be.equal(0);
        const [checkoutPage] = checkoutPages.items;
        expect(checkoutPage.fields.id).to.not.be.undefined;
    });

    it('I can get a checkout page by using its ID', async () => {
        const checkoutPage = await apiInstance.checkoutPages.get({id: testIds.with});
        expect(checkoutPage.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a checkout page by using its ID', async () => {
        const {name} = createCheckoutPageData();
        const checkoutPage = await apiInstance.checkoutPages.update({id: testIds.with, data: {name}});
        expect(checkoutPage.fields.name).to.be.equal(name);
    });

    it('I can delete the checkout pages I just created', async () => {
        const firstDelete = await apiInstance.checkoutPages.delete({id: testIds.with});
        const secondDelete = await apiInstance.checkoutPages.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
