/**
 * Creates a parameter interpolator callback for a specific resource path
 * @param resourcePath string resource path that contains slugs to be replaced by parameters
 * @returns {Function}
 */
export default function createPathInterpolator(resourcePath) {
    const identifySlugsExpression = /({\w+?})/g;
    const cleanupBracesExpression = /[{}]/g;
    //remove trailing forward slash
    resourcePath = resourcePath.endsWith('/') ? resourcePath.substring(0, resourcePath.length - 1) : resourcePath;

    //if we detect slugs in the URL we prepare an interpolation callback to automatically replace them
    //in the url with the provided parameters
    const slugs = resourcePath.match(identifySlugsExpression);
    if (slugs !== null) {
        let map = [];
        //map slugs on instantiation only as a [keyword, param] pair, e.g. [{id}, id]
        slugs.forEach(slug => map.push([slug, slug.replace(cleanupBracesExpression, '')]));
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

    //if there are no slugs expect the URL to remain as-is
    return () => resourcePath;
}
