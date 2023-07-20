const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    //variables de ejemplo
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { active: true };

    // const users = await User.find()
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // User.countDocuments(); para contar

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        users
    });
}


const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Verificar si el correo existe
    // const existeEmail = await User.findOne({ email });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'Ya existe un usuario con este correo'
    //     });
    // }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controller',
        user
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    // Borrar fisicamente de la BD - No recomendado
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { active: false });

    res.json(user);
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}