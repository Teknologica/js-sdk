import chai from 'chai';
import apiInstance from '../api-instance';
import {createTransactionLeadSourceData} from '../utils.js';

const expect = chai.expect;

// TODO test transactions cancel and refund api

describe('when using the transactions resource', () => {

    let sharedTransactionId;
    let cachedLeadSource;

    it('I can a list of transaction', async () => {
        const transactions = await apiInstance.transactions.getAll();
        expect(transactions.total).to.not.be.equal(0);
        const [transactionsItem] = transactions.items;
        expect(transactionsItem.fields.id).to.not.be.undefined;
        expect(transactions.response.status).to.be.equal(200);
        sharedTransactionId = transactionsItem.fields.id;
    });

    it('I can get a transaction by its ID', async () => {
        const transaction = await apiInstance.transactions.get({id: sharedTransactionId});
        expect(transaction.fields.id).to.be.equal(sharedTransactionId);
        expect(transaction.response.status).to.be.equal(200);
    });

    it('I can get gateway logs by transaction ID', async () => {
        const gatewayLogs = await apiInstance.transactions.getGatewayLogs({id: sharedTransactionId});
        expect(gatewayLogs.response.status).to.be.equal(200);
    });

    it('I can create a lead source for a transaction by using its ID', async () => {
        const data = createTransactionLeadSourceData();
        const leadSource = await apiInstance.transactions.createLeadSource({id: sharedTransactionId, data: data});
        cachedLeadSource = leadSource;
        expect(leadSource.fields.id).to.not.be.undefined;
        expect(leadSource.fields.campaign).to.be.equal(data.campaign);
        expect(leadSource.response.status).to.be.equal(201);
    });

    it('I can update a lead source for a transaction by using its ID', async () => {
        const {campaign} = createTransactionLeadSourceData();
        const data = {...cachedLeadSource.fields, campaign};
        const leadSource = await apiInstance.transactions.updateLeadSource({id: sharedTransactionId, data: data});
        expect(leadSource.fields.campaign).to.be.equal(campaign);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can get a lead source by using the transsaction ID', async () => {
        const leadSource = await apiInstance.transactions.getLeadSource({id: sharedTransactionId});
        expect(leadSource.fields.medium).to.be.equal(cachedLeadSource.fields.medium);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can delete a lead source that I just created for a specific transaction ID', async () => {
        const leadSource = await apiInstance.transactions.deleteLeadSource({id: sharedTransactionId});
        expect(leadSource.response.status).to.be.equal(204);
    });
});
