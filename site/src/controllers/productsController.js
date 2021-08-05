const path = require('path');
const fs = require("fs");

const productsPath = path.join(__dirname, "../data/products.json")
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

module.exports = {
    detail : (req,res) => {
        
        let product = products.find(product => product.id === +req.params.id);

        return res.render(path.join(__dirname, '..', 'views', 'products', 'productDetail'), {product});
    },

    cart : (req,res) => {
        return res.render(path.join(__dirname, '..', 'views', 'products', 'productCart'));
    },

    add : (req,res) => {
        return res.render(path.join(__dirname,'..','views','products','productAdd'));
    },

    edit : (req,res) => {

        let product = products.find(producto => producto.id === +req.params.id)

        return res.render(path.join(__dirname,'..','views','products','productEdit'), {product});
    },

    destroy: (req,res) => {

        let destroy = products.filter(product => product.id !== +req.params.id)

        fs.writeFileSync(productsPath, JSON.stringify(destroy, null, 2), "utf-8")

        return res.redirect("/admin")
    }
}