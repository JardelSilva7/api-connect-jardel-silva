let users = [
    {
        id: 1,
        name: 'João Silva',
        email: 'joao@example.com'
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@example.com'
    }
];

let nextId = 3;

module.exports = {
    users,
    getNextId: () => nextId++
};
