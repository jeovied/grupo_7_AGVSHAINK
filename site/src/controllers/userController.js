const path = require('path');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const db = require('../database/models');
const { response } = require('express');

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
        let errors = validationResult(req);
        const {name,last_name,email,password,number} = req.body;

        if (!errors.isEmpty()) {
            return res.render("./users/register", { errors: errors.array(), old: req.body})
        } else {
            db.Users.create({
                name : name,
                last_name : last_name,
                email : email,
                password : bcrypt.hashSync(password,10),
                number : number,
                image : 'default-avatar.png',
                rol : "user"
            }).then(user => {
                req.session.userLog = {
                    id : user.id,
                    name : user.name,
                    last_name : user.last_name,
                    email : user.email,
                    number : user.number,
                    image : user.image,
                    rol : user.rol
                }
                return res.redirect('/')
            }).catch(error => console.log(error))
            
        }
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        const {email,remenber} = req.body;

        if (errors.isEmpty()) {
            db.Users.findOne({
                where : {
                    email
                }
            }).then( user => {
                req.session.userLog = {
                    id : user.id,
                    name : user.name,
                    rol : user.rol,
                    image : user.image
                }
                remenber && res.cookie("remenber", user, { maxAge: 600000 })
                return res.redirect('/')
            })

            }else{
                return res.render("./users/login", { errores : errors.mapped()})
            }
    },
    logout : (req,res) => {
        req.session.destroy()
        res.clearCookie("remenber")

        return res.redirect("/")
    },
    profile : (req,res) => {

        db.Users.findByPk(req.session.userLog.id)
        .then(user => res.render('./users/profile',{
            user
        })).catch(error => console.log(error))

    },
    profileEdit : (req,res) => {     
        db.Users.findByPk(req.session.userLog.id)
        .then(user => res.render('./users/edit',{
            user
        })).catch(error => console.log(error))
    },
    update : (req,res) => {

        const {name, last_name, email, password, newPassword, number} = req.body;

        db.Users.update(
            {
                name : name,
                last_name : last_name,
                email : email,
                password : bcrypt.hashSync(newPassword, 10),
                number : number,
                image : req.file && req.file.filename,
            },
            {
                where : {
                    id : req.params.id
                }
            }).then( response => {
                console.log(response)
                return res.redirect('/users/profile')
            }).catch(error => console.log(error))

    },
    destroy: (req,res) => {

        db.Users.destroy({
            where : {
                id : req.params.id
            }
        }).then( response => {
            console.log(response)
            req.session.destroy()
        res.clearCookie("remenber")
        return res.redirect('/')
        }).catch(error => console.log(error))
    }
}
    
    
    
    
    
    
