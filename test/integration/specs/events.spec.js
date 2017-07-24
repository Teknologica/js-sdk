import chai from 'chai';
import apiInstance from '../api-instance';
import {createEventRulesData} from '../utils';

const expect = chai.expect;

describe('when using the events resource', () => {
    const eventType = 'dispute-created';

    it('I can get a list of existing events', async () => {
        const events = await apiInstance.events.getAll();
        expect(events.total).to.not.be.equal(0);
        expect(events.response.status).to.be.equal(200);
    });

    it('I can get event information using the event type', async () => {
        const event = await apiInstance.events.get({eventType});
        expect(event.fields.eventType).to.be.equal(eventType);
        expect(event.response.status).to.be.equal(200);
    });

    it('I can create rules for an event type', async () => {
        const eventRulesStub = createEventRulesData();
        const event = await apiInstance.events.createRules({eventType, data: eventRulesStub});
        const [ruleStub] = eventRulesStub.rules;
        const [ruleResponse] = event.fields.rules;
        expect(ruleResponse.name).to.be.equal(ruleStub.name);
        expect(event.response.status).to.be.equal(200);
    });

    it('I can update rules for an event type', async () => {
        const eventRulesStub = createEventRulesData();
        const event = await apiInstance.events.updateRules({eventType, data: eventRulesStub});
        const [ruleStub] = eventRulesStub.rules;
        const [ruleResponse] = event.fields.rules;
        expect(ruleResponse.name).to.be.equal(ruleStub.name);
        expect(event.response.status).to.be.equal(200);
    });

    it('I can get the entire history of rules for an event type', async () => {
        const rulesHistory = await apiInstance.events.getRulesHistory({eventType});
        const [rule] = rulesHistory.items;
        expect(rulesHistory.total).to.not.be.equal(0);
        expect(rulesHistory.response.status).to.be.equal(200);
        expect(rule.fields.version).to.not.be.undefined;
    });

    it('I can get the rule history created time for a specific version number', async () => {
        const ruleHistory = await apiInstance.events.getRulesVersionNumber({eventType, version: 1});
        expect(ruleHistory.fields.createdTime).to.not.be.undefined;
    });

    it('I can get the rules for an event type at a specific version number', async () => {
        const ruleHistory = await apiInstance.events.getRulesVersionDetail({eventType, version: 1});
        expect(ruleHistory.fields.rules).to.not.be.undefined;
    });
});
