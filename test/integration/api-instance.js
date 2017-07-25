import RebillyAPI from '../../src';
import dotenv from 'dotenv';
//load env variables
dotenv.config();

const apiInstance = new RebillyAPI({apiKey: process.env.API_INTEGRATION_KEY, sandbox: true});
apiInstance.setEndpoints({sandbox: process.env.API_INTEGRATION_URL});
apiInstance.setTimeout(10000);

export default apiInstance;
