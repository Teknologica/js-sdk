import faker from 'faker';
import deepFreeze from '../../src/deep-freeze';
import axios from 'axios';
import {URL} from 'url';

/**
 * List of test payment cards
 * @link https://help.rebilly.com/35300-rebilly-basics/sandbox-vs-live-mode
 * @type {{approved, declined, firstApprovedSubsequentDeclined: string, timeout: string, connectionError: string, refundMorphedToVoid: string, refundDeclined: string, alternateApprovedDeclined: string, declinedAsFraud: string, suspendedPaymentFlow: string}}
 */
const testPaymentCards = {
    /**
     * @prop approved {string}
     */
    get approved() {
        const cards = [
            '4111111111111111',
            '5555555555554444',
            /*'378282246310005',
             '6011111111111117',
             '30569309025904',
             '3530111333300000',*/
        ];
        return pickRandomFromList(cards);
    },
    /**
     * @prop declined {string}
     */
    get declined() {
        const cards = [
            '4000000000000002',
            '5105105105105100',
            /*'371449635398431',
             '6011000990139424',
             '38520000023237',
             '3566002020360505',*/
        ];
        return pickRandomFromList(cards);
    },
    firstApprovedSubsequentDeclined: '4000000000000010',
    timeout: '4000000000000200',
    connectionError: '4000000000001000',
    refundMorphedToVoid: '4000000000020000',
    refundDeclined: '4000000000100000',
    alternateApprovedDeclined: '4000000002000000',
    declinedAsFraud: '4000000010000000',
    suspendedPaymentFlow: '4000000000000101'
};

/**
 * Test bank account supported by Rebilly
 * @link https://help.rebilly.com/35300-rebilly-basics/sandbox-vs-live-mode
 * @type {{routingNumber: string, accountNumber: string}}
 */
const testBankAccount = {
    routingNumber: '123456789',
    accountNumber: '1234567890'
};

export {testPaymentCards, testBankAccount};

/**
 * Generates a datetime value in the past by one month. Always on the first day of the month.
 * @returns {string} an RFC3999 valid datetime in the past
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
 * Generates a date value in the future by one month. Always on the first day of the month at noon.
 * @returns {string} an RFC3999 valid date in the future
 */
export function generateFutureAPIDate() {
    const currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    if (month === 12) {
        year = year + 1;
        month = 1;
    } else {
        month = month + 1;
    }
    if (month < 10) {
        //zero pad months
        month = `0${month}`;
    }
    return `${year}-${month}`;
}

/**
 * Generates a datetime value in the future by one month. Always on the first day of the month at noon.
 * @returns {string} an RFC3999 valid datetime in the future
 */
export function generateFutureAPIDatetime() {
    const futureDate = generateFutureAPIDate();
    return `${futureDate}-01T12:00:00+00:00`;
}

/**
 * Generate a password that includes digits and a random alphanumeric string
 * @returns {string} validation compliant password
 */
export function generatePassword() {
    return `${(Math.random() * 99) >> 0}${faker.internet.password()}`
}

export function generateSlug() {
    return faker.helpers.slugify(faker.lorem.words()).slice(0,30);
}

export function pickRandomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export function getRandomBool() {
    return Boolean(Math.round(Math.random()));
}

export function getRandomRuleStatus() {
    return getRandomBool() ? 'active' : 'inactive';
}

