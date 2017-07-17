export default function DisputesResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, expand = '', filter = '', q = '', criteria = ''} = {}) {
            const params = {
                limit,
                offset,
                sort,
                expand,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`disputes`, params);
        },

        async get({id}) {
            return await apiHandler.get(`disputes/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`disputes/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`disputes/${id}`, data);
        }
    };
};
