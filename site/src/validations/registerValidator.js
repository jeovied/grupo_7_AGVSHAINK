const { check, body} = require("express-validator");
const db = require('../database/models');
const path = require("path");

module.exports = [
    check("name")
    .notEmpty().withMessage("Debes ingresar un nombre").bail()
    .isLength({ min: 2 }).withMessage("El nombre debe tener minimo 2 caracteres"),

    check("last_name")
    .notEmpty().withMessage("Debes ingresar un apellido").bail()
    .isLength({ min: 2 }).withMessage("El apellido debe tener minimo 2 caracteres"),

    check("email")
    .notEmpty().withMessage("Debes ingresar un email").bail()
    .isEmail().withMessage("Debes ingresar un email valido"),

    body('email')
    .custom(value => {
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
    .notEmpty().withMessage("Debes ingresar una contraseña").bail()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener minimo 8 caracteres"),

    check("number")
    .isMobilePhone().withMessage("Debe ingresar un telefono valido"),

    body("image")
    .custom((value, {req}) => {
        
        if(req.file){
            let file = path.extname(req.file.filename).toUpperCase()
            
            if (file == ".JPG" || file == ".JPEG" || file == ".PNG" || file == ".GIF"){
                return true
            }else{
                return false
            }
        }
    }).withMessage('Solo se pueden cargar archivos JPG, JPEG, PNG, GIF')
];
