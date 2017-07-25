import chai from 'chai';
import apiInstance from '../api-instance';
import {
    createInvoiceData,
    createWebsiteData,
    createCustomerData,
    createLeadSourceData
} from '../utils';

const expect = chai.expect;

describe('when using the invoices resource', () => {
    const testIds = {with: null, without: null};
    let sharedData = null;
    let cachedInvoice = null;
    let cachedLeadSource = null;

    before(async () => {
        const customerStub = createCustomerData();
        const websiteStub = createWebsiteData();
        const [customer, website] = await Promise.all([
            apiInstance.customers.create({data: customerStub}),
            apiInstance.websites.create({data: websiteStub})
        ]);
        sharedData = {
            customerId: customer.fields.id,
            websiteId: website.fields.id
        };
    });

    it('I can create an invoice without an ID', async () => {
        const invoiceData = createInvoiceData(false, sharedData);
        const invoice = await apiInstance.invoices.create({data: invoiceData});
        testIds.without = invoice.fields.id;
        expect(invoice.fields.customerId).to.be.equal(invoiceData.customerId);
    });

    it('I can create an invoice with an ID', async () => {
        const {id, ...invoiceData} = createInvoiceData(true, sharedData);
        const invoice = await apiInstance.invoices.create({id, data: invoiceData});
        cachedInvoice = invoice;
        expect(invoice.fields.id).to.be.equal(id);
        testIds.with = id;
        expect(invoice.fields.websiteId).to.be.equal(invoiceData.websiteId);
    });

    it('I can get a list of invoices', async () => {
        const invoicesList = await apiInstance.invoices.getAll();
        expect(invoicesList.total).to.not.be.equal(0);
        const [invoice] = invoicesList.items;
        expect(invoice.fields.id).to.not.be.undefined;
    });

    it('I can get an invoice by using its ID', async () => {
        const invoice = await apiInstance.invoices.get({id: testIds.with});
        expect(invoice.fields.id).to.be.equal(testIds.with);
    });

    it('I can update an invoice', async () => {
        const invoiceData = createInvoiceData(false, sharedData);
        const invoice = await apiInstance.invoices.update({id: testIds.with, data: invoiceData});
        expect(invoice.fields.id).to.be.equal(testIds.with);
        expect(invoice.fields.notes).to.be.equal(invoiceData.notes);
    });

    it('I can issue an invoice', async () => {
        const invoiceData = createInvoiceData(false, sharedData);
        const invoice = await apiInstance.invoices.create({data: invoiceData});
        const issuedInvoice = await apiInstance.invoices.issue({id: invoice.fields.id});
        expect(issuedInvoice.response.status).to.be.equal(201);
        expect(issuedInvoice.fields.issuedTime).to.not.be.null;
    });

    it('I can abandon an invoice', async () => {
        const invoiceData = createInvoiceData(false, sharedData);
        const invoice = await apiInstance.invoices.create({data: invoiceData});
        const abandonedInvoice = await apiInstance.invoices.abandon({id: invoice.fields.id});
        expect(abandonedInvoice.response.status).to.be.equal(201);
        expect(abandonedInvoice.fields.abandonedTime).to.not.be.null;
    });

    it('I can void an invoice', async () => {
        const invoiceData = createInvoiceData(false, sharedData);
        const invoice = await apiInstance.invoices.create({data: invoiceData});
        const voidedInvoice = await apiInstance.invoices.void({id: invoice.fields.id});
        expect(voidedInvoice.response.status).to.be.equal(201);
        expect(voidedInvoice.fields.voidedTime).to.not.be.null;
    });

    it('I can create invoice items for an invoice', async () => {
        const invoiceItemData = {type: 'debit', unitPrice: 5};
        const invoiceItem = await apiInstance.invoices.createInvoiceItem({id: testIds.with, data: invoiceItemData});
        expect(invoiceItem.response.status).to.be.equal(201);
        expect(invoiceItem.fields.id).to.not.be.undefined;
    });

    it('I can retrieve a list of an invoice\'s items', async () => {
        const invoiceItemsList = await apiInstance.invoices.getAllInvoiceItems({id: testIds.with});
        expect(invoiceItemsList.total).to.not.be.equal(0);
        const [invoiceItem] = invoiceItemsList.items;
        expect(invoiceItem.fields.id).to.not.be.undefined;
    });

    it('I can create a lead source for an invoice by using its ID', async () => {
        const data = createLeadSourceData();
        const leadSource = await apiInstance.invoices.createLeadSource({id: cachedInvoice.fields.id, data: data});
        cachedLeadSource = leadSource;
        expect(leadSource.fields.id).to.not.be.undefined;
        expect(leadSource.fields.campaign).to.be.equal(data.campaign);
        expect(leadSource.response.status).to.be.equal(201);
    });

    it('I can update a lead source for an invoice by using its ID', async () => {
        const {campaign} = createLeadSourceData();
        const data = {...cachedLeadSource.fields, campaign};
        const leadSource = await apiInstance.invoices.updateLeadSource({id: cachedInvoice.fields.id, data: data});
        expect(leadSource.fields.campaign).to.be.equal(campaign);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can get a lead source by using the invoice ID', async () => {
        const leadSource = await apiInstance.invoices.getLeadSource({id: cachedInvoice.fields.id});
        expect(leadSource.fields.medium).to.be.equal(cachedLeadSource.fields.medium);
        expect(leadSource.response.status).to.be.equal(200);
    });

    it('I can delete a lead source that I just created for a specific invoice ID', async () => {
        const leadSource = await apiInstance.invoices.deleteLeadSource({id: cachedInvoice.fields.id});
        expect(leadSource.response.status).to.be.equal(204);
    });
});