export async function getWebhookRequestBinUrl() {
    try {
        const {data} = await axios({
            method: 'post',
            url: 'https://requestb.in/api/v1/bins',
            data: {
                private: false
            }
        });
        return `https://requestb.in/${data.name}`;
    }
    catch (err) {
        throw 'Unable to create Requestb.in URI';
    }
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

export function createWebhookCredData(webhookUrl = false) {
    let host = 'google.com';
    if (webhookUrl) {
        //get host from provided URL
        host = new URL(webhookUrl).host;
    }
    return deepFreeze({
        host,
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

export function createLeadSourceData() {
    const leadSource = {
        medium: faker.lorem.word(),
        source: faker.internet.domainName(),
        campaign: faker.lorem.slug(),
        term: faker.lorem.word(),
        content: faker.lorem.words(),
        affiliate: faker.internet.userName(),
        subAffiliate: faker.internet.userName(),
        salesAgent: faker.name.firstName(),
        clickId: '',
        path: faker.system.filePath(),
        ipAddress: faker.internet.ip(),
        currency: 'USD',
        amount: 0
    };
    return deepFreeze(leadSource);
}

export function createTransactionData(withId = false, merge = {}, scheduledTransaction = false) {
    let transaction = {
        currency: 'USD',
        amount: faker.finance.amount(),
        description: faker.hacker.phrase(),
        ...merge
    };
    if (scheduledTransaction) {
        transaction.scheduledTime = generateFutureAPIDatetime();
    }
    if (withId) {
        transaction.id = faker.random.uuid()
    }
    return deepFreeze(transaction);
}

export function createSubscriptionData(withId = false, merge = {}) {
    let subscription = {
        deliveryAddress: {},
        billingAddress: {},
        quantity: 2,
        autopay: true,
        startTime: generatePastAPIDatetime(),
        renewalTime: generateFutureAPIDatetime(),
        customFields: {},
        ...merge
    };

    if (withId) {
        subscription.id = faker.random.uuid();
    }
    return deepFreeze(subscription);

}


export function createInvoiceData(withId = false, merge = {}) {
    let invoice = {
        currency: 'USD',
        billingAddress: {},
        deliveryAddress: {},
        notes: faker.hacker.phrase(),
        ...merge
    };

    if (withId) {
        invoice.id = faker.random.uuid();
    }
    return deepFreeze(invoice);

}

export function createApiKeyData(withId = false) {
    let key = {description: faker.lorem.sentence()};
    if (withId) {
        key.id = faker.random.uuid();
    }
    return deepFreeze(key);
}

export function createCustomerData(withId = false, merge = {}) {
    let customer = {
        primaryAddress: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            emails: [{
                label: faker.lorem.word(),
                value: faker.internet.email(),
                primary: true
            }]
        },
        ...merge
    };
    if (withId) {
        customer.id = faker.random.uuid();
    }
    return deepFreeze(customer);
}

export function createBankAccountData(withId = false, merge = {}) {
    let bankAccount = {
        bankName: faker.finance.accountName(),
        routingNumber: testBankAccount.routingNumber,
        accountNumber: testBankAccount.accountNumber,
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
        uriPath: generateSlug(),
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

export function createCustomEventData(withId = false) {
    let customEvent = {
        eventType: 'subscription-ended',
        title: faker.lorem.words(),
        description: faker.hacker.phrase(),
        chronology: 'before',
        scheduleInstruction: {
            method: 'date-interval',
            duration: 1,
            unit: 'day'
        }
    };
    if (withId) {
        customEvent.id = faker.random.uuid();
    }
    return deepFreeze(customEvent);
}

export function createPaymentCard(withId = false, merge = {}) {
    let paymentCard = {
        pan: testPaymentCards.approved,
        expYear: (new Date()).getFullYear() + 2,
        expMonth: Math.ceil(Math.random() * 12) >> 0,
        cvv: 123,
        ...merge
    };
    if (withId) {
        paymentCard.id = faker.random.uuid();
    }
    return deepFreeze(paymentCard);
}

export function createGatewayAccountData(withId = false, merge = {}) {
    let gatewayName, gatewayConfig;

    if ( merge !== {} && merge.gatewayName) {
        gatewayName = merge.gatewayName;
        delete merge.gatewayName;
    }

    if (merge.gatewayConfig) {
        gatewayConfig = merge.gatewayConfig;
        delete merge.gatewayConfig;
    }

    let gatewayAccount = {
        gatewayName: 'RebillyProcessor',
        acquirerName: pickRandomFromList(['Other', 'RebillyProcessor', 'Bank Of Rebilly']),
        merchantCategoryCode: 0,
        acceptedCurrencies: ['USD'],
        method: 'payment-card',
        paymentCardSchemes: ['Visa', 'MasterCard', 'American Express', 'Discover', 'Diners Club', 'JCB'],
        gatewayConfig: {},
        ...merge
    };

    if (gatewayName) {
        gatewayAccount.gatewayName = gatewayName;
    }

    if (gatewayConfig) {
        gatewayAccount.gatewayConfig = gatewayConfig;
    }

    if (withId) {
        gatewayAccount.id = faker.random.uuid();
    }

    return deepFreeze(gatewayAccount);
}

export function createCustomerCredentialsData({withId = false, customerId = ''} = {}) {
    let credentialsData = {
        username: faker.internet.userName(),
        password: 'pa$$word',
        expiredTime: generateFutureAPIDatetime()
    };
    if (withId) {
        credentialsData.id = faker.random.uuid();
    }
    if (customerId) {
        credentialsData.customerId = customerId;
    }
    return deepFreeze(credentialsData);
}

export function createCustomFieldData(withSchema = false) {
    let customField = {
        name: generateSlug(),
        type: pickRandomFromList(['array', 'boolean', 'datetime', 'integer', 'number', 'string']),
        description: faker.hacker.phrase()
    };
    if (withSchema) {
        customField.additionalSchema = {
            allowedValues: Array.from(new Array(10)).map(() => faker.lorem.word)
        };
    }
    return deepFreeze(customField);
}

export function createCustomFieldEntryData(customField) {
    const getters = {
        array: () => Array.from(new Array(4)).map(item => faker.lorem.word()),
        boolean: () => getRandomBool(),
        datetime: () => generatePastAPIDatetime(),
        integer: () => Math.round(Math.random() * 9999),
        number: () => Number((Math.random() * 9999).toFixed(2)),
        string: () => faker.lorem.words()
    };
    return deepFreeze({[customField.fields.name]: getters[customField.fields.type]()});
}

export function createSubscriptionCancelData() {
    const subscriptionCancel = {
        policy: 'at-next-renewal',
        canceledBy: 'merchant',
        cancelCategory: 'did-not-use',
        cancelDescription: 'string'
    };

    return deepFreeze(subscriptionCancel);
}

export function createSubscriptionSwitchData(merge = {}) {
    return deepFreeze({
        policy: 'at-next-renewal',
        quantity: 2,
        ...merge
    });
}

export function createEventRulesData() {
    return deepFreeze({
       rules: Array.from(new Array(4)).map(rule => createRuleData())
    });
}

export function createRuleData() {
    return deepFreeze({
        name: faker.lorem.words(),
        status: 'inactive', //TODO allow for random value in the future without affecting other tests
        final: getRandomBool(),
        criteria: {}, //TODO create criteria
        actions: Array.from(new Array(4)).map(rule => createRuleActionData())
    });
}

export function createRuleActionData() {
    return deepFreeze(pickRandomFromList([
        {
            name: 'blacklist',
            status: getRandomRuleStatus(),
            type: pickRandomFromList(['customer-id', 'email', 'fingerprint', 'ip-address', 'payment-card']),
            ttl: Math.round(Math.random() * 9999)
        },
        {
            name: 'stop-subscriptions',
            status: getRandomRuleStatus(),
        }
    ]));
}

export function createDisputeData({withId = false, transactionId} = {}) {
    let disputesData = {
        transactionId: transactionId,
        currency: 'USD',
        amount: 5,
        reasonCode: '1000',
        type: 'first-chargeback',
        status: 'response-needed',
        acquirerReferenceNumber: faker.random.number().toString(),
        postedTime: generatePastAPIDatetime(),
        deadlineTime: generateFutureAPIDatetime()
    };
    if (withId) {
        disputesData.id = faker.random.uuid();
    }
    return deepFreeze(disputesData);
}

export function createLayoutData(withId = false, merge = {}) {
    let layout = {
        name: faker.lorem.words(),
        ...merge
    };
    if (withId) {
        layout.id = faker.random.uuid();
    }
    return deepFreeze(layout);
}

export function createLayoutItemData(planId) {
    return deepFreeze({planId, starred: false});
}

export function createListData(withId = false) {
    let list = {
        name: faker.lorem.words(),
        values: ['foo', 'bar']
    };
    if (withId) {
        list.id = faker.random.uuid();
    }
    return deepFreeze(list);
}

export function create3DSecureData(merge = {}) {
    let threeDSecure = {
        ...merge,
        enrolled: 'Y',
        enrollmentEci: 'abc',
        eci: 0,
        cavv: 'string',
        xid: 'string',
        payerAuthResponseStatus: 'Y',
        signatureVerification: 'Y',
        amount: 0,
        currency: 'USD'
    };
    return deepFreeze(threeDSecure);
}

export function createNoteData(withId = false, customerId) {
    let note = {
        content: faker.hacker.phrase(),
        archived: false,
        relatedType: 'customer',
        relatedId: customerId
    };
    if (withId) {
        note.id = faker.random.uuid();
    }
    return deepFreeze(note);
}

export function createOrganizationData(withId = false) {
    let organization = {
        name: faker.lorem.words(),
        address: faker.address.streetAddress(),
        address2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        region: faker.address.state(),
        country: faker.address.countryCode(),
        postalCode: faker.address.zipCode()
    };
    if (withId) {
        organization.id = faker.random.uuid();
    }
    return deepFreeze(organization);
}

export function createPaymentCardAuthorizationData(websiteId, gatewayAccountId) {
    return deepFreeze({
        websiteId,
        gatewayAccountId,
        amount: faker.finance.amount(),
        currency: 'USD'
    });
}

export function createPaymentTokenData() {
    return deepFreeze({
        method: 'payment-card',
        paymentInstrument: {
            pan: testPaymentCards.approved,
            expYear: (new Date()).getFullYear() + 2,
            expMonth: Math.ceil(Math.random() * 12) >> 0,
            cvv: 123
        },
        billingAddress: {}
    });
}

export function createShippingZoneData(withId = false, merge = {}) {
    let shippingZone = {
        name: faker.lorem.word(),
        rates: [
            {
                name: 'string',
                price: 0,
                currency: 'USD'
            }
        ],
        ...merge
    };
    if (withId) {
        shippingZone.id = faker.random.uuid();
    }
    return deepFreeze(shippingZone);
}

export function createPaypalAccountData(withId = false, merge = {}) {
    let paypalAccount = {
        username: faker.lorem.word(),
        status: 'active',
        ...merge
    };
    if (withId) {
        paypalAccount.id = faker.random.uuid();
    }
    return deepFreeze(paypalAccount);
}

export function createPaypalAccountActivateData(websiteId) {
    return deepFreeze({
        websiteId,
        currency: 'USD',
        redirectURLs: {
            success: faker.internet.url(),
            decline: faker.internet.url(),
            cancel: faker.internet.url(),
            error: faker.internet.url()
        }
    });
}

export function createSessionData(withId = false) {
    let session = {
        permissions: [
            {
                resourceName: 'plans',
                methods: [
                    'GET',
                    'POST',
                    'PUT',
                    'HEAD',
                    'DELETE'
                ]
            }
        ]
    };
    if (withId) {
        session.id = faker.random.uuid();
    }
    return deepFreeze(session);
}

export function createWebhookPreviewData(merge = {}) {
    return deepFreeze({
        eventsFilter: [],
        status: 'active',
        method: 'POST',
        headers: {},
        ...merge
    });
}

export function createTriggerWebhookPreviewData(merge = {}) {
    return deepFreeze({
        body: JSON.stringify({hello: 'world'}),
        status: 'active',
        method: 'POST',
        headers: {},
        query: {},
        ...merge
    });
}

export function createSendEmailPreviewData(merge = {}) {
    return deepFreeze({
        bodyText: faker.lorem.words(),
        bodyHTML: `<strong>${faker.lorem.words()}</strong>`,
        sender: process.env.TEST_SMTP_USER,
        recipients: [process.env.TEST_SMTP_USER],
        subject: faker.hacker.phrase(),
        ...merge
    });
}

export function createProfileDataTotp() {
    return deepFreeze({
        reportingCurrency: 'USD',
        preferences: [],
        totpRequired: true,
    });
}

export function createProfileData() {
    return deepFreeze({
        reportingCurrency: 'USD',
        preferences: [],
        totpRequired: false,
    });
}

export function createProductData(withId = false) {
    let product = {
        name: faker.commerce.productName(),
        description: faker.commerce.product(),
        taxCategoryId: '',
        requiresShipping: true,
        accountingCode: '100',
        customFields: []
    };
    if (withId) {
        product.id = faker.random.uuid();
    }
    return deepFreeze(product);
}

