import chai from 'chai';
import apiInstance from '../api-instance';
import {createCouponData, createCustomerData, createCouponRedemptionData} from '../utils';

const expect = chai.expect;

describe('when using the coupons resource', () => {
    const testIds = {with: null, without: null};
    let redeemCode;

    it('I can create a coupon without a redemption code', async () => {
        const couponStub = createCouponData();
        const coupon = await apiInstance.coupons.create({data: couponStub});
        testIds.without = coupon.fields.redemptionCode;
        expect(coupon.fields.description).to.be.equal(couponStub.description);
    });

    it('I can create a coupon with a redemption code', async () => {
        const {redemptionCode, ...data} = createCouponData(true);
        const coupon = await apiInstance.coupons.create({redemptionCode, data});
        expect(coupon.fields.redemptionCode).to.be.equal(redemptionCode);
        testIds.with = redemptionCode;
        expect(coupon.fields.description).to.be.equal(data.description);
    });

    it('I can update a coupon with a redemption code', async () => {
        const couponStub = createCouponData();
        const coupon = await apiInstance.coupons.update({redemptionCode: testIds.with, data: couponStub});
        expect(coupon.fields.redemptionCode).to.be.equal(testIds.with);
        expect(coupon.fields.description).to.be.equal(couponStub.description);
    });

    it('I can get a list of coupons', async () => {
        const coupons = await apiInstance.coupons.getAll();
        expect(coupons.total).to.not.be.equal(0);
        const [coupon] = coupons.items;
        expect(coupon.fields.redemptionCode).to.not.be.undefined;
    });

    it('I can get a coupon by using its ID', async () => {
        const coupon = await apiInstance.coupons.get({redemptionCode: testIds.with});
        expect(coupon.fields.redemptionCode).to.be.equal(testIds.with);
    });

    it('I can redeem an existing coupon for a customer ID', async () => {
        const {id, ...customerData} = createCustomerData(true);
        await apiInstance.customers.create({id, data: customerData});
        const data = createCouponRedemptionData(testIds.with, id);
        const couponRedemption = await apiInstance.coupons.redeem({data});
        redeemCode = couponRedemption.fields.id;
        expect(couponRedemption.fields.customerId).to.be.equal(id);
    });

    it('I can get a list of coupons redemptions', async () => {
        const couponRedemptions = await apiInstance.coupons.getAllRedemptions();
        expect(couponRedemptions.total).to.not.be.equal(0);
        const [couponRedemption] = couponRedemptions.items;
        expect(couponRedemption.fields.redemptionCode).to.not.be.undefined;
    });

    it('I can get coupon redemption details by using its redeem code', async () => {
        const couponRedemption = await apiInstance.coupons.getRedemption({id: redeemCode});
        expect(couponRedemption.fields.id).to.be.equal(redeemCode);
    });

    it('I can cancel a coupon redemption by using its redeem code', async () => {
        const couponRedemption = await apiInstance.coupons.cancelRedemption({id: redeemCode});
        expect(couponRedemption.fields.id).to.be.equal(redeemCode);
    });
});
