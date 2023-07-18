const { Router } = require('express');
const { usersGet, usersPut, usersDelete, usersPost } = require('../controllers/users');

const router = new Router();


router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', usersPost);

router.delete('/', usersDelete);

module.exports = router;