export default function WebhooksResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`webhooks`);
        },

        async get({id}) {
            return await apiHandler.get(`webhooks/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`webhooks/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`webhooks/${id}`, data);
        },

        async preview({data}) {
            return await apiHandler.post(`previews/webhooks`, data);
        }
    };
};
