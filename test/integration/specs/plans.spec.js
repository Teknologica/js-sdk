import chai from 'chai';
import apiInstance from '../api-instance';
import {createPlanData} from '../utils';

const expect = chai.expect;

describe('when using the plans resource', () => {
    const testIds = {with: null, without: null};
    
    it('I can create a plan item without an ID', async () => {
        const planData = createPlanData();
        const plan = await apiInstance.plans.create({data: planData});
        testIds.without = plan.fields.id;
        expect(plan.fields.name).to.be.equal(planData.name);
    });

    it('I can create a plan item with an ID', async () => {
        const {id, ...data} = createPlanData(true);
        const plan = await apiInstance.plans.create({id, data});
        expect(plan.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(plan.fields.currency).to.be.equal(data.currency);
    });

    it('I can get a list of plans', async () => {
        const plans = await apiInstance.plans.getAll();
        expect(plans.total).to.not.be.equal(0);
        const [plan] = plans.items;
        expect(plan.fields.id).to.not.be.undefined;
    });

    it('I can get a plan by using its ID', async () => {
        const plan = await apiInstance.plans.get({id: testIds.with});
        expect(plan.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a plan by using its ID', async () => {
        const planData = createPlanData();
        const plan = await apiInstance.plans.update({id: testIds.with, data: planData});
        expect(plan.fields.name).to.be.equal(planData.name);
    });

    it('I can delete a plan', async () => {
        const firstDelete = await apiInstance.plans.delete({id: testIds.with});
        const secondDelete = await apiInstance.plans.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
