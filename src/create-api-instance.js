import Resources from './resources';

/**
 *
 * @param apiHandler
 * @returns {Object}
 */
export default function createApiInstance({apiHandler}) {
    return {
        account: new Resources.AccountsResource({apiHandler}),
        apiKeys: new Resources.ApiKeysResource({apiHandler}),
        bankAccounts: new Resources.BankAccountsResource({apiHandler}),
        blacklists: new Resources.BlacklistsResource({apiHandler}),
        checkoutPages: new Resources.CheckoutPagesResource({apiHandler}),
        coupons: new Resources.CouponsResource({apiHandler}),
        customers: new Resources.CustomersResource({apiHandler}),
        customerAuthentication: new Resources.CustomerAuthenticationResource({apiHandler}),
        customEvents: new Resources.CustomEventsResource({apiHandler}),
        customFields: new Resources.CustomFieldsResource({apiHandler}),
        credentialHashes: new Resources.CredentialHashesResource({apiHandler}),
        disputes: new Resources.DisputesResource({apiHandler}),
        events: new Resources.EventsResource({apiHandler}),
        files: new Resources.FilesResource({apiHandler}),
        gatewayAccounts: new Resources.GatewayAccountsResource({apiHandler}),
        invoices: new Resources.InvoicesResource({apiHandler}),
        layouts: new Resources.LayoutsResource({apiHandler}),
        lists: new Resources.ListsResource({apiHandler}),
        notes: new Resources.NotesResource({apiHandler}),
        organizations: new Resources.OrganizationsResource({apiHandler}),
        paymentCards: new Resources.PaymentCardsResource({apiHandler}),
        paymentTokens: new Resources.PaymentTokensResource({apiHandler}),
        paypalAccounts: new Resources.PayPalAccountsResource({apiHandler}),
        plans: new Resources.PlansResource({apiHandler}),
        previews: new Resources.PreviewsResource({apiHandler}),
        products: new Resources.ProductsResource({apiHandler}),
        profile: new Resources.ProfileResource({apiHandler}),
        sessions: new Resources.SessionsResource({apiHandler}),
        shippingZones: new Resources.ShippingZonesResource({apiHandler}),
        status: new Resources.StatusResource({apiHandler}),
        subscriptions: new Resources.SubscriptionsResource({apiHandler}),
        tracking: new Resources.TrackingResource({apiHandler}),
        transactions: new Resources.TransactionsResource({apiHandler}),
        threeDSecure: new Resources.ThreeDSecureResource({apiHandler}),
        users: new Resources.UsersResource({apiHandler}),
        webhooks: new Resources.WebhooksResource({apiHandler}),
        websites: new Resources.WebsitesResource({apiHandler}),

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
