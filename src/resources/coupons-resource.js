export default function CouponsResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`coupons`);
        },

        async get({redemptionCode}) {
            return await apiHandler.get(`coupons/${redemptionCode}`);
        },

        async create({redemptionCode = '', data}) {
            return await apiHandler.create(`coupons/${redemptionCode}`, data);
        },

        async update({redemptionCode, data}) {
            return await apiHandler.put(`coupons/${redemptionCode}`, data);
        },

        async getAllRedemptions() {
            return await apiHandler.getAll(`coupons-redemptions`);
        },

        async getRedemption({id}) {
            return await apiHandler.get(`coupons-redemptions/${id}`);
        },

        async cancelRedemption({id}) {
            return await apiHandler.post(`coupons-redemptions/${id}/cancel`);
        },

        async redeem({data}) {
            return await apiHandler.post(`coupons-redemptions`, data);
        }
    };
};
