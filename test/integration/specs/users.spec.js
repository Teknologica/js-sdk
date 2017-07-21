import chai from 'chai';
import apiInstance from '../api-instance';
import {createUserData} from '../utils';

const expect = chai.expect;

// Can't update user password and reset user password,
// because current user password and user token can't
// be retrieved in testing env.

describe('when using the users resource', () => {
    const testIds = {with: null, without: null};

    it('I can create a user without an ID', async () => {
        const data = createUserData();
        const user = await apiInstance.users.create({data: data});
        testIds.without = user.fields.id;
        expect(user.fields.value).to.be.equal(data.value);
    });

    it('I can create a user with an ID', async () => {
        const {id, ...data} = createUserData(true);
        const user = await apiInstance.users.create({id, data});
        expect(user.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(user.fields.value).to.be.equal(data.value);
    });

    it('I can get a list of users', async () => {
        const user = await apiInstance.users.getAll();
        expect(user.total).to.not.be.equal(0);
        const [userItems] = user.items;
        expect(userItems.fields.id).to.not.be.undefined;
    });

    it('I can get a user by using its ID', async () => {
        const user = await apiInstance.users.get({id: testIds.with});
        expect(user.fields.id).to.be.equal(testIds.with);
    });

    it('I can update a user by using its ID', async () => {
        const data = createUserData();
        const user = await apiInstance.users.update({id: testIds.with, data: data});
        expect(user.fields.value).to.be.equal(data.value);
        expect(user.response.status).to.be.equal(200);
    });

    it('I can delete the user I just created', async () => {
        const firstDelete = await apiInstance.users.delete({id: testIds.with});
        const secondDelete = await apiInstance.users.delete({id: testIds.without});
        expect(firstDelete.response.status).to.be.equal(204);
        expect(secondDelete.response.status).to.be.equal(204);
    });
});


