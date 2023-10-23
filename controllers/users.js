const { request, response } = require('express');
const usersModel = require('../models/users');
const pool = require('../db');

const usersList = async (req = request, res = response) => {
    try {
        const conn = await pool.getConnection();
        const users = await conn.query(usersModel.getAll);
        conn.release(); // Liberar la conexión al pool

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error Connecting to MySQL database' });
    }
}

const listUserByID = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query(usersModel.getByID, [id]);
        conn.release(); // Liberar la conexión al pool

        if (!user || user.length === 0) {
            res.status(404).json({ msg: 'User Not Found' });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error Connecting to MySQL database' });
    }
}

const addUser = async (req = request, res = response) => {
    const {
        username,
        email,
        password,
        name,
        lastname,
        phone_number = '',
        role_id,
        is_active = 1
    } = req.body;

    if (!username || !email || !password || !name || !lastname || !role_id) {
        res.status(400).json({ msg: 'Missing information' });
        return;
    }

    try {
        const conn = await pool.getConnection();

        const [usernameuser] = await conn.query(usersModel.getBYUserame, [username]);
        if (usernameuser.length > 0) {
            res.status(409).json({ msg: `User with username ${username} already exists` });
            conn.release(); // Liberar la conexión al pool
            return;
        }

        const [emailUser] = await conn.query(usersModel.getBYEmail, [email]);
        if (emailUser.length > 0) {
            res.status(409).json({ msg: `User with email ${email} already exists` });
            conn.release(); // Liberar la conexión al pool
            return;
        }

        const user = [username, email, password, name, lastname, phone_number, role_id, is_active];
        const userAdded = await conn.query(usersModel.addRow, user);
        conn.release(); // Liberar la conexión al pool

        if (userAdded.affectedRows === 0) {
            res.status(500).json({ msg: "Failed to add user" });
            return;
        }

        res.json({ msg: "User added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error Connecting to MySQL database' });
    }
}

const updateUser = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const conn = await pool.getConnection();

        const [userExists] = await conn.query(usersModel.getByID, [id]);
        conn.release(); // Liberar la conexión al pool

        if (!userExists || userExists.length === 0) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        // Realiza la lógica para actualizar el usuario aquí y asegúrate de pasar los datos necesarios
        // Ejemplo: const updatedUser = await conn.query(usersModel.updateUser, [param1, param2, ...]);

        // Verifica el resultado y responde según sea necesario

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error Connecting to MySQL database' });
    }
}

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const conn = await pool.getConnection();

        const [userExists] = await conn.query(usersModel.getByID, [id]);
        conn.release(); // Liberar la conexión al pool

        if (!userExists || userExists.length === 0) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        // Realiza la lógica para eliminar el usuario aquí y asegúrate de pasar los datos necesarios
        // Ejemplo: const deletedUser = await conn.query(usersModel.deleteRow, [id]);

        // Verifica el resultado y responde según sea necesario

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error Connecting to MySQL database' });
    }
}

module.exports = { usersList, listUserByID, addUser, deleteUser, updateUser };
