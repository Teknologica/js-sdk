export default function ListsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`lists`);
        },

        async get({id, version = ''}) {
            return await apiHandler.get(`lists/${id}/${version}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`lists/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`lists/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`lists/${id}`);
        }
    };
};
