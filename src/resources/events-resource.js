export default function EventsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`events`);
        },

        async get({eventType}) {
            return await apiHandler.get(`events/${eventType}`);
        },

        async getAllRules({eventType}) {
            return await apiHandler.getAll(`events/${eventType}/rules`);
        },

        async createRules({eventType, data}) {
            return await apiHandler.put(`events/${eventType}/rules`, data);
        },

        async updateRules({eventType, data}) {
            return await apiHandler.put(`events/${eventType}/rules`, data);
        },

        async getRulesHistory({eventType}) {
            return await apiHandler.getAll(`events/${eventType}/rules/history`);
        },

        async getRulesVersionNumber({eventType, version}) {
            return await apiHandler.get(`events/${eventType}/rules/history/${version}`);
        },

        async getRulesVersionDetail({eventType, version}) {
            return await apiHandler.get(`events/${eventType}/rules/versions/${version}`);
        }
    };
};
