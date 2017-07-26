export default function CustomersResource({apiHandler}) {
    return {
        async getAll({customerId = ''} = {}) {
            const params = {
                customerId,
            };
            return await apiHandler.getAll(`customers/{customerId}/summary-metrics`, params);
        }
    };
};
