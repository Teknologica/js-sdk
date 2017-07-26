export default function ReportsResource({apiHandler}) {
    return {
        async getCumulativeSubscriptionsPlans({periodStart, periodEnd, limit = null, offset = null, filter = null, criteria = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/cumulative-subscriptions-plans`, params);
        },

        async getCumulativeSubscriptions({aggregationField, periodStart, periodEnd, limit = null, offset = null, filter = null, criteria = null} = {}) {
            const params = {
                aggregationField,
                periodStart,
                periodEnd,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/cumulative-subscriptions`, params);
        },

        async getDccMarkup({aggregationField, periodStart, periodEnd, limit = null, offset = null, filter = null} = {}) {
            const params = {
                aggregationField,
                periodStart,
                periodEnd,
                limit,
                offset,
                filter
            };
            return await apiHandler.getAll(`reports/dcc-markup`, params);
        },

        async getDisputes({aggregationField, periodMonth, limit = null, offset = null, filter = null} = {}) {
            const params = {
                aggregationField,
                periodMonth,
                limit,
                offset,
                filter
            };
            return await apiHandler.getAll(`reports/disputes`, params);
        },

        async getEventsTriggeredSummary({periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/events-triggered`, params);
        },

        async getRulesMatchedSummary({eventType, periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/events-triggered/${eventType}/rules`, params);
        },

        async getFutureRenewals({periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/future-renewals`, params);
        },

        async getRenewalSales({periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/renewal-sales`, params);
        },

        async getRetentionPercentage({aggregationField, aggregationPeriod, periodStart, periodEnd, includeSwitchedSubscriptions = null, limit = null, offset = null, filter = null} = {}) {
            const params = {
                aggregationField,
                aggregationPeriod,
                periodStart,
                periodEnd,
                includeSwitchedSubscriptions,
                limit,
                offset,
                filter
            };
            return await apiHandler.getAll(`reports/retention-percentage`, params);
        },

        async getRetentionValue({aggregationField, aggregationPeriod, periodStart, periodEnd, includeRefunds = null, includeDisputes = null, limit = null, offset = null, filter = null, criteria = null} = {}) {
            const params = {
                aggregationField,
                aggregationPeriod,
                periodStart,
                periodEnd,
                includeRefunds,
                includeDisputes,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/retention-value`, params);
        },

        async getRetryTransaction({periodStart, periodEnd, filter = null, criteria = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/retry-transaction`, params);
        },

        async getStatistics() {
            return await apiHandler.getAll(`reports/statistics`);
        },

        async getSubscriptionCancellation({aggregationField, periodStart, periodEnd, limit = null, offset = null, filter = null, criteria = null} = {}) {
            const params = {
                aggregationField,
                periodStart,
                periodEnd,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/subscription-cancellation`, params);
        },

        async getSubscriptionRenewalList({periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/subscription-renewal-list`, params);
        },

        async getSubscriptionRenewal({periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/subscription-renewal`, params);
        },

        async getTimeSeriesTransaction({periodStart, periodEnd, type, subaggregate} = {}) {
            const params = {
                periodStart,
                periodEnd,
                type,
                subaggregate
            };
            return await apiHandler.getAll(`reports/time-series-transactions`, params);
        },

        async getTransactionsPlan({periodStart, periodEnd, limit = null, offset = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset
            };
            return await apiHandler.getAll(`reports/transactions-plan`, params);
        },

        async getTransactionsTimeDispute({aggregationField, periodStart, periodEnd, limit = null, offset = null, filter = null, criteria = null} = {}) {
            const params = {
                aggregationField,
                periodStart,
                periodEnd,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/transactions-time-dispute`, params);
        },

        async getTransactions({aggregationField, periodStart, periodEnd, limit = null, offset = null, filter = null, criteria = null} = {}) {
            const params = {
                aggregationField,
                periodStart,
                periodEnd,
                limit,
                offset,
                filter,
                criteria
            };
            return await apiHandler.getAll(`reports/transactions`, params);
        },

        async getPaymentsSuccessByDeclineReason({periodStart, periodEnd, limit = null, offset = null, filter = null} = {}) {
            const params = {
                periodStart,
                periodEnd,
                limit,
                offset,
                filter
            };
            return await apiHandler.getAll(`reports/payments-success-by-decline-reason`, params);
        }
    };
};
