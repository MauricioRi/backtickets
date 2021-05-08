const { body } = require('express-validator');


exports.createUserSchema = [
    body('Name_user')
        .exists()
        .withMessage('El nombre es requerido')
        .isLength({ min: 1 })
        .withMessage('El nombre no puede ser vació'),
    body('apellidos')
        .exists()
        .withMessage('Los apellidos son requeridos')
        .isAlpha()
        .withMessage('Solo se permiten caracteres alfabéticos')
        .isLength({ min: 1 })
        .withMessage('Los apellidos no pueden ser vacíos'),
    body('email')
        .exists()
        .withMessage('Correo es requerido')
        .isEmail()
        .withMessage('El correo no es valido')
        .normalizeEmail(),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('El Teléfono no es valido')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('La contraseña es requerida')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe de contener mínimo 8 caracteres')
        .isLength({ max: 12 })
        .withMessage('La contraseña puede contener máximo 10 caracteres'),
    body('confirm_pws')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Las contraseñas no coinciden'),
];

exports.updateUserSchema = [
    body('Name_user')
        .optional()
        .isAlpha()
        .withMessage('El nombre deben de contener caracteres alfabéticos'),
    body('apellidos')
        .optional()
        .isAlpha()
        .withMessage('Los apellidos deben de contener caracteres alfabéticos'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Correo invalido')
        .normalizeEmail(),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe ser de mínimo 8 caracteres')
        .isLength({ max: 12 })
        .withMessage('La contraseña tiene que tener máximo 12 caracteres')
        .custom((value, { req }) => !!req.body.confirm_pws)
        .withMessage('Confirma la contraseña por favor'),
    body('confirm_pws')
        .optional()
        .custom((value, { req }) => value === req.body.pws)
        .withMessage('confirm_password field must have the same value as the password field'),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('El Teléfono no es valido')
        .normalizeEmail(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Campos requeridos para actualización')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['Name_user', 'apellidos', 'email', 'phone', 'password', 'confirm_pws'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Campos inválidos o desconocidos para actualización')
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('El correo no debe ser vació')
        .isEmail()
        .withMessage('Correo invalido')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('La contraseña no puede ser vaciá')
        .notEmpty()
        .withMessage('La contraseña no puede ser vaciá')
];