export default class Member {
    constructor({data, status, statusText, headers, config}) {
        this.fields = Object.freeze(data);
    }
}
