import chai from 'chai';
import apiInstance from '../api-instance';
import {createSessionsData} from '../utils.js';

const expect = chai.expect;

describe('when using the sessions resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a sessions with ID', async() => {
        const {id: id, ...data} = createSessionsData(true);
        const session = await apiInstance.sessions.create({id: id, data: data});
        testIds.with = id;
        expect(session.response.status).to.be.equal(201);
    });


    it('I can create a sessions without ID', async() => {
        const {id: id, ...data} = createSessionsData(false);
        const session = await apiInstance.sessions.create({id: id, data: data});
        testIds.without = session.fields.id;
        expect(session.response.status).to.be.equal(201);
    });


    it('I can get a list of sessions', async() => {
        const sessions = await apiInstance.sessions.getAll();
        expect(sessions.response.status).to.be.equal(200);
        expect(sessions.total).to.not.be.equal(0);
        const [sessionItem] = sessions.items;
        expect(sessionItem.fields.id).to.not.be.undefined;
    });


    it('I can get a sessions by its ID', async () => {
        const session = await apiInstance.sessions.get({id: testIds.with});
        expect(session.fields.id).to.be.equal(testIds.with);
        expect(session.response.status).to.be.equal(200);

    });


    it('I can update a sessions by its ID', async() => {
        const data = createSessionsData(false);
        const session = await apiInstance.sessions.update({id: testIds.with, data: data});
        expect(session.response.status).to.be.equal(200);

    });


    it('I can delete a sessions by its ID', async() => {
        const firstSession = await apiInstance.sessions.delete({id: testIds.with});
        const secondSession = await apiInstance.sessions.delete({id: testIds.without});
        expect(firstSession.response.status).to.be.equal(204);
        expect(secondSession.response.status).to.be.equal(204);
    });

});
