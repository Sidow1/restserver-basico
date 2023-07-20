const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const existsEmail = async (email) => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email}, ya está registrado en la BD`);
    }
}

const existsUserById = async (id) => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    isRoleValid,
    existsEmail,
    existsUserById
}