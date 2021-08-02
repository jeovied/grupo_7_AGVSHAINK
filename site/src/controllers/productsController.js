const path = require('path');
const fs = require("fs");

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8"));

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
        return res.render(path.join(__dirname,'..','views','products','productEdit'));
    }
}