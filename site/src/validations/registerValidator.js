const { check, body} = require("express-validator");
const db = require('../database/models');

module.exports = [
    check("name")
    .notEmpty().withMessage("Debes ingresar un nombre").bail()
    .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener minimo 2 caracteres").bail()
    .isAlpha().withMessage("El nombre solo puede contener letras"),

    check("last_name")
    .notEmpty().withMessage("Debes ingresar un apellido").bail()
    .isLength({ min: 2, max: 30 }).withMessage("El apellido debe tener minimo 2 caracteres").bail()
    .isAlpha().withMessage("El apellido solo puede contener letras"),

    check("email")
    .notEmpty().withMessage("Debes ingresar un email").bail()
    .isEmail().withMessage("Debes ingresar un email valido"),

    body('email')
    .custom(value => {
        console.log(value)
        return db.Users.findOne({
            where : {
                email : value
            }
        }).then(user => {
            if(user){
                return Promise.reject('El email ya está registrado')
            }
        })
    }),

    check("password")
    .isLength({ min: 8, max: 15 }).withMessage("La contraseña debe tener entre 8 y 15 caracteres"),

    check("number")
    .isMobilePhone().withMessage("Debe ingresar un telefono valido")
];
