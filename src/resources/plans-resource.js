export default function PlansResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, filter = '', q = '', criteria = ''} = {}) {
            const params = {
                limit,
                offset,
                sort,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`plans`, params);
        },

        async get({id}) {
            return await apiHandler.get(`plans/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`plans/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`plans/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`plans/${id}`);
        }
    };
};
