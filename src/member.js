import {JSONExport} from './decorators';

@JSONExport('Member')
export default class Member {
    constructor({data, status, statusText, headers, config}) {
        this.response = {status, statusText, headers, config};
        this.fields = Object.freeze(data);
    }
}
