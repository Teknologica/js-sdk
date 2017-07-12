/**
 * Adds a function to the class that allow it to be exported as JSON based on the type
 * @param type {string}
 * @returns {function(*)}
 * @constructor
 */
function JSONExport(type) {
    return (target) => {
        target.getJSON = () => {
            console.log(`return JSON for ${type}`);
        }
    }
}

export {JSONExport};
