const path = require('path');
const fs = require("fs");
const db = require("../database/models");

module.exports = {
    index : (req,res) => {
        /* return res.render("index", { products }); */
        db.Products.findAll({include: [{association: "images"}]})
        .then(products => res.render('./index', {products}))
        .catch(error => res.send(error))
    },

    admin: (req,res) => {

        db.Products.findAll({
            include: [
                {association: "categories"},
                {association: "images"} 
            ]
        })
            .then(products => res.render("admin", { products }))
            .catch(error => res.send(error))
    }
}