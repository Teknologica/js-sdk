export default function CustomersResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, expand = '', filter = '', q = '', criteria = ''} = {}) {
            const params = {
                limit,
                offset,
                sort,
                expand,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`customers`, params);
        },

        async get({id}) {
            return await apiHandler.get(`customers/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`customers/${id}`, id, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`customers/${id}`, data);
        },

        async getLeadSource({id}) {
            return await apiHandler.get(`customers/${id}/lead-source`);
        },

        async createLeadSource({id, data}) {
            return await apiHandler.put(`customers/${id}/lead-source`, data);
        },

        async deleteLeadSource({id}) {
            return await apiHandler.delete(`customers/${id}/lead-source`);
        }
    };
};
