const { check, body } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('price')
    .notEmpty().withMessage('Debes indicar el precio'),

    check('category')
    .notEmpty().withMessage('Debes Indicar una categoría'),

    check('genre')
    .notEmpty().withMessage('Debes Indicar un genero'),

    check('brand')
    .notEmpty().withMessage('Debes Indicar una marca'),

    check('description')
    .notEmpty().withMessage('Es preferible que incluyas una descripción del producto'),

    body("images")
    .custom((value, {req}) => {
        console.log(req.files.length)
        if (req.files.length != 0) {
            return true
        } else {
            return false
        }
    }).withMessage('Debes cargar imagenes del producto')
]