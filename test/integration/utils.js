import faker from 'faker';
import deepFreeze from '../../src/deep-freeze';

export function createMerchantSignupData() {
    return deepFreeze({
        email: faker.internet.email(),
        company: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        businessPhone: faker.phone.phoneNumberFormat(),
        password: faker.internet.password(),
        website: faker.internet.url()
    })
}


export function createWebsiteData() {
    return {
        name: faker.company.companyName(),
        url: faker.internet.url(),
        servicePhone: faker.phone.phoneNumberFormat(),
        serviceEmail: faker.internet.email(),
        checkoutPageUri: faker.lorem.slug(),
        customFields: {}
    }
}


export function createApiKeyData(withId = false) {
    let key = {description: faker.lorem.sentence()};
    if (withId) {
        key.id = faker.random.uuid();
    }
    return deepFreeze(key);
}

export function createCustomerData(withId = false) {
    let customer = {
        primaryAddress: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            emails: [{
                label: faker.lorem.word(),
                value: faker.internet.email(),
                primary: true
            }]
        }
    };
    if (withId) {
        customer.id = faker.random.uuid();
    }
    return deepFreeze(customer);
}

export function createBankAccountData(withId = false, merge = {}) {
    let bankAccount = {
        bankName: faker.finance.accountName(),
        routingNumber: String(faker.finance.account()),
        accountNumber: String(faker.finance.account()),
        accountType: 'checking',
        ...merge
    };
    if (withId) {
        bankAccount.id = faker.random.uuid();
    }
    return deepFreeze(bankAccount);
}

export function createBlacklistData(withId = false) {
    let blacklistItem = {
        type: 'ip-address',
        value: faker.internet.ip()
    };
    if (withId) {
        blacklistItem.id = faker.random.uuid();
    }
    return deepFreeze(blacklistItem);
}

export function createPlanData(withId = false) {
    let plan = {
        name: faker.commerce.productName(),
        currency: 'USD',
        setupAmount: faker.finance.amount(),
        recurringPeriodUnit: 'month',
        recurringPeriodLength: 1,
        recurringAmount: faker.finance.amount()
    };
    if (withId) {
        plan.id = faker.random.uuid();
    }
    return deepFreeze(plan);
}

export function createCheckoutPageData(withId = false, merge = {}) {
    let checkoutPage = {
        uriPath: faker.lorem.slug(),
        name: faker.lorem.words(),
        ...merge
    };
    if (withId) {
        checkoutPage.id = faker.random.uuid();
    }
    return deepFreeze(checkoutPage);
}
