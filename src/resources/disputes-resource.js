export default function DisputesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`disputes`);
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
