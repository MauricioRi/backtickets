const { body } = require('express-validator');


exports.createRouteSchema = [
    body('id_city')
        .exists()
        .withMessage('La ciudad es requerida')
        .isNumeric()
        .withMessage('La ciudad debe ser un número de identificación'),
    body('Name_route')
        .exists()
        .withMessage('El nombre de la ruta es obligatorio')
        .isEmpty()
        .withMessage('El nombre de la ruta no es valido'),
    body('description')
        .exists()
        .withMessage('La descripción es necesaria')
        .isEmpty()
        .withMessage('La descripción no puede ser vació')
];

exports.updateRouteSchema = [
    body('Name_route')
        .optional()
        .isAlpha()
        .withMessage('El nombre deben de contener caracteres alfabéticos'),
    body('id_city')
        .optional()
        .isAlpha()
        .withMessage('Los apellidos deben de contener caracteres alfabéticos'),
    body('description')
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
            const allowUpdates = ['Name_route', 'id_city', 'description'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Campos inválidos o desconocidos para actualización')
];
