export default function TransactionsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`transactions`);
        },

        async get({id}) {
            return await apiHandler.get(`transactions/${id}`);
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

        async deleteLeadSource({id}) {
            return await apiHandler.delete(`transactions/${id}/lead-source`);
        }
    };
};
