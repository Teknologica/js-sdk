import createPathInterpolator from './create-path-interpolator';
/**
 *
 * @param axios
 * @param options
 * @returns {ApiHandler}
 * @constructor
 */
export default function ApiHandler({axios, options}) {

    /**
     * Creates an instanced path mediator for a resource path
     * @param resourcePath string
     * @returns {{get: (function(*=): (Promise|V|*)), post: (function(*=, *=)), put: (function(*=, *=)), patch: (function(*=, *=)), delete: (function(*=): boolean), create: (function(*=, *=))}}
     */
    const pathMediator = (resourcePath = null) => {
        const interpolator = createPathInterpolator(resourcePath);

        const get = (params) => axios.get(interpolator(params));

        const post = (params, payload = null) => axios.post(interpolator(params), payload);

        const put = (params, payload = null) => axios.put(interpolator(params), payload);

        const patch = (params, payload = null) => axios.patch(interpolator(params), payload);

        const del = (params) => axios.delete(interpolator(params));

        const create = (params, payload = null) => {
            //missing get/post/put logic
            return axios.get(interpolator(params));
        };

        return {
            get,
            post,
            put,
            patch,
            delete: del,
            create
        };
    };

    this.prototype.for = pathMediator;

    return this;
};
