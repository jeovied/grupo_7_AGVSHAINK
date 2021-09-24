const path = require('path');
const fs = require("fs");
const db = require("../database/models");

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8"));

module.exports = {
    index : (req,res) => {
        return res.render("index", { products });
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