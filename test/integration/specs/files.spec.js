import chai from 'chai';
import apiInstance from '../api-instance';
import {createCustomerData} from '../utils';
const fs = require('fs');
const path = require('path');

const expect = chai.expect;

describe('when using the files resource', () => {
    const filePath = path.join(__dirname, '../../../rb_logo.png');
    const testIds = {with: null, without: null};
    let file = null;
    let customer = null;
    let link = null;

    it('I can upload a file', async () => {
        let readFilePromise = new Promise((resolve, reject) => {
            fs.readFile(filePath, function(error, data) {
                if (error) {
                    console.log('error',error);
                    reject();
                }
                else {
                    resolve(data);
                }
            })
        });
        return readFilePromise.then(async (data) => {
            const params = {description: 'string', tags: ['test']};
            file = await apiInstance.files.upload({fileObject: data, data: params});
            testIds.with = file.fields.id;
            console.log(testIds.with)
            expect(file.response.status).to.be.equal(200);
            expect(file.fields.description).to.be.equal(params.description);
        });
    });

    it('I can get a list of files', async () => {
        const filesList = await apiInstance.files.getAll();
        expect(filesList.total).to.not.be.equal(0);
        const [file] = filesList.items;
        expect(file.fields.id).to.not.be.undefined;
    });

    it('I can get a file by using its ID', async () => {
        const file = await apiInstance.files.get({id: testIds.with});
        expect(file.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a file', async () => {
        const params = {description: 'newString', tags: ['newTag']};
        const file = await apiInstance.files.update({id: testIds.with, data: params});
        expect(file.fields.id).to.be.equal(testIds.with);
        expect(file.fields.description).to.be.equal(params.description);
        expect(file.fields.tags).to.be.deep.equal(params.tags);
    });

    it('I can download a file', async () => {
        const file = await apiInstance.files.download({id: testIds.with});
        expect(file.response.status).to.be.equal(200);
    });

    it('I can link a file to an existing resource', async () => {
        const customerData = createCustomerData();
        customer = await apiInstance.customers.create({data: customerData});
        link = await apiInstance.files.link({data: {fileId: testIds.with, relatedType: 'customer', relatedId: customer.fields.id}});
        expect(link.response.status).to.be.equal(201);
        expect(link.fields.fileId).to.be.equal(testIds.with);
    });

    it('I can unlink a file from an existing resource', async () => {
        const unlink = await apiInstance.files.unlink({id: link.fields.id});
        expect(unlink.response.status).to.be.equal(204);
    });

    it('I can delete a file', async () => {
        const deletedFile = await apiInstance.files.delete({id: testIds.with});
        expect(deletedFile.response.status).to.be.equal(204);
    });
});
