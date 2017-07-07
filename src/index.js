import axios from 'axios';
import libraryVersion from '../version';
import ApiHandler from './api-handler';
import createApiInstance from './create-api-instance';

const baseApiVersion = '2.1';
const baseTimeoutMs = 1000;

/**
 * Create an instance of RebillyAPI
 * @param apiKey string
 * @param version string
 * @param sandbox boolean
 * @param timeout number
 * @constructor
 */
export default function RebillyAPI({apiKey = null, version = baseApiVersion, sandbox = false, timeout = baseTimeoutMs} = {}) {
    /**
     * Internal configuration options
     * @type {{version: string, apiKey: string, apiVersion: string, isSandbox: boolean, requestTimeout: number, jwt: string|null}}
     */
    const options = {
        version: libraryVersion,
        apiKey: apiKey,
        apiVersion: version,
        isSandbox: sandbox,
        requestTimeout: timeout,
        jwt: null
    };

    const apiHandler = new ApiHandler({axios, options});
    return createApiInstance({apiHandler});
}
