import deepFreeze from './deep-freeze';

/**
 * A single read-only entity member.
 * @typedef Member
 * @readonly
 * @prop response {Object}
 * @prop fields {Object}
 * @prop getJSON {Function: Object}
 */
export default class Member {
    constructor({data, status, statusText, headers, config}) {
        this.response = {status, statusText, headers, config};
        this.fields = {...data};
        deepFreeze(this);
    }

    /**
     * @returns {Object}
     */
    getJSON() {
        return JSON.parse(JSON.stringify({fields: this.fields}));
    }
}
