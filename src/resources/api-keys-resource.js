export default function ApiKeysResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`api-keys`);
        },

        async get({id}) {
            return await apiHandler.get(`api-keys/${id}`);
        },

        async create({data}) {
            return await apiHandler.create(`api-keys`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`api-keys/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`api-keys/${id}`);
        }
    };
};
