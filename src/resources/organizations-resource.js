export default function OrganizationsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`organizations`);
        },

        async get({id}) {
            return await apiHandler.get(`organizations/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`organizations/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`organizations/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`organizations/${id}`);
        }
    };
};
