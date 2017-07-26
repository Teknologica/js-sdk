import chai from 'chai';
import apiInstance from '../api-instance';
import {createSessionsData} from '../utils.js';

const expect = chai.expect;

describe('when using the sessions resource', () => {

    let sharedSessionId;

    it('I can create a sessions with ID', async() => {
        const {id: id, ...data} = createSessionsData(true);
        const session = await apiInstance.sessions.create({id: id, data: data});
        expect(session.response.status).to.be.equal(201);
    });


    it('I can create a sessions without ID', async() => {
        const {id: id, ...data} = createSessionsData(true);
        const session = await apiInstance.sessions.create({id: id, data: data});
        expect(session.response.status).to.be.equal(201);
    });


    it('I can get a list of sessions', async() => {
        const sessions = await apiInstance.sessions.getAll();
        expect(sessions.response.status).to.be.equal(200);
        expect(sessions.total).to.not.be.equal(0);
        const [sessionItem] = sessions.items;
        expect(sessionItem.fields.id).to.not.be.undefined;
        sharedSessionId = sessionItem.fields.id;
    });


    it('I can get a sessions by its ID', async () => {
        const session = await apiInstance.sessions.get({id: sharedSessionId});
        expect(session.fields.id).to.be.equal(sharedSessionId);
        expect(session.response.status).to.be.equal(200);

    });


    it('I can update a sessions by its ID', async() => {
        const data = createSessionsData(false);
        const session = await apiInstance.sessions.update({id: sharedSessionId, data: data});
        expect(session.response.status).to.be.equal(200);

    });


    it('I can delete a sessions by its ID', async() => {
        const session = await apiInstance.sessions.delete({id: sharedSessionId});
        expect(session.response.status).to.be.equal(204);
    });

});
