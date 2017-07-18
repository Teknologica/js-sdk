import paginationHeaders from '../../../src/pagination-headers';

export default function customersMock({adapter}) {
    const headers = {
        [paginationHeaders.limit]: 100,
        [paginationHeaders.offset]: 0,
        [paginationHeaders.total]: 2,
    };
    const customers = [
        {
            "id": "f9171662-0585-44ac-a8a1-874c8de9db85",
            "email": "gael_salazar65@gmail.com",
            "firstName": "Gael",
            "lastName": "Salazar",
            "ipAddress": "215.38.48.236",
            "defaultCardId": "198994f1-c92c-4e95-8073-4ee089d16f40",
            "defaultCard": "198994f1-c92c-4e95-8073-4ee089d16f40",
            "createdTime": "2017-05-26 18:59:50",
            "updatedTime": "2017-05-26 18:59:51",
            "customFields": {},
            "primaryAddress": {
                "firstName": "Gael",
                "lastName": "Salazar",
                "organization": null,
                "address": null,
                "address2": null,
                "city": null,
                "region": null,
                "postalCode": null,
                "country": null,
                "phoneNumbers": [],
                "emails": [{
                    "label": "main",
                    "value": "gael_salazar65@gmail.com",
                    "primary": true
                }]
            },
            "defaultPaymentInstrument": {
                "method": "payment-card",
                "paymentCardId": "198994f1-c92c-4e95-8073-4ee089d16f40"
            }
        },
        {
            "id": "f9171662-0585-44ac-a8a1-874c8de9db85",
            "email": "gael_salazar65@gmail.com",
            "firstName": "Gael",
            "lastName": "Salazar",
            "ipAddress": "215.38.48.236",
            "defaultCardId": "198994f1-c92c-4e95-8073-4ee089d16f40",
            "defaultCard": "198994f1-c92c-4e95-8073-4ee089d16f40",
            "createdTime": "2017-05-26 18:59:50",
            "updatedTime": "2017-05-26 18:59:51",
            "customFields": {},
            "primaryAddress": {
                "firstName": "Gael",
                "lastName": "Salazar",
                "organization": null,
                "address": null,
                "address2": null,
                "city": null,
                "region": null,
                "postalCode": null,
                "country": null,
                "phoneNumbers": [],
                "emails": [{
                    "label": "main",
                    "value": "gael_salazar65@gmail.com",
                    "primary": true
                }]
            },
            "defaultPaymentInstrument": {
                "method": "payment-card",
                "paymentCardId": "198994f1-c92c-4e95-8073-4ee089d16f40"
            }
        }
    ];
    adapter.onGet('/customers').reply(200, customers, headers);
}
