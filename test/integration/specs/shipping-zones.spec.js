import chai from 'chai';
import apiInstance from '../api-instance';
import {createShippingZoneData} from '../utils.js';

const expect = chai.expect;

describe('when using the shipping zones resource', () => {
    const testIds = {with: null, without: null};
    let cachedShippingZone;

    it('I can create a shipping zone without ID (only US)', async() => {
        const data = createShippingZoneData(false, {countries: ['US']});
        const shippingZone = await apiInstance.shippingZones.create({data});
        testIds.without = shippingZone.fields.id;
        expect(shippingZone.response.status).to.be.equal(201);
    });

    it('I can create a shipping zone with ID (default zone)', async() => {
        const {id, ...data} = createShippingZoneData(true, {countries: []});
        cachedShippingZone = await apiInstance.shippingZones.create({id, data});
        testIds.with = id;
        expect(cachedShippingZone.response.status).to.be.equal(201);
    });

    it('I can get a list of shipping zones', async() => {
        const shippingZones = await apiInstance.shippingZones.getAll();
        expect(shippingZones.response.status).to.be.equal(200);
        expect(shippingZones.total).to.not.be.equal(0);
        const [shippingZonesItem] = shippingZones.items;
        expect(shippingZonesItem.fields.id).to.not.be.undefined;
    });

    it('I can get a shipping zone by its ID', async () => {
        const shippingZone = await apiInstance.shippingZones.get({id: testIds.with});
        expect(shippingZone.fields.id).to.be.equal(testIds.with);
        expect(shippingZone.response.status).to.be.equal(200);
    });

    it('I can update a shipping zone by its ID', async() => {
        const data = createShippingZoneData(false);
        const shippingZone = await apiInstance.shippingZones.update({id: testIds.with, data});
        expect(shippingZone.response.status).to.be.equal(200);

    });

    it('I can delete the shipping zones I just created', async() => {
        const firstDelete = await apiInstance.shippingZones.delete({id: testIds.with});
        const secondDelete = await apiInstance.shippingZones.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
