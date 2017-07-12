import resources from './resources';

export default function createApiInstance({apiHandler}) {
    return {
        account: new resources.CustomersResource({apiHandler}),
        apiKeys: new resources.ApiKeysResource({apiHandler}),
        bankAccounts: new resources.BankAccountsResource({apiHandler}),
        blacklists: new resources.BlacklistsResource({apiHandler}),
        checkoutPages: new resources.CheckoutPagesResource({apiHandler}),
        contacts: new resources.CustomersResource({apiHandler}),
        coupons: new resources.CouponsResource({apiHandler}),
        customers: new resources.CustomersResource({apiHandler}),
        customerAuthentication: new resources.CustomersResource({apiHandler}),
        customEvents: new resources.CustomersResource({apiHandler}),
        customFields: new resources.CustomFieldsResource({apiHandler}),
        credentialHashes: new resources.CredentialHashesResource({apiHandler}),
        disputes: new resources.DisputesResource({apiHandler}),
        events: new resources.CustomersResource({apiHandler}),
        files: new resources.CustomersResource({apiHandler}),
        gatewayAccounts: new resources.GatewayAccountsResource({apiHandler}),
        invoices: new resources.InvoicesResource({apiHandler}),
        layouts: new resources.LayoutsResource({apiHandler}),
        lists: new resources.ListsResource({apiHandler}),
        notes: new resources.NotesResource({apiHandler}),
        organizations: new resources.OrganizationsResource({apiHandler}),
        paymentCards: new resources.PaymentCardsResource({apiHandler}),
        paymentTokens: new resources.CustomersResource({apiHandler}),
        paypalAccounts: new resources.CustomersResource({apiHandler}),
        plans: new resources.CustomersResource({apiHandler}),
        products: new resources.CustomersResource({apiHandler}),
        profile: new resources.CustomersResource({apiHandler}),
        sessions: new resources.CustomersResource({apiHandler}),
        shippingZones: new resources.CustomersResource({apiHandler}),
        status: new resources.CustomersResource({apiHandler}),
        subscriptions: new resources.CustomersResource({apiHandler}),
        tracking: new resources.CustomersResource({apiHandler}),
        transactions: new resources.CustomersResource({apiHandler}),
        threeDSecure: new resources.CustomersResource({apiHandler}),
        users: new resources.CustomersResource({apiHandler}),
        websites: new resources.CustomersResource({apiHandler}),
        webhooks: new resources.WebhooksResource({apiHandler}),

        //expose apiHandler methods to the API instance
        addRequestInterceptor: apiHandler.addRequestInterceptor,
        removeRequestInterceptor: apiHandler.removeRequestInterceptor,
        addResponseInterceptor: apiHandler.addResponseInterceptor,
        removeResponseInterceptor: apiHandler.removeResponseInterceptor,
        setTimeout: apiHandler.setTimeout,
        setProxyAgent: apiHandler.setProxyAgent,
        setSessionToken: apiHandler.setSessionToken,
        setApiConsumer: apiHandler.setApiConsumer,
        setEndpoints: apiHandler.setEndpoints,
        getCancellationToken: apiHandler.getCancellationToken,
    };
}
