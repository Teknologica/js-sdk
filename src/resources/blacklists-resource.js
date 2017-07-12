export default function BlacklistsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`blacklists`);
        },

        async get({id}) {
            return await apiHandler.get(`blacklists/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`blacklists/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`blacklists/${id}`);
        }
    };
};
