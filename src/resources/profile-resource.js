export default function ProfileResource({apiHandler}) {
    return {
        async get() {
            return await apiHandler.get(`profile`);
        },

        async update({data}) {
            return await apiHandler.put(`profile`, data);
        },

        async resetTotp() {
            return await apiHandler.post(`profile/totp-reset`);
        }
    };
};
