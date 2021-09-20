const path = require('path');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersPath = path.join(__dirname, "../data/users.json")
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))

module.exports = {
    login : (req,res) => {
        return res.render('./users/login');
    },
    register : (req,res) => {
        return res.render('./users/register');
    },
    processRegister : (req,res) => {
        let errors = validationResult(req)

        checkEmail = users.find(user => user.email === req.body.email)

        if (!errors.isEmpty()) {
            return res.render("./users/register", { errors: errors.array(), old: req.body})
        } else if (checkEmail){
            return res.render("./users/register", { errorEmail: {
                msg: "El email ya esta registrado"
            }, old: req.body
            })
        } else {
            let user = {
                id: +users.length + 1,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                number: +req.body.number,
                image: req.file ? req.file.filename : "default-avatar.jpg",
                category: "user",
            }
            users.push(user)

            fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(users, null, 2), "utf-8")

            return res.redirect("/users/login")
        }
    },
    processLogin : (req,res) => {
        let user = users.find(user => user.email === req.body.email)

        if (user) {
            let check = bcrypt.compareSync(req.body.password , user.password)
            
            if (check) {

                req.session.userLog = user

                req.body.remenber != undefined ? res.cookie("remenber", user, { maxAge: 600000 }) : null

                return res.redirect("/")
            }else{
                return res.render("./users/login", { errors : "Los datos ingresados son incorrectos" , old: req.body})
            }
        }

        return res.render("./users/login", { errors : "Los datos ingresados son incorrectos", old: req.body })
    },
    logout : (req,res) => {
        req.session.destroy()
        res.clearCookie("remenber")

        return res.redirect("/")
    },
    profile : (req,res) => {
        return res.render("./users/profile", { usuario : req.session.userLog })
    },
    profileEdit : (req,res) => {
        return res.render('./users/edit',{ usuario: req.session.userLog })     
    },
    update : (req,res) => {

        let user = req.session.userLog

        const {name, lastname, email, password, newPassword, number} = req.body;

        if (bcrypt.compareSync(password , user.password)) {
            users.forEach(usuario => {
                if (usuario.id === user.id) {
                    usuario.name = name
                    usuario.lastname = lastname
                    usuario.email = email
                    usuario.password = bcrypt.hashSync(newPassword, 10)
                    usuario.number = +number
                }
            })
            
            fs.writeFileSync(usersPath, JSON.stringify(users,null,2),'utf-8');

            req.session.destroy()
            res.clearCookie("remenber")

            return res.redirect('/users/login')

        }else{
            return res.render("./users/edit", { errors : "Contraseña incorrecta", usuario: req.session.userLog })
        }

    },
    destroy: (req,res) => {

        let destroy = users.filter(usuario => usuario.id !== +req.params.id)

        req.session.destroy()
        res.clearCookie("remenber")

        fs.writeFileSync(usersPath, JSON.stringify(destroy, null, 2), "utf-8")

        return res.redirect("/") 
        
    }
}
    
    
    
    
    
    
