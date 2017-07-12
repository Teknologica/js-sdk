export default function TrackingResource({apiHandler}) {
    return {
        async getAllApiLogs() {
            return await apiHandler.getAll(`tracking/api`);
        },

        async getApiLog({id}) {
            return await apiHandler.get(`tracking/api/${id}`);
        },

        async getAllSubscriptionLogs() {
            return await apiHandler.getAll(`tracking/subscriptions`);
        },

        async getSubscriptionLog({id}) {
            return await apiHandler.get(`tracking/subscriptions/${id}`);
        },

        async getAllWebhookNotificationLogs() {
            return await apiHandler.getAll(`tracking/website-webhooks`);
        },

        async getWebhookNotificationLog({id}) {
            return await apiHandler.get(`tracking/website-webhooks/${id}`);
        },

        async getAllListsChangesHistory() {
            return await apiHandler.getAll(`tracking/lists`);
        }
    };
};
