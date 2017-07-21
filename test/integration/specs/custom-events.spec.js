import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomEventData} from '../utils';

const expect = chai.expect;

//TODO cannot complete testing suite for custom events because of underlying scheduled custom event behavior (cron)
describe('when using the custom events resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a custom event without an ID', async () => {
        const customEventStub = createCustomEventData();
        const customEvent = await apiInstance.customEvents.create({data: customEventStub});
        testIds.without = customEvent.fields.id;
        expect(customEvent.fields.description).to.be.equal(customEventStub.description);
    });

    it('I can create a custom event with an ID', async () => {
        const {id, ...data} = createCustomEventData(true);
        const customEvent = await apiInstance.customEvents.create({id, data});
        expect(customEvent.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(customEvent.fields.description).to.be.equal(data.description);
    });

    it.skip('I can get a list of scheduled custom events', async () => {
        const customEvents = await apiInstance.customEvents.getAllScheduled();
        expect(customEvents.total).to.not.be.equal(0);
        const [customEvent] = customEvents.items;
        expect(customEvent.fields.id).to.not.be.undefined;
    });

    it.skip('I can get a scheduled custom event by using its ID', async () => {
        const customEvent = await apiInstance.customEvents.getScheduled({id: testIds.with});
        expect(customEvent.fields.id).to.be.equal(testIds.with);
    });

    it.skip('I can get a list of custom events', async () => {
        const customEvents = await apiInstance.customEvents.getAll();
        expect(customEvents.total).to.not.be.equal(0);
        const [customEvent] = customEvents.items;
        expect(customEvent.fields.id).to.not.be.undefined;
    });

    it.skip('I can get a custom event by using its ID', async () => {
        const customEvent = await apiInstance.customEvents.get({id: testIds.with});
        expect(customEvent.fields.id).to.be.equal(testIds.with);
    });

    it.skip('I can delete a custom event by using its ID', async () => {
        const customEvent = await apiInstance.customEvents.delete({id: testIds.with});
        expect(customEvent.response.status).to.be.equal(204);
    });

    it.skip('I can delete a scheduled custom event', () => {});
    it.skip('I can get the rules attached to a custom event', () => {});
    it.skip('I can create rules for a custom event', () => {});
    it.skip('I can update the rules of a custom event', () => {});
    it.skip('I can get the rules history for a custom event', () => {});
    it.skip('I can get the rules for a custom event based on the version number', () => {});
    it.skip('I can get the rules history details for a custom event based on the version number', () => {});
});
