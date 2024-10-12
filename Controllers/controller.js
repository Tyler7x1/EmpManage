const {
    createUser,
    updatePasswordByEmail,
    updatePasswordByEmpId,
    findUserByName,
    findUserByEmail,
    findUserById,
    findAllUsers,
    deleteUserById
} = require('../Models/model.js');

async function handleCreateUser(req, res) {
    const { username, password, email, emp_id } = req.body;
    if (!username || !password || !email || !emp_id) {
        console.log('Body:', req.body);
        console.log('Params:', req.params);
        return res.status(400).json({ error: 'Missing required fields: username, email, password and emp_id' });
    }

    try {
        const user = await createUser(username, email, password, emp_id);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user: ' + error.message });
    }
}

async function handleUpdatePasswordByEmail(req, res) {
    const { password } = req.body;

    try {
        const result = await updatePasswordByEmail(req.params.email, password);
        if (result.modifiedCount > 0) {
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(404).send('User not found or password not updated');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating password: ' + error.message });
    }
}

async function handleUpdatePasswordByEmpId(req, res) {
    const { password } = req.body;

    try {
        const result = await updatePasswordByEmpId(req.params.id, password);
        if (result.modifiedCount > 0) {
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(404).send('User not found or password not updated');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating password: ' + error.message });
    }
}

async function handleFindUserByName(req, res) {
    try {
        const user = await findUserByName(req.params.username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error finding user: ' + error.message });
    }
}

async function handleFindUserByEmail(req, res) {
    try {
        const user = await findUserByEmail(req.params.email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error finding user: ' + error.message });
    }
}

async function handleFindUserById(req, res) {
    try {
        const user = await findUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error finding user: ' + error.message });
    }
}

async function handleGetAllUsers(req, res) {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error finding users: ' + error.message });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const result = await deleteUserById(req.params.id);
        if (result.deletedCount > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user: ' + error.message });
    }
}

module.exports = {
    handleCreateUser,
    handleFindUserByEmail,
    handleFindUserById,
    handleGetAllUsers,
    handleFindUserByName,
    handleUpdatePasswordByEmail,
    handleUpdatePasswordByEmpId,
    handleDeleteUserById
};