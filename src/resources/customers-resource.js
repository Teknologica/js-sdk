export default function CustomersResource({apiHandler}) {
    const customers = apiHandler.for('customers');
    const leadSources = apiHandler.for('customers/{id}/lead-source');

    async function get({id = null}) {
        return await customers.get({id});
    }

    async function getAll() {
        return await customers.get();
    }

    async function create({id = null} = {}) {
        return await customers.create({id, checkExisting: true});
    }

    async function update({id = null}) {
        return await customers.put({id});
    }

    async function getLeadSource({id = null}) {
        return await leadSources.get({id});
    }

    async function createLeadSource({id = null}) {
        return await leadSources.put({id});
    }

    async function deleteLeadSource({id = null}) {
        return await leadSources.delete({id});
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
