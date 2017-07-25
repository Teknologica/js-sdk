import chai from 'chai';
import apiInstance from '../api-instance';
import {createShippingZoneData} from '../utils.js';

const expect = chai.expect;

describe('when using the shipping zones resource', () => {

    let sharedShippingZonesId;

    it('I can create a shipping zone with ID', async() => {
        const {id: id, ...data} = createShippingZoneData(true);
        const shippingZone = await apiInstance.shippingZones.create({id: id, data: data});
        expect(shippingZone.response.status).to.be.equal(201);
    });



    it('I can get a list of shipping zones', async() => {
        const shippingZones = await apiInstance.shippingZones.getAll();
        expect(shippingZones.response.status).to.be.equal(200);
        expect(shippingZones.total).to.not.be.equal(0);
        const [shippingZonesItem] = shippingZones.items;
        expect(shippingZonesItem.fields.id).to.not.be.undefined;
        sharedShippingZonesId = shippingZonesItem.fields.id;
    });


    it('I can get a shipping zone by its ID', async () => {
        const shippingZone = await apiInstance.shippingZones.get({id: sharedShippingZonesId});
        expect(shippingZone.fields.id).to.be.equal(sharedShippingZonesId);
        expect(shippingZone.response.status).to.be.equal(200);

    });


    it('I can update a shipping zone by its ID', async() => {
        const data = createShippingZoneData(false);
        const shippingZone = await apiInstance.shippingZones.update({id: sharedShippingZonesId, data: data});
        expect(shippingZone.response.status).to.be.equal(200);

    });


    it('I can delete a shipping zone by its ID', async() => {
        const shippingZone = await apiInstance.shippingZones.delete({id: sharedShippingZonesId});
        expect(shippingZone.response.status).to.be.equal(204);
    });


    it('I can create a shipping zone without ID', async() => {
        const data = createShippingZoneData(false);
        const shippingZone = await apiInstance.shippingZones.create({data: data});
        expect(shippingZone.response.status).to.be.equal(201);
        sharedShippingZonesId = shippingZone.fields.id;
    });


    it('I can delete a shipping zone by its ID', async() => {
        const shippingZone = await apiInstance.shippingZones.delete({id: sharedShippingZonesId});
        expect(shippingZone.response.status).to.be.equal(204);
    });

});
