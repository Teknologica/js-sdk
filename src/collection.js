import Member from './member';

export default class Collection {
    constructor({data, status, statusText, headers, config}) {
        this.limit = 1;
        this.offset = 1;
        this.total = 1;
        this.items = data.map(member => new Member({data: member, status, statusText, headers, config}));
        Object.freeze(this);
    }
}
