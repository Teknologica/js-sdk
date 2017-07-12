export default function BankAccountsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`bank-accounts`);
        },

        async get({id}) {
            return await apiHandler.get(`bank-accounts/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`bank-accounts/${id}`, data);
        },

        async deactivate({id}) {
            return await apiHandler.post(`bank-accounts/${id}/deactivation`);
        }
    };
};
