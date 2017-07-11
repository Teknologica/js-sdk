export default function CustomersResource({apiHandler}) {
    return {
        async get({id}) {
            return await apiHandler.get(`customers/${id}`);
        },

        async getAll() {
            return await apiHandler.getAll(`customers`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`customers/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`customers/${id}`, data);
        },

        async getLeadSource({id}) {
            return await apiHandler.get(`customers/${id}/lead-source`);
        },

        async createLeadSource({id = '', data}) {
            return await apiHandler.put(`customers/${id}/lead-source`, data);
        },

        async deleteLeadSource({id}) {
            return await apiHandler.delete(`customers/${id}/lead-source`);
        }
    };
};
