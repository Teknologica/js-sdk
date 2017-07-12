export default function WebsitesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`websites`);
        },

        async get({id}) {
            return await apiHandler.get(`websites/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`websites/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`websites/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`websites/${id}`);
        }
    };
};
