/**
 * Adds a function to the class that allow it to be exported as JSON based on the type
 * @param type {string}
 * @returns {function(*)}
 * @constructor
 */
function JSONExport(type) {
    /**
     * Get a mutable JSON object representation of the Collection or Member data.
     * @param target {Collection|Member}
     */
    return (target) => {
        target.getJSON = () => {
            const clone = (data) => JSON.parse(JSON.stringify(data));
            if (type === 'Collection') {
                return clone(target.items);
            }
            return clone(target.fields);
        }
    }
}

export {JSONExport};
