import chai from 'chai';
import apiInstance from '../api-instance';
import {
    createCustomerData,
    createPaymentCard,
    createWebsiteData,
    createGatewayAccountData,
    createPaymentCardAuthorizationData
} from '../utils';

const expect = chai.expect;

describe('when using the payment cards resource', () => {
    const testIds = {with: null, without: null};
    let sharedData;
    let gatewayAccount;
    let migratableCard;
    let sharedGatewayData;

    before(async () => {
        /**
         * create a new customer
         */
        const customer = await apiInstance.customers.create({data: createCustomerData()});
        /**
         * fill the shared data object with customer ID and customer primary address
         */
        sharedData = {customerId: customer.fields.id, billingAddress: customer.fields.primaryAddress};
    });

    it('I can create a payment card for a customer without an ID', async () => {
        const paymentCardStub = createPaymentCard(false, sharedData);
        const paymentCard = await apiInstance.paymentCards.create({data: paymentCardStub});
        testIds.without = paymentCard.fields.id;
        expect(paymentCard.fields.customerId).to.be.equal(sharedData.customerId);
    });

    it('I can create a payment card for a customer with an ID', async () => {
        const {id, ...data} = createPaymentCard(true, sharedData);
        const paymentCard = await apiInstance.paymentCards.create({id, data});
        testIds.with = paymentCard.fields.id;
        expect(paymentCard.fields.customerId).to.be.equal(sharedData.customerId);
    });

    it('I can authorize a payment card using its ID', async () => {
        const websiteStub = createWebsiteData();
        const [website, organizations] = await Promise.all([
            apiInstance.websites.create({data: websiteStub}),
            apiInstance.organizations.getAll()
        ]);
        const [organization] = organizations.items;
        sharedGatewayData = {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        };
        const gatewayAccountStub = createGatewayAccountData(false, sharedGatewayData);
        gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountStub});
        const authStub = createPaymentCardAuthorizationData(website.fields.id,gatewayAccount.fields.id);
        const authorizaton = await apiInstance.paymentCards.authorize({id: testIds.with, data: authStub});
        expect(authorizaton.fields.id).to.be.equal(testIds.with);
        expect(authorizaton.fields.status).to.be.equal('active');
    });

    it('I can deactivate the payment cards I just created', async () => {
        const firstDeactivate = await apiInstance.paymentCards.deactivate({id: testIds.with});
        const secondDeactivate = await apiInstance.paymentCards.deactivate({id: testIds.without});
        expect(firstDeactivate.fields.status).to.be.equal('deactivated');
        expect(secondDeactivate.fields.status).to.be.equal('deactivated');
    });

    it('I can get a list of cards that can be migrated to a different gateway account', async () => {
        const cards = await apiInstance.paymentCards.getAllMigratable({filter: `gatewayAccountId:${gatewayAccount.fields.id}`});
        expect(cards.total).to.be.equal(1);
        [migratableCard] = cards.items;
        expect(migratableCard.fields.id).to.be.equal(testIds.with);
    });

    it('I can migrate a payment card from one gateway account to another', async () => {
        const gatewayAccountStub = createGatewayAccountData(false, sharedGatewayData);
        const targetGatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountStub});
        const data = {
          fromGatewayAccountId: gatewayAccount.fields.id,
          toGatewayAccountId: targetGatewayAccount.fields.id,
          paymentCardIds: [migratableCard.fields.id]
        };
        const migration = await apiInstance.paymentCards.migrate({data});
        expect(migration.response.status).to.be.equal(201);
    });
});
