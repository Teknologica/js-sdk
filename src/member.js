import {JSONExport} from './decorators';
import deepFreeze from './deep-freeze';

/**
 * A single entity member.
 * @typedef Member
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

    getJSON() {
        return JSON.parse(JSON.stringify(this.fields));
    }
}
