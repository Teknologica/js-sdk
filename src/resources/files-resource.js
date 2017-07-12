export default function FilesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`files`);
        },

        async get({id}) {
            return await apiHandler.get(`files/${id}`);
        },

        async upload({data}) {
            return await apiHandler.post(`files`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`files/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`files/${id}`);
        }
    };
};
