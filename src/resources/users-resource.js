export default function UsersResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, filter = '', q = ''} = {}) {
            const params = {
                limit,
                offset,
                sort,
                filter,
                q
            };
            return await apiHandler.getAll(`users`, params);
        },

        async get({id}) {
            return await apiHandler.get(`users/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`users/${id}`, id, data);
        },

        async update({id = '', data}) {
            return await apiHandler.put(`users/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`users/${id}`);
        },

        async updatePassword({id, data}) {
            return await apiHandler.post(`users/${id}/password`, data);
        },

        async resetPassword({token, data}) {
            return await apiHandler.post(`users/reset-password/${token}`, data);
        },

        async resetTotpSecret({id, data}) {
            return await apiHandler.post(`users/${id}/totp-reset`, data);
        }
    };
};
