export default function PaymentCardsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`payment-cards`);
        },

        async get({id}) {
            return await apiHandler.get(`payment-cards/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`payment-cards/${id}`, data);
        },

        async authorize({id, data}) {
            return await apiHandler.post(`payment-cards/${id}/authorization`, data);
        },

        async deactivate({id}) {
            return await apiHandler.post(`payment-cards/${id}/deactivation`);
        },

        async getAllMigratable() {
            return await apiHandler.getAll(`payment-cards-migrations`);
        },

        async migrate({data}) {
            return await apiHandler.post(`payment-cards-migrations/migrate`, data);
        }
    };
};
