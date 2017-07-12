export default function SubscriptionsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`subscriptions`);
        },

        async get({id}) {
            return await apiHandler.get(`subscriptions/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`subscriptions/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`subscriptions/${id}`, data);
        },

        async cancel({id, data}) {
            return await apiHandler.post(`subscriptions/${id}/cancel`, data);
        },

        async switch({id, data}) {
            return await apiHandler.post(`subscriptions/${id}/switch`, data);
        },

        async getLeadSource({id}) {
            return await apiHandler.get(`subscriptions/${id}/lead-source`);
        },

        async createLeadSource({id, data}) {
            return await apiHandler.put(`subscriptions/${id}/lead-source`, data);
        },

        async deleteLeadSource({id}) {
            return await apiHandler.delete(`subscriptions/${id}/lead-source`);
        }
    };
};
