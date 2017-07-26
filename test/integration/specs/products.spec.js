import chai from 'chai';
import apiInstance from '../api-instance';
import {createProductData} from '../utils.js';

const expect = chai.expect;

describe('when using the products resource', () => {

    let testIds = {with: null, without: null};
    let sharedProductId;

    it('I can create a product with ID', async() => {
        const {id:id, ...data} = createProductData(true);
        const product = await apiInstance.products.create({id:id, data:data});
        testIds.with = id;
        expect(product.response.status).to.be.equal(201);
    });


    it('I can create a product without ID', async() => {
        const {id:id, ...data} = createProductData(false);
        const product = await apiInstance.products.create({id:id, data:data});
        testIds.without = product.fields.id;
        expect(product.response.status).to.be.equal(201);
    });


    it('I can get a list of products ', async() => {
        const products = await apiInstance.products.getAll();
        expect(products.response.status).to.be.equal(200);
        expect(products.total).to.not.be.equal(0);
        const [productsItem] = products.items;
        expect(productsItem.fields.id).to.not.be.undefined;
        sharedProductId = productsItem.fields.id;
    });


    it('I can update a product with its ID', async () => {
        const {id:id, ...data} = createProductData(false);
        const product = await apiInstance.products.update({id: sharedProductId, data:data});
        expect(product.response.status).to.be.equal(200);
    });

    it('I can delete products that I created', async() => {
        const firstDelete = await apiInstance.products.delete({id: testIds.with});
        const secondDelete = await apiInstance.products.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});
