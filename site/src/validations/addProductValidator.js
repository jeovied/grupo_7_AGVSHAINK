const path = require("path");
const { check, body } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener minimo 5 caracteres'),

    check('price')
    .notEmpty().withMessage('Debes indicar el precio'),

    check('category')
    .notEmpty().withMessage('Debes Indicar una categoría'),

    check('genre')
    .notEmpty().withMessage('Debes Indicar un genero'),

    check('brand')
    .notEmpty().withMessage('Debes Indicar una marca'),

    check('description')
    .notEmpty().withMessage('Es preferible que incluyas una descripción del producto').bail()
    .isLength({ min:20 }).withMessage("La descripcion debe tener minimo 20 caracteres"),

    body("images")
    .custom((value, {req}) => {
        if (req.files.length != 0) {
            return true
        } else {
            return false
        }
    }).withMessage('Debes cargar imagenes del producto').bail()
    .custom((value, {req}) => {
        let files = req.files.map(file => path.extname(file.filename).toUpperCase())
        let error = true
        files.forEach(file => {
            if (file == ".JPG" ||file == ".JPEG" || file == ".PNG" || file == ".GIF"){
                null
            }else{
                error = false
            }
        });
        return error
    }).withMessage('Solo se pueden cargar archivos JPG, JPEG, PNG, GIF')
]