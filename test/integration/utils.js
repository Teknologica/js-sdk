import faker from 'faker';
import deepFreeze from '../../src/deep-freeze';

export function createMerchantSignupData() {
    return deepFreeze({
        email: faker.internet.email(),
        company: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        businessPhone: '1234567890',
        password:  faker.internet.password(),
        website:  faker.internet.url()
    })
}

export function createWebsiteData() {
    return {
      name: faker.company.companyName(),
      url: faker.internet.url(),
      servicePhone: '12344567890',
      serviceEmail: faker.internet.email(),
      checkoutPageUri: "",
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
