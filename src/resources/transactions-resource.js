export default function TransactionsResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, expand = null, filter = null, q = null, criteria = null} = {}) {
            const params = {
                limit,
                offset,
                sort,
                expand,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`transactions`, params);
        },

        async getAllScheduled({limit = null, offset = null, sort = null, expand = null, filter = null, q = null, criteria = null} = {}) {
            const params = {
                limit,
                offset,
                sort,
                expand,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`queue/payments`, params);
        },

        async get({id}) {
            return await apiHandler.get(`transactions/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`payments/${id}`, id, data);
        },

        async cancel({id}) {
            return await apiHandler.post(`transactions/${id}/cancel`);
        },

        async refund({id, data}) {
            return await apiHandler.post(`transactions/${id}/refund`, data);
        },

        async getGatewayLogs({id}) {
            return await apiHandler.get(`transactions/${id}/gateway-logs`);
        },

        async getLeadSource({id}) {
            return await apiHandler.get(`transactions/${id}/lead-source`);
        },

        async createLeadSource({id, data}) {
            return await apiHandler.put(`transactions/${id}/lead-source`, data);
        },

        async updateLeadSource({id, data}) {
            return await apiHandler.put(`transactions/${id}/lead-source`, data);
        },

        async deleteLeadSource({id}) {
            return await apiHandler.delete(`transactions/${id}/lead-source`);
        }
    };
};
