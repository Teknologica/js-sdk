import chai from 'chai';
import apiInstance from '../api-instance';
import {createGatewayAccountData, createWebsiteData} from '../utils';

const expect = chai.expect;

describe('when using the gateway accounts resource', () => {
    const testIds = {with: null, without: null};
    let website;
    let sharedData;

    before(async () => {
        /**
         * create a new website
         */
        const websiteStub = createWebsiteData();
        website = await apiInstance.websites.create({data: websiteStub});
        /**
         * get a organizations
         */
        const organizations = await apiInstance.organizations.getAll();
        const [organization] = organizations.items;
        /**
         * fill the shared data object with website ID and organization ID
         */
        sharedData = {
            websites: [website.fields.id],
            organizationId: organization.fields.id
        };
    });

    it('I can create a gateway account without an ID', async () => {
        const gatewayStub = createGatewayAccountData(false, sharedData);
        const gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayStub});
        testIds.without = gatewayAccount.fields.id;
        expect(gatewayAccount.fields.organizationId).to.be.equal(sharedData.organizationId);
    });

    it('I can create a gateway account with an ID', async () => {
        const {id, ...data} = createGatewayAccountData(true, sharedData);
        const gatewayAccount = await apiInstance.gatewayAccounts.create({id, data});
        testIds.with = gatewayAccount.fields.id;
        expect(gatewayAccount.fields.organizationId).to.be.equal(sharedData.organizationId);
        expect(gatewayAccount.fields.id).to.be.equal(id);
    });

    it('I can get a gateway account using its ID', async () => {
        const gatewayAccount = await apiInstance.gatewayAccounts.get({id: testIds.with});
        expect(gatewayAccount.fields.organizationId).to.be.equal(sharedData.organizationId);
        expect(gatewayAccount.fields.id).to.be.equal(testIds.with);
        expect(gatewayAccount.response.status).to.be.equal(200);
    });

    it('I can partially update a gateway account using its ID', async () => {
        const data = {paymentCardSchemes: ['Visa', 'MasterCard']};
        const gatewayAccount = await apiInstance.gatewayAccounts.update({id: testIds.with, data});
        expect(gatewayAccount.fields.organizationId).to.be.equal(sharedData.organizationId);
        expect(gatewayAccount.fields.paymentCardSchemes).to.be.deep.equal(data.paymentCardSchemes);
        expect(gatewayAccount.response.status).to.be.equal(200);
    });

    it('I can delete the gateway accounts I just created', async () => {
        const firstDelete = await apiInstance.gatewayAccounts.delete({id: testIds.with});
        const secondDelete = await apiInstance.gatewayAccounts.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
