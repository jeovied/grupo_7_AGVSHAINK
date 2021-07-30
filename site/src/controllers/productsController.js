const path = require('path');

module.exports = {
    detail : (req,res) => {
        return res.render(path.join(__dirname, '..', 'views', 'products', 'productDetail'));
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