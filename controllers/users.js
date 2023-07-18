const { response, request } = require('express');


const usersGet = (req = request, res = response) => {

    //variables de ejemplo
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit,
    });
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller'
    });
}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}