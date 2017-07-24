import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomFieldData} from '../utils';

const expect = chai.expect;

describe('when using the custom fields resource', () => {
    const resourceName = 'customers';
    let cachedField;

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

    it('I can delete a custom field for a resource by its name', async () => {
        const customField = await apiInstance.customFields.delete({name: cachedField.fields.name, resource: resourceName});
        expect(customField.response.status).to.be.equal(204);
    });

});
