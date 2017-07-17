export default function PaymentTokensResource({apiHandler}) {
    return {
        async getAll({limit = null, offset = null} = {}) {
            const params = {
                limit,
                offset
            };
            return await apiHandler.getAll(`tokens`, params);
        },

        async get({token}) {
            return await apiHandler.get(`tokens/${token}`);
        },

        async create({data}) {
            return await apiHandler.post(`tokens`, data);
        },

        async expire({token}) {
            return await apiHandler.post(`tokens/${token}/expiration`);
        }
    };
};
