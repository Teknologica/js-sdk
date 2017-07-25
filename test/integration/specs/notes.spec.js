import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomerData, createNoteData} from '../utils';

const expect = chai.expect;

describe('when using the notes resource', () => {
    const testIds = {with: null, without: null};
    let customer;

    before(async () => {
        customer = await apiInstance.customers.create({data: createCustomerData()});
    });

    it('I can create a note for a customer without an ID', async () => {
        const noteStub = createNoteData(false, customer.fields.id);
        const note = await apiInstance.notes.create({data: noteStub});
        testIds.without = note.fields.id;
        expect(note.fields.content).to.be.equal(noteStub.content);
    });

    it('I can create a note for a customer with an ID', async () => {
        const {id, ...data} = createNoteData(true, customer.fields.id);
        const note = await apiInstance.notes.create({id, data});
        testIds.with = note.fields.id;
        expect(note.fields.id).to.be.equal(id);
        expect(note.fields.content).to.be.equal(data.content);
    });

    it('I can update a note for a customer using its ID', async () => {
        const data = createNoteData(false, customer.fields.id);
        const note = await apiInstance.notes.update({id: testIds.with, data});
        expect(note.fields.content).to.be.equal(data.content);
    });

    it('I can get a list of notes ', async () => {
        const notes = await apiInstance.notes.getAll();
        expect(notes.total).to.not.be.equal(0);
        expect(notes.response.status).to.be.equal(200);
    });

    it('I can get a note using its ID', async () => {
        const note = await apiInstance.notes.get({id:testIds.with});
        expect(note.fields.id).to.be.equal(testIds.with);
        expect(note.response.status).to.be.equal(200);
    });

});
