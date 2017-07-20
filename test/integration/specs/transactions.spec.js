import chai from 'chai';
import apiInstance from '../api-instance';

const expect = chai.expect;

describe('when using the transactions resource', () => {
  let transactionId;

  it('I can a list of transactions', async () => {
    const transactions = await apiInstance.transactions.getAll();
    expect(transactions.total).to.not.be.equal(0);
    const [transactionsItem] = transactions.items;
    expect(transactionsItem.fields.id).to.not.be.undefined;
    transactionId = transactionsItem.fields.id;
  });

  it('I can get a transaction by its ID', async () => {
    const transaction = await apiInstance.transactions.get({id: transactionId});
    expect(transaction.fields.id).to.be.equal(transactionId);
  });

});


