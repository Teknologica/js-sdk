export default function GatewayAccountsResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, filter = '', q = '', criteria = ''}) {
            const params = {
                limit,
                offset,
                sort,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`gateway-accounts`, params);
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
