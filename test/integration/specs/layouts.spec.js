import chai from 'chai';
import apiInstance from '../api-instance';
import {createPlanData, createLayoutData, createLayoutItemData} from '../utils';

const expect = chai.expect;

describe('when using the layouts resource', () => {
    const testIds = {with: null, without: null};
    let plans;

    before(async () => {
        const createPlans = Array.from(new Array(4)).map(() => {
            const planStub = createPlanData();
            return apiInstance.plans.create({data: planStub});
        });
        plans = await Promise.all(createPlans);
    });

    it('I can create a layout without an ID', async () => {
        const items = {items: plans.map(plan => createLayoutItemData(plan.fields.id))};
        const layoutStub = createLayoutData(false, items);
        const layout = await apiInstance.layouts.create({data: layoutStub});
        testIds.without = layout.fields.id;
        expect(layout.fields.name).to.be.equal(layoutStub.name);
    });

    it('I can create a layout with an ID', async () => {
        const items = {items: plans.map(plan => createLayoutItemData(plan.fields.id))};
        const {id, ...data} = createLayoutData(true, items);
        const layout = await apiInstance.layouts.create({id, data});
        testIds.with = layout.fields.id;
        expect(layout.fields.name).to.be.equal(data.name);
    });

    it('I can get a layout using its ID', async () => {
        const layout = await apiInstance.layouts.get({id: testIds.with});
        expect(layout.fields.id).to.be.equal(testIds.with);
        expect(layout.response.status).to.be.equal(200);
    });

    it('I can get a list of layouts', async () => {
        const layouts = await apiInstance.layouts.getAll();
        expect(layouts.total).to.not.be.equal(0);
        expect(layouts.response.status).to.be.equal(200);
    });

    it('I can update a layout using its ID', async () => {
        const items = {items: plans.slice(2).map(plan => createLayoutItemData(plan.fields.id))};
        const layoutStub = createLayoutData(false, items);
        const layout = await apiInstance.layouts.update({id: testIds.with, data: layoutStub});
        expect(layout.fields.items.length).to.be.equal(items.items.length);
    });

    it('I can delete the layouts I just created', async () => {
        const firstDelete = await apiInstance.layouts.delete({id: testIds.without});
        const secondDelete = await apiInstance.layouts.delete({id: testIds.with});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });

    after(async () => {
        const deletePlans = plans.map((plan) => apiInstance.plans.delete({id: plan.fields.id}));
        await Promise.all(deletePlans);
    });
});
