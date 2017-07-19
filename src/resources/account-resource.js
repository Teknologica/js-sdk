export default function AccountResource({apiHandler}) {
    return {
        //TODO implement auth:false flag to all these
        async signUp({data}) {
            return await apiHandler.post(`signup`, data);
        },

        async signIn({data}) {
            return await apiHandler.post(`signin`, data);
        },

        async activate({token}) {
            return await apiHandler.post(`activation/${token}`);
        },

        async forgotPassword({data}) {
            return await apiHandler.post(`forgot-password`, data);
        }
    };
};
