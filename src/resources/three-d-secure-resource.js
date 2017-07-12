export default function ThreeDSecureResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`3dsecure`);
        },

        async get({id}) {
            return await apiHandler.get(`3dsecure/${id}`);
        },

        async create({data}) {
            return await apiHandler.post(`3dsecure`, data);
        }
    };
};
