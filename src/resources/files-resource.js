export default function FilesResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null, sort = null, filter = '', q = ''} = {}) {
            const params = {
                limit,
                offset,
                sort,
                filter,
                q
            };
            return await apiHandler.getAll(`files`, params);
        },

        async get({id}) {
            return await apiHandler.get(`files/${id}`);
        },

        async upload({fileObject, data = {description: '', tags: ''}}) {
            const file = await apiHandler.post(`files`, fileObject);
            const params = {
                name: fileObject.name,
                extension: file.extension,
                description: data.description,
                tags: data.tags,
                url: ''
            };
            return await this.update({id: file.id, data: params});
        },

        async update({id, data}) {
            return await apiHandler.put(`files/${id}`, data);
        },

        async delete({id}) {
            const params = {
                filter: `fileId:${id}`
            };
            const attachments = await apiHandler.getAll(`attachments`, params);
            const promises = attachments.map(attachment => apiHandler.delete(`attachments/${attachment.id}`));
            await Promise.all(promises);
            return await apiHandler.delete(`files/${id}`);
        },

        async download({id}) {
            return await apiHandler.get(`files/${id}/download`);
        },

        async link({data}) {
            return await apiHandler.post(`attachments`, data);
        },

        async unlink({id}) {
            return await apiHandler.delete(`attachments/${id}`)
        }
    };
};
