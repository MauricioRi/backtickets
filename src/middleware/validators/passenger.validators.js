const { body } = require('express-validator');


exports.createPassengerSchema = [
    body('id_subroute')
        .exists()
        .withMessage('La ciudad es requerida')
        .isNumeric()
        .withMessage('La ciudad debe ser un número de identificación'),
    body('date_travel')
        .exists()
        .withMessage('El nombre de la ruta es obligatorio')
        .isEmpty()
        .withMessage('El nombre de la ruta no es valido'),
    body('number_pasager')
        .exists()
        .withMessage('La descripción es necesaria')
        .isEmpty()
        .withMessage('La descripción no puede ser vació')
];

exports.updatePassengerSchema = [
    body('id_subroute')
        .optional()
        .isAlpha()
        .withMessage('El nombre deben de contener caracteres alfabéticos'),
    body('date_travel')
        .optional()
        .isAlpha()
        .withMessage('Los apellidos deben de contener caracteres alfabéticos'),
    body('number_pasager')
        .optional()
        .isEmail()
        .withMessage('Correo invalido')
        .normalizeEmail(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Campos requeridos para actualización')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id_subroute', 'number_pasager', 'date_travel'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Campos inválidos o desconocidos para actualización')
];
