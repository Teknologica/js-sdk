export default function ProductsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`products`);
        },

        async get({id}) {
            return await apiHandler.get(`products/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`products/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`products/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`products/${id}`);
        }
    };
};
