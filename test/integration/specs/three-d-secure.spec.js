import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomerData,
        create3DSecureData,
        createWebsiteData,
        createPaymentCard,
        createGatewayAccountData} from '../utils.js';

const expect = chai.expect;

describe('when using the three-d-secure resource', () => {

    let sharedData = {};
    let sharedThreeDSecureId;

    before(async() => {
        const {id : customerId, ...customerData} = createCustomerData(true);
        const {id : websiteId, ...websiteData} = createWebsiteData(true);
        const customer = await apiInstance.customers.create({id : customerId, data: customerData});
        const website = await apiInstance.websites.create({id : websiteId, data: websiteData});
        const {id : paymentCardId, ...paymentCardData} = createPaymentCard(true, {customerId: customer.fields.id, billingAddress: customer.fields.primaryAddress});
        const paymentCard = await apiInstance.paymentCards.create({id: paymentCardId, data: paymentCardData});
        const organizations = await apiInstance.organizations.getAll();
        const [organization] = organizations.items;
        const gatewayAccountData = createGatewayAccountData(false, {
            websites: [website.fields.id],
            organizationId: organization.fields.id,
            threeDSecure: true,
            gatewayName: 'Payvision',
            mpi: {name: 'PayvisionMpi'},
            gatewayConfig: {
                memberId: '',
                memberGuid: '',
                avs: '',
                delay: ''
            }
        });

        const gatewayAccount = await apiInstance.gatewayAccounts.create({data: gatewayAccountData});

        sharedData.customerId = customer.fields.id;
        sharedData.websiteId = website.fields.id;
        sharedData.paymentCardId = paymentCard.fields.id;
        sharedData.gatewayAccountId = gatewayAccount.fields.id;

    });

    it('I can create a three-d-secure', async () => {
        const data = create3DSecureData(sharedData);
        const threeDSecure = await apiInstance.threeDSecure.create({data: data});
        expect(threeDSecure.response.status).to.be.equal(201);
        sharedThreeDSecureId = threeDSecure.fields.id;
    });

    it('I can get a list of three-d-secure', async () => {
        const threeDSecures = await apiInstance.threeDSecure.getAll();
        expect(threeDSecures.response.status).to.be.equal(200);
        expect(threeDSecures.total).to.not.be.equal(0);
        const [threeDSecuresItem] = threeDSecures.items;
        expect(threeDSecuresItem.fields.id).to.not.be.undefined;
    });


    it('I can get a three-d-secure log by its ID', async () => {
        const threeDSecure = await apiInstance.threeDSecure.get({id: sharedThreeDSecureId});
        expect(threeDSecure.response.status).to.be.equal(200);
    });
});
