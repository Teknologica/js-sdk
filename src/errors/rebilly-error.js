export default class RebillyError extends Error {
    constructor({message}) {
        super(message);
        this.name = 'Rebilly Error';
    }
}
