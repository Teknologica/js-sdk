export default function CheckoutPagesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`checkout-pages`);
        },

        async get({id}) {
            return await apiHandler.get(`checkout-pages/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`checkout-pages/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`checkout-pages/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`checkout-pages/${id}`);
        }
    };
};
