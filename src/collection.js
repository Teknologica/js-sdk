import Member from './member';
import paginationHeaders from './pagination-headers';
import {JSONExport} from './decorators';

/**
 * @prop limit {number}
 * @prop offset {number}
 * @prop total {number}
 * @prop items {Array<Member>}
 * @prop response {Object}
 * @prop getJSON {Function}
 * @example
 * const api = new RebillyAPI();
 * const customers = api.customers.getAll();
 * const rawData = customers.getJSON();
 * const totalCount = customers.total;
 */
@JSONExport('Collection')
export default class Collection {
    constructor({data, status, statusText, headers, config}) {
        Object.keys(paginationHeaders).forEach(header => this[header] = headers[paginationHeaders[header]]);
        this.response = {status, statusText, headers, config};
        this.items = data.map(member => new Member({data: member, status, statusText, headers, config}));
        Object.freeze(this);
    }
}
