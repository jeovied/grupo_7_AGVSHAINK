const path = require('path');
const fs = require("fs");

const productsPath = path.join(__dirname, "../data/products.json")
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const categories = require('../data/categories_db');

module.exports = {
    productsList: (req,res) =>{
        return res.render('./products/products', {products})
    },

    detail : (req,res) => {
        
        let product = products.find(product => product.id === +req.params.id);

        return res.render('./products/productDetail', { product, products});
    },

    cart : (req,res) => {
        return res.render('./products/productCart');
    },

    add : (req,res) => {
        return res.render('./products/productAdd', {categories});
    },

    edit : (req,res) => {

        let product = products.find(producto => producto.id === +req.params.id)

        return res.render('./products/productEdit', {product, categories}); 
    },

    destroy: (req,res) => {

        let destroy = products.filter(product => product.id !== +req.params.id)

        fs.writeFileSync(productsPath, JSON.stringify(destroy, null, 2), "utf-8")

        return res.redirect("/admin")
    },
    save : (req,res) => {
        const {id,name, price, cod, category, color, talle,images} = req.body;

        if(req.files){{
            var imagenes = req.files.map(imagen => imagen.filename)
        }
        let producto = {
            id : products[products.length - 1].id + 1, 
            name, 
            price : +price, 
            cod : +cod, 
            category, 
            color, 
            talle, 
            images : req.files.length != 0 ? imagenes : ['default-image.png']
        }
        products.push(producto)

        fs.writeFileSync(path.join(__dirname,'..', 'data', 'products.json'), JSON.stringify(products,null,2),'utf-8')

        return res.redirect('/')
    }else{
        return res.redirect('productAdd')
    }
    
    },
    update : (req,res) => {
        const {id,name, price, cod, category, color, talle,image1,image2,image3} = req.body;

        let producto = products.find(producto => producto.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            name,
            price : +price,
            cod: +cod,
            category,
            color,
            talle,
            image : req.file ? req.file.filename : producto.image,
            
        }

        let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)

        guardar(productosModificados)
        res.redirect('/')
          
    }
}