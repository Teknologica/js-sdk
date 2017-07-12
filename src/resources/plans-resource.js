export default function PlansResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`plans`);
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
