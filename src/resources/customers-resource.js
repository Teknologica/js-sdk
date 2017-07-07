export default function CustomersResource({apiHandler}) {
    const customers = apiHandler.for('customers');
    const leadSources = apiHandler.for('customers/{id}/lead-source');

    function get({id = null}) {
        return customers.get({id});
    }

    function getAll() {
        return customers.get();
    }

    function create({id = null} = {}) {
        return customers.create({id, checkExisting: true});
    }

    function update({id = null}) {
        return customers.put({id});
    }

    function getLeadSource({id = null}) {
        return leadSources.get({id});
    }

    function createLeadSource() {
        return leadSources.put({id});
    }

    function deleteLeadSource() {
        return leadSources.delete({id});
    }

    return {
        get,
        getAll,
        create,
        update,
        getLeadSource,
        createLeadSource,
        deleteLeadSource
    };
};
