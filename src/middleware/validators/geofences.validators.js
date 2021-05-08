const { body } = require('express-validator');


exports.createGeofenceSchema = [
    body('name')
    .exists()
    .withMessage('El nombre es requerido')
    .isLength({ min: 1 })
    .withMessage('El nombre no puede ser vació'),
    body('description')
    .exists()
    .withMessage('La descripción es obligatoria'),
    body('centro_latitude')
    .exists()
    .withMessage('Las coordenadas deven existir')
    .isNumeric()
    .withMessage('Las coordenadas deben ser numericas'),
    body('centro_longitude')
    .exists()
    .withMessage('Las coordenadas deven existir')
    .isNumeric()
    .withMessage('Las coordenadas deben ser numericas'),
    body('radio')
    .exists()
    .withMessage('El radio no puede ser vacio')
    .isNumeric()
    .withMessage('El radio debe ser numericos'),
];

exports.updateGeofenceSchema = [
    body('name')
    .optional()
    .isAlpha()
    .withMessage('El nombre deben de contener caracteres alfabéticos'),
    body('description')
    .optional()
    .isAlpha()
    .withMessage('Los apellidos deben de contener caracteres alfabéticos'),
    body('area')
    .optional()
    .isEmail()
    .withMessage('Correo invalido')
    .normalizeEmail(),
    body('attributes')
    .optional()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe ser de mínimo 8 caracteres')
    .isLength({ max: 12 })
    .withMessage('La contraseña tiene que tener máximo 12 caracteres')
    .custom((value, { req }) => !!req.body.confirm_pws)
    .withMessage('Confirma la contraseña por favor'),
    body()
    .custom(value => {
        return !!Object.keys(value).length;
    })
    .withMessage('Campos requeridos para actualización')
    .custom(value => {
        const updates = Object.keys(value);
        const allowUpdates = ['Name_user', 'apellidos', 'attributes'];
        return updates.every(update => allowUpdates.includes(update));
    })
    .withMessage('Campos inválidos o desconocidos para actualización')
];