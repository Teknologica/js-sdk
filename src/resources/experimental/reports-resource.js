export default function ReportsResource({apiHandler}) {
    return {
        async getAll({periodStart = '', periodEnd = '', limit = null, offset = null, filter = '', criteria = ''} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/cumulative-subscriptions-plans`, params);
        }
    };
};
