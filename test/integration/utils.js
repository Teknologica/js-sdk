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

export function createWebsiteCreateSuccessData() {
    return deepFreeze({
      name: faker.company.companyName(),
      url: faker.internet.url(),
      servicePhone: '12344567890',
      serviceEmail: faker.internet.email(),
      checkoutPageUri: "",
      customFields: { }
    })
}


export function createWebsiteCreateInvalidData() {
  return deepFreeze({
    name: faker.company.companyName(),
    url: '',
    servicePhone: '12344567890',
    serviceEmail: faker.internet.email(),
    checkoutPageUri: "",
    customFields: { }
  })
}
