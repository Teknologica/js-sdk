export default function InvoicesResource({apiHandler}) {
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
            return await apiHandler.getAll(`invoices`, params);
        },

        async get({id}) {
            return await apiHandler.get(`invoices/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`invoices/${id}`, id, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`invoices/${id}`, data);
        },

        async issue({id, data = {}}) {
            return await apiHandler.post(`invoices/${id}/issue`, data);
        },

        async abandon({id}) {
            return await apiHandler.post(`invoices/${id}/abandon`, null);
        },

        async void({id}) {
            return await apiHandler.post(`invoices/${id}/void`, null);
        },

        async getAllInvoiceItems({id, limit = null, offset = null}) {
            const params = {
                limit,
                offset
            };
            return await apiHandler.getAll(`invoices/${id}/items`, params);
        },

        async createInvoiceItem({id, data}) {
            return await apiHandler.post(`invoices/${id}/items`, data);
        },

        async getLeadSource({id}) {
            return await apiHandler.get(`invoices/${id}/lead-source`);
        },

        async createLeadSource({id, data}) {
            return await apiHandler.put(`invoices/${id}/lead-source`, data);
        },

        async updateLeadSource({id, data}) {
            return await apiHandler.put(`invoices/${id}/lead-source`, data);
        },

        async deleteLeadSource({id}) {
            return await apiHandler.delete(`invoices/${id}/lead-source`);
        }

        //todo: getPDF
    };
};
