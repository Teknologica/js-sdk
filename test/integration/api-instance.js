import RebillyAPI, {RebillyExperimentalAPI} from '../../src';
import dotenv from 'dotenv';
//load env variables
dotenv.config();

const apiInstance = new RebillyAPI({apiKey: process.env.API_INTEGRATION_KEY});
apiInstance.setEndpoints({live: process.env.API_INTEGRATION_URL});
apiInstance.setTimeout(10000);

const experimentalApiInstance = new RebillyExperimentalAPI({apiKey: process.env.API_INTEGRATION_KEY});
experimentalApiInstance.setEndpoints({live: process.env.API_INTEGRATION_URL});
experimentalApiInstance.setTimeout(10000);

export default apiInstance;
export {experimentalApiInstance};
