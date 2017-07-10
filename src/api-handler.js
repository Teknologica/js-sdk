import createPathInterpolator from './create-path-interpolator';

export default class ApiHandler {
    constructor({axios, options}) {
        this.axios = axios;
        this.options = options;
    }

    /**
     * Create request method delegates for a specific resource path
     * @param resourcePath
     * @returns {{get: (function(*=): (Promise|V|*)), post: (function(*=)), put: (function(*=)), patch: (function(*=)), delete: (function(*=): boolean), create: (function({data: *, checkExisting?: *, params?: *}))}}
     */
    for(resourcePath = null) {
        const interpolator = createPathInterpolator(resourcePath);

        const prepareParameters = (params) => {
            const {data = null, ...attributes} = params;
            if (data) {
                return [interpolator(attributes), data];
            }
            return [interpolator(params)];
        };

        const get = (params) => this.axios.get(...prepareParameters(params));

        const post = (params) => this.axios.post(...prepareParameters(params));

        const put = (params) => this.axios.put(...prepareParameters(params));

        const patch = (params) => this.axios.patch(...prepareParameters(params));

        const del = (params) => this.axios.delete(...prepareParameters(params));

        const create = ({data, checkExisting = false, ...params}) => {
            //missing get/post/put logic
            return this.axios.get(interpolator(params));
        };

        return {
            get,
            post,
            put,
            patch,
            delete: del,
            create
        }
    }
};
