import resources from './resources';

/**
 *
 * @param apiHandler
 * @returns {Object}
 */
export default function createApiInstance({apiHandler}) {
    return {
        account: new resources.AccountsResource({apiHandler}),
        apiKeys: new resources.ApiKeysResource({apiHandler}),
        bankAccounts: new resources.BankAccountsResource({apiHandler}),
        blacklists: new resources.BlacklistsResource({apiHandler}),
        checkoutPages: new resources.CheckoutPagesResource({apiHandler}),
        coupons: new resources.CouponsResource({apiHandler}),
        customers: new resources.CustomersResource({apiHandler}),
        customerAuthentication: new resources.CustomerAuthenticationResource({apiHandler}),
        customEvents: new resources.CustomEventsResource({apiHandler}),
        customFields: new resources.CustomFieldsResource({apiHandler}),
        credentialHashes: new resources.CredentialHashesResource({apiHandler}),
        disputes: new resources.DisputesResource({apiHandler}),
        events: new resources.EventsResource({apiHandler}),
        files: new resources.FilesResource({apiHandler}),
        gatewayAccounts: new resources.GatewayAccountsResource({apiHandler}),
        invoices: new resources.InvoicesResource({apiHandler}),
        layouts: new resources.LayoutsResource({apiHandler}),
        lists: new resources.ListsResource({apiHandler}),
        notes: new resources.NotesResource({apiHandler}),
        organizations: new resources.OrganizationsResource({apiHandler}),
        paymentCards: new resources.PaymentCardsResource({apiHandler}),
        paymentTokens: new resources.PaymentTokensResource({apiHandler}),
        paypalAccounts: new resources.PayPalAccountsResource({apiHandler}),
        plans: new resources.PlansResource({apiHandler}),
        previews: new resources.PreviewsResource({apiHandler}),
        products: new resources.ProductsResource({apiHandler}),
        profile: new resources.ProfileResource({apiHandler}),
        sessions: new resources.SessionsResource({apiHandler}),
        shippingZones: new resources.ShippingZonesResource({apiHandler}),
        status: new resources.StatusResource({apiHandler}),
        subscriptions: new resources.SubscriptionsResource({apiHandler}),
        tracking: new resources.TrackingResource({apiHandler}),
        transactions: new resources.TransactionsResource({apiHandler}),
        threeDSecure: new resources.ThreeDSecureResource({apiHandler}),
        users: new resources.UsersResource({apiHandler}),
        webhooks: new resources.WebhooksResource({apiHandler}),
        websites: new resources.WebsitesResource({apiHandler}),

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
        getCancellationToken: apiHandler.getCancellationToken
    };
}
