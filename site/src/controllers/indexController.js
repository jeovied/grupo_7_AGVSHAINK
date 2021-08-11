const path = require('path');
const fs = require("fs");

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8"));

module.exports = {
    index : (req,res) => {
        return res.render(path.join(__dirname, '..', 'views', 'index'));
    },

    admin: (req,res) => {
        return res.render("admin", {products});
    }
}