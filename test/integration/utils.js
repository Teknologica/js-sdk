import faker from 'faker';
import deepFreeze from '../../src/deep-freeze';

/**
 * Generates a datetime value in the past by one month. Always on the first day of the month.
 * @returns {string} an RFC3999 valid datetime
 */
export function generatePastAPIDatetime() {
    const currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    if (month === 1) {
        year = year - 1;
        month = 12;
    } else {
        month = month - 1;
    }
    if (month < 10) {
        //zero pad months
        month = `0${month}`;
    }
    return `${year}-${month}-01T00:00:00+00:00`;
}

/**
 * Generate a password that includes digits and a random alphanumeric string
 * @returns {string} validation compliant password
 */
export function generatePassword() {
    return `${(Math.random() * 99)>>0}${faker.internet.password()}`
}

export function generateSlug() {
  return `${faker.lorem.word()}-${faker.lorem.word()}`;
}

export function createMerchantSignupData() {
    return deepFreeze({
        email: faker.internet.email(),
        company: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        businessPhone: faker.phone.phoneNumberFormat(),
        password: generatePassword(),
        website: faker.internet.url()
    })
}

export function createWebsiteData(withId = false) {
    let website = {
      name: faker.company.companyName(),
      url: faker.internet.url(),
      servicePhone: faker.phone.phoneNumberFormat(),
      serviceEmail: faker.internet.email(),
      checkoutPageUri: generateSlug(),
      customFields: {}
    };
    if (withId) {
      website.id = faker.random.uuid();
    }
    return deepFreeze(website);
}

export function createWebhookCredData() {
    return deepFreeze({
        host: 'google.com',
        auth: {
            type: 'none'
        }
    });
}

export function createWebhookData(withId = false, merge = {}) {
    let webhook = {
        eventsFilter: [],
        status: 'active',
        method: 'GET',
        url: 'http://google.com',
        headers: {},
        ...merge
    };
    if (withId) {
        webhook.id = faker.random.uuid();
    }
    return deepFreeze(webhook);
}

export function createEmailCredData() {
    return deepFreeze({
        host: process.env.TEST_SMTP_HOST,
        port: process.env.TEST_SMTP_PORT,
        encryption: 'ssl',
        auth: {
            type: 'login',
            username: process.env.TEST_SMTP_USER,
            password: process.env.TEST_SMTP_PASS
        }
    });
}

export function createUserData(withId = false) {
    let user = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      businessPhone: faker.phone.phoneNumberFormat(),
      mobilePhone: faker.phone.phoneNumberFormat(),
      password: generatePassword(),
      permissions: [],
      reportingCurrency: 'USD',
      totpRequired: true,
      totpSecret: '',
      totpUrl: '',
      country: 'US',
      preferences: {}
    };
    if (withId) {
      user.id = faker.random.uuid();
    }
    return deepFreeze(user);
}


export function createTransactionLeadSourceData() {
  let leadSource = {
      medium: faker.lorem.word(),
      source: faker.internet.domainName(),
      campaign: faker.lorem.slug(),
      term: faker.lorem.word(),
      content: faker.lorem.words(),
      affiliate: faker.internet.userName(),
      subAffiliate: faker.internet.userName(),
      salesAgent: faker.name.firstName(),
      clickId: "",
      path: faker.system.filePath(),
      ipAddress: faker.internet.ip(),
      currency: "USD",
      amount: 0
  };

  return deepFreeze(leadSource);
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

export function createCouponData(withRedemptionCode = false) {
    let coupon = {
        description: faker.hacker.phrase(),
        issuedTime: generatePastAPIDatetime(),
        discount: {
            type: 'percent',
            value: 12
        },
        restrictions: [{
            type: 'discounts-per-redemption',
            quantity: 12
        }],
    };
    if (withRedemptionCode) {
        coupon.redemptionCode = faker.random.uuid();
    }
    return deepFreeze(coupon);
}

export function createCouponRedemptionData(redemptionCode, customerId) {
    return deepFreeze({
        redemptionCode,
        customerId
    });
}
