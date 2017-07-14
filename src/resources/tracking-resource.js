export default function TrackingResource({apiHandler}) {
    return {
        async getAllApiLogs({limit = null, offset = null, sort = null, filter = '', q = '', criteria = ''}) {
            const params = {
                limit,
                offset,
                sort,
                filter,
                q,
                criteria
            };
            return await apiHandler.getAll(`tracking/api`, params);
        },

        async getApiLog({id}) {
            return await apiHandler.get(`tracking/api/${id}`);
        },

        async getAllSubscriptionLogs({limit = null, offset = null, sort = null, filter = ''}) {
            const params = {
                limit,
                offset,
                sort,
                filter
            };
            return await apiHandler.getAll(`tracking/subscriptions`, params);
        },

        async getSubscriptionLog({id}) {
            return await apiHandler.get(`tracking/subscriptions/${id}`);
        },

        async getAllWebhookNotificationLogs({limit = null, offset = null, sort = null, filter = ''}) {
            const params = {
                limit,
                offset,
                sort,
                filter
            };
            return await apiHandler.getAll(`tracking/website-webhooks`, params);
        },

        async getWebhookNotificationLog({id}) {
            return await apiHandler.get(`tracking/website-webhooks/${id}`);
        },

        async getAllListsChangesHistory({limit = null, offset = null, sort = null, filter = '', q = ''}) {
            const params = {
                limit,
                offset,
                sort,
                filter,
                q
            };
            return await apiHandler.getAll(`tracking/lists`, params);
        }
    };
};
