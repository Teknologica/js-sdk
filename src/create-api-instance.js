import resources from './resources';

export default function createApiInstance({apiHandler}) {
    this.prototype.customers = new resources.CustomersResource({apiHandler});
}
