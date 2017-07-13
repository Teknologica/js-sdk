export default function CustomerAuthenticationResource({apiHandler}) {
    return {
        async getAllOptions() {
            return await apiHandler.getAll(`authentication-options`);
        },

        async updateOptions({data}) {
            return await apiHandler.put(`authentication-options`, data);
        },

        async getAllAuthTokens() {
            return await apiHandler.getAll(`authentication-tokens`);
        },

        async verify({token}) {
            return await apiHandler.get(`authentication-tokens/${token}`);
        },

        async login({data}) {
            return await apiHandler.post(`authentication-tokens`, data);
        },

        async logout({token}) {
            return await apiHandler.delete(`authentication-tokens/${token}`);
        },

        async getAllCredentials() {
            return await apiHandler.getAll(`credentials`);
        },

        async getCredential({id}) {
            return await apiHandler.getAll(`credentials/${id}`);
        },

        async createCredential({id = '', data}) {
            return await apiHandler.create(`credentials/${id}`, data);
        },

        async updateCredential({id, data}) {
            return await apiHandler.put(`credentials/${id}`, data);
        },

        async deleteCredential({id}) {
            return await apiHandler.delete(`credentials/${id}`);
        },

        async getAllResetPasswordToken() {
            return await apiHandler.getAll(`password-tokens`);
        },

        async getResetPasswordToken({id}) {
            return await apiHandler.getAll(`password-tokens/${id}`);
        },

        async createResetPasswordToken({data}) {
            return await apiHandler.post(`password-tokens`, data);
        },

        async deleteResetPasswordToken({id}) {
            return await apiHandler.delete(`password-tokens/${id}`);
        }
    };
};
