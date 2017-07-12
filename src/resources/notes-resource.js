export default function NotesResource({apiHandler}) {
    return {
        async getAll() {
            return await apiHandler.getAll(`notes`);
        },

        async get({id}) {
            return await apiHandler.get(`notes/${id}`);
        },

        async create({id = '', data}) {
            return await apiHandler.create(`notes/${id}`, data);
        },

        async update({id, data}) {
            return await apiHandler.put(`notes/${id}`, data);
        }
    };
};
