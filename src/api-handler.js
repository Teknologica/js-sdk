export default function ApiHandler({axios, options}) {
    this.axios = axios;
    this.options = options;

    /**
     * Creates a parameter interpolator for a specific resource path
     * @param resourcePath string
     * @returns {Function}
     */
    function createInterpolator(resourcePath) {
        const slugPattern = /({\w+?})/g;
        const findSlugPattern = /[{}]/g;
        //remove trailing forward slash
        resourcePath = resourcePath.endsWith('/') ? resourcePath.substring(0, resourcePath.length - 1) : resourcePath;
        const slugs = resourcePath.match(slugPattern);
        //if we detect slugs in the URL we prepare an interpolation callback to automatically replace them
        //in the url with the provided parameters
        if (slugs !== null) {
            let map = [];
            //map slugs at runtime only
            slugs.forEach(slug => map.push([slug, slug.replace(findSlugPattern, '')]));
            return (params) => {
                let parsedPath = resourcePath;
                map.forEach(slug => {
                    const [keyword, param] = slug;
                    const value = params[param];
                    if (value === undefined) {
                        throw new Error(`Undefined parameter '${keyword}' for target path ${resourcePath}`);
                    }
                    parsedPath = parsedPath.replace(keyword, value);
                });
                return parsedPath;
            };
        }
        //expects only one key and concatenates it to the base path,
        //e.g. get({id: 'acme0001') -> /resource/acme0001
        return (params) => {
            const [identifier] = Object.keys(params);
            return `${resourcePath}/${identifier}`;
        };
    }

    this.prototype.for = (path = null) => {
        const interpolate = createInterpolator(path);

        const get = (params) => this.axios.get(interpolate(params));

        const post = () => {
        };

        const put = () => {
        };

        const patch = () => {
        };

        const del = () => {
        };

        const create = () => {
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

    return this;
};
