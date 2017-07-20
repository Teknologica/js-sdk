import chai from 'chai';
import apiInstance from '../api-instance';

import {createTransactionLeadSourceData} from '../utils.js';

const expect = chai.expect;


// didn't test transactions cancel and refund api

describe('when using the transactions resource', () => {
  let transactionId;

  it('I can a list of transactions', async () => {
    const transactions = await apiInstance.transactions.getAll();
    expect(transactions.total).to.not.be.equal(0);
    const [transactionsItem] = transactions.items;
    expect(transactionsItem.fields.id).to.not.be.undefined;
    expect(transactions.response.status).to.be.equal(200);
    transactionId = transactionsItem.fields.id;
  });

  it('I can get a transaction by its ID', async () => {
    const transaction = await apiInstance.transactions.get({id: transactionId});
    expect(transaction.fields.id).to.be.equal(transactionId);
    expect(transaction.response.status).to.be.equal(200);
  });

  it('I can get gateway logs by transaction ID', async () => {
    const gatewayLogs = await apiInstance.transactions.getGatewayLogs({id: transactionId});
    expect(gatewayLogs.response.status).to.be.equal(200);
  });

  it('I can create lead source by its ID', async() => {
    const data = createTransactionLeadSourceData();
    const leadSource = await apiInstance.transactions.createLeadSource({id: transactionId, data: data});
    expect(leadSource.fields.id).to.not.be.undefined;
    expect(leadSource.response.status).to.be.equal(200);
  });

  it('I can get a lead source by its ID', async() => {
    const leadSource = await apiInstance.transactions.getLeadSource({id: transactionId});
    expect(leadSource.response.status).to.be.equal(200);
  });

  it('I can delete lead source that I just created', async() => {
    const leadSource = await apiInstance.transactions.deleteLeadSource({id: transactionId});
    expect(leadSource.response.status).to.be.equal(204);
  });

});


