const { users, getNextId } = require('../data/users');

const validateUser = (name, email) => {
    if (!name || !email) {
        return 'Os campos nome e e-mail são obrigatórios';
    }

    return null;
};

const createUser = (req, res) => {
    const { name, email } = req.body;

    const validationError = validateUser(name, email);

    if (validationError) {
        return res.status(400).json({
            error: validationError
        });
    }

    const newUser = {
        id: getNextId(),
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        data: newUser
    });
};

const getUsers = (req, res) => {
    res.status(200).json({
        data: users
    });
};

const getUserById = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            error: 'Usuário não encontrado'
        });
    }

    res.status(200).json({
        data: user
    });
};

const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Usuário não encontrado'
        });
    }

    const { name, email } = req.body;

    const validationError = validateUser(name, email);

    if (validationError) {
        return res.status(400).json({
            error: validationError
        });
    }

    users[index] = {
        id: users[index].id,
        name,
        email
    };

    res.status(200).json({
        data: users[index]
    });
};

const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Usuário não encontrado'
        });
    }

    users.splice(index, 1);

    res.status(204).send();
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
