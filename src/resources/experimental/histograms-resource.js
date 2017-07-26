export default function HistogramsResource({apiHandler}) {
    return {
        async getAll({periodStart = '', periodEnd = '', aggregationField = '', aggregationPeriod = '', metric = ''} = {}) {
            const params = {
                periodStart,
                periodEnd,
                aggregationField,
                aggregationPeriod,
                metric
            };
            return await apiHandler.getAll(`histograms/transactions`, params);
        }
    };
};
