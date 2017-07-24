import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomFieldData, createCustomerData, createCustomFieldEntryData} from '../utils';

const expect = chai.expect;

describe('when using the custom fields resource', () => {
    const resourceName = 'customers';
    let cachedField, inUseField;

    it('I can create a custom field for a resource', async () => {
        const {name, ...data} = createCustomFieldData();
        const customField = await apiInstance.customFields.create({name, resource: resourceName, data});
        cachedField = customField;
        expect(customField.fields.name).to.be.equal(name);
        expect(customField.response.status).to.be.equal(201);
    });

    it('I can update a custom field for a resource by its name', async () => {
        const {description} = createCustomFieldData();
        const data = {...cachedField.fields, description};
        const customField = await apiInstance.customFields.update({
            name: cachedField.fields.name,
            resource: resourceName,
            data
        });
        expect(customField.fields.description).to.be.equal(description);
        expect(customField.response.status).to.be.equal(200);
    });

    it(`I can get a custom field's details for a resource by its name`, async () => {
        const customField = await apiInstance.customFields.get({name: cachedField.fields.name, resource: resourceName});
        expect(customField.fields.name).to.be.equal(cachedField.fields.name);
        expect(customField.response.status).to.be.equal(200);
    });

    it(`I can get a list of custom field details for a resource`, async () => {
        const customFields = await apiInstance.customFields.getAll({resource: resourceName});
        expect(customFields.total).to.not.be.equal(0);
        expect(customFields.response.status).to.be.equal(200);
    });

    it('I can create a customer with my newly created custom field', async () => {
        const {name, ...data} = createCustomFieldData();
        const customField = await apiInstance.customFields.create({name, resource: resourceName, data});
        inUseField = customField;
        const customFieldEntry = createCustomFieldEntryData(customField);
        const customerStub = createCustomerData(false, {
            customFields: customFieldEntry
        });
        const customer = await apiInstance.customers.create({data: customerStub});
        const [customFieldValue] = Object.values(customFieldEntry);
        expect(customer.fields.customFields[customField.fields.name]).to.be.equal(customFieldValue);
    });

    it('I can delete a custom field for a resource by its name', async () => {
        const customField = await apiInstance.customFields.delete({name: cachedField.fields.name, resource: resourceName});
        expect(customField.response.status).to.be.equal(204);
    });

    it('I cannot delete a custom field already in use by a resource', async () => {
        try {
            const customField = await apiInstance.customFields.delete({
                name: inUseField.fields.name,
                resource: resourceName
            });
        } catch (err) {
            expect(err.name).to.be.equal('RebillyInvalidOperationError');
            expect(err.status).to.be.equal(409);
        }
    });
});
