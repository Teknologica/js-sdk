import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createApiHandler from '../../src/create-api-handler';
import mocks from './mocks';


export default function createApiTestHandler({options}) {
    const apiHandler = createApiHandler({options});
    //get the api handler instance
    let instance = apiHandler.getInstance();
    const adapter = new MockAdapter(instance);
    //set up mocks on the current adapter
    Object.keys(mocks).forEach(key => mocks[key]({adapter}));
    //set back instance for the API handler to the mock'ed one
    apiHandler.setInstance(instance);
    return apiHandler;
};
