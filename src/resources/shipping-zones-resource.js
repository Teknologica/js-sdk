export default function ShippingZonesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`shipping-zones`);
        },

        async get({id}) {
            return await apiHandler.get(`shipping-zones/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`shipping-zones/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`shipping-zones/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`shipping-zones/${id}`);
        }
    };
};
