export default function GatewayAccountsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`gateway-accounts`);
        },

        async get({id}) {
            return await apiHandler.get(`gateway-accounts/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`gateway-accounts/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.patch(`gateway-accounts/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`gateway-accounts/${id}`);
        }
    };
};
