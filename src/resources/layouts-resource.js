export default function LayoutsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`layouts`);
        },

        async get({id}) {
            return await apiHandler.get(`layouts/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`layouts/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`layouts/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`layouts/${id}`);
        }
    };
};
