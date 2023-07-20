const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersDelete, usersPost } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const { isRoleValid, existsEmail, existsUserById } = require('../helpers/db-validators');

const router = new Router();


router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    // check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existsEmail),
    // check('role', 'No es un rol válido').inIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validarCampos
], usersPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserById),
    validarCampos
], usersPut);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserById),
    validarCampos
], usersDelete);

module.exports = router;