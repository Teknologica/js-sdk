export default function CustomEventsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`custom-events`);
        },

        async get({id}) {
            return await apiHandler.get(`custom-events/${id}`);
        },

        async create({id, data}) {
            return await apiHandler.create(`custom-events/${id}`, data);
        },

        async delete({id}) {
            return await apiHandler.delete(`custom-events/${id}`);
        },

        async getAllRules({id}) {
            return await apiHandler.getAll(`custom-events/${id}/rules`);
        },

        async createRules({id, data}) {
            return await apiHandler.put(`custom-events/${id}/rules`, data);
        },

        async updateRules({id, data}) {
            return await apiHandler.put(`custom-events/${id}/rules`, data);
        },

        async getRulesHistory({id}) {
            return await apiHandler.getAll(`custom-events/${id}/rules/history`);
        },

        async getRulesVersionNumber({id, version}) {
            return await apiHandler.get(`custom-events/${id}/rules/history/${version}`);
        },

        async getRulesVersionDetail({id, version}) {
            return await apiHandler.get(`custom-events/${id}/rules/versions/${version}`);
        },

        async getAllScheduled() {
            return await apiHandler.getAll(`queue/custom-events`);
        },

        async getScheduled({id}) {
            return await apiHandler.get(`queue/custom-events/${id}`);
        },

        async deleteScheduled({id}) {
            return await apiHandler.delete(`queue/custom-events/${id}`);
        },
    };
};
