import chai from 'chai';
import apiInstance from '../api-instance';
import {createUserData} from '../utils';

const expect = chai.expect;

describe('when using the users resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a user without an ID', async () => {
        const data = createUserData();
        const user = await apiInstance.users.create({data});
        testIds.without = user.fields.id;
        expect(user.fields.value).to.be.equal(data.value);
        expect(user.response.status).to.be.equal(201);
    });

    it('I can create a user with an ID', async () => {
        const {id, ...data} = createUserData(true);
        const user = await apiInstance.users.create({id, data});
        expect(user.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(user.fields.value).to.be.equal(data.value);
        expect(user.response.status).to.be.equal(201);
    });

    it('I can get a list of users', async () => {
        const user = await apiInstance.users.getAll();
        expect(user.total).to.not.be.equal(0);
        const [userItems] = user.items;
        expect(userItems.fields.id).to.not.be.undefined;
        expect(user.response.status).to.be.equal(200);
    });

    it('I can get a user by using its ID', async () => {
        const user = await apiInstance.users.get({id: testIds.with});
        expect(user.fields.id).to.be.equal(testIds.with);
        expect(user.response.status).to.be.equal(200);
    });

    it('I can update a user by using its ID', async () => {
        const data = createUserData();
        const user = await apiInstance.users.update({id: testIds.with, data});
        expect(user.fields.value).to.be.equal(data.value);
        expect(user.response.status).to.be.equal(200);
    });

    /**
     *  user current password can't be retrieved
     */
    it.skip('I can update a user password by its ID', async() => {

    });

    /**
     *  user current password can't be retrieved
     */
    it.skip('I can reset a user password by its ID', async() => {

    });

    it('I can delete the users I just created', async () => {
        const firstDelete = await apiInstance.users.delete({id: testIds.with});
        const secondDelete = await apiInstance.users.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});


