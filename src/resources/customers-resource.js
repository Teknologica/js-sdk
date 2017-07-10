export default class CustomersResource {
    constructor({apiHandler}) {
        this.customersHandler = apiHandler.for('customers/{id}');
        this.leadSourcesHandler = apiHandler.for('customers/{id}/lead-source');
    }

    async get({id}) {
        return await this.customersHandler.get({id});
    }

    async getAll() {
        return await this.customersHandler.get();
    }

    async create({id = null, data}) {
        return await this.customersHandler.create({id, data, checkExisting: true});
    }

    async update({id, data}) {
        return await this.customersHandler.put({id, data});
    }

    async getLeadSource({id}) {
        return await this.leadSourcesHandler.get({id});
    }

    async createLeadSource({id, data}) {
        return await this.leadSourcesHandler.put({id, data});
    }

    async deleteLeadSource({id}) {
        return await this.leadSourcesHandler.delete({id});
    }
};
