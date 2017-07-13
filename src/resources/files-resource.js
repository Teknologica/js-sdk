export default function FilesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`files`);
        },

        async get({id}) {
            return await apiHandler.get(`files/${id}`);
        },

        async upload({fileObject, fileDefinition = {description: '', tags: ''}}) {
            const file = await apiHandler.post(`files`, fileObject);
            const params = {
                name: fileObject.name,
                extension: file.extension,
                description: fileDefinition.description,
                tags: fileDefinition.tags,
                url: ''
            };
            return await this.update({id: file.id, data: params});
        },

        async update({id, data}) {
            return await apiHandler.put(`files/${id}`, data);
        },

        async delete({id}) {

            return await apiHandler.delete(`files/${id}`);
        }
    };
};
