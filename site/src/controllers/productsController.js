const path = require('path');
const fs = require("fs");
const db = require('../database/models');

const productsPath = path.join(__dirname, "../data/products.json")
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const categories = require('../data/categories_db');
const {validationResult} = require('express-validator');

module.exports = {
    productsList: (req,res) =>{

        db.Products.findAll({include:[{association:'images'}]})
        .then(products => res.render('./products/products', { products }))
        .catch(error => res.send(error))
    },

    detail : (req,res) => {
        
        let productPromise = db.Products.findByPk(req.params.id, {include:[{association: 'images'}, {association: 'sizes'}]})
        
        let allProductsPromise = db.Products.findAll({include:[{association: 'images'}]})
        
        Promise.all([productPromise, allProductsPromise])
        .then(([product, products]) => res.render('./products/productDetail', {product, products}))
        .catch(error => res.send(error))

    },

    cart : (req,res) => {
        return res.render('./products/productCart');
    },

    add : (req,res) => {

        let categories = db.Categories.findAll()
        let sizes = db.Sizes.findAll()
        let brands = db.Brands.findAll()

        Promise.all([categories, sizes, brands])
            .then(([categories, sizes, brands]) => res.render('./products/productAdd', { categories, sizes, brands }))
            .catch(error => res.send(error))
    },

    edit : (req,res) => {

        let categories = db.Categories.findAll()
        let sizes = db.Sizes.findAll()
        let brands = db.Brands.findAll()
        let product = db.Products.findByPk(req.params.id, {
            include:[
                {association: 'brands'}, 
                {association: 'sizes'},
                {association: 'categories'}
            ]
        })

        Promise.all([product, categories, sizes, brands])
            .then(([product, categories, sizes, brands]) => res.render("./products/productEdit", {product, categories, sizes, brands}))
            .catch(error => res.send(error))
    },

    destroy: (req,res) => {

            db.Products.destroy({
                where : {
                    id : req.params.id
                }
            })
            .then( () => res.redirect('/admin'))
            .catch(error => res.send(error))

        /* let destroy = products.filter(product => product.id !== +req.params.id)

        fs.writeFileSync(productsPath, JSON.stringify(destroy, null, 2), "utf-8")

        return res.redirect("/admin") */
    },
    save : (req,res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()){
        
            db.Products.create({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                genre: req.body.genre,
                category_id: req.body.category,
                brand_id: req.body.brand
            })
                .then(product => {
                    let imagenes = req.files.map(imagen => imagen.filename)
                    imagenes.forEach(image => {
                        db.Images.create({
                            file: image,
                            product_id: product.id
                        })
                    })
    
                    if (req.body.size) {
                        (req.body.size).forEach(size => {
                            db.Product_size.create({
                                product_id: product.id,
                                size_id: size
                            })
                        })
                    }
                    
                    return res.redirect("/admin")
                })
                .catch(error => res.send(error))
        }else{

            let categories = db.Categories.findAll()
            let sizes = db.Sizes.findAll()
            let brands = db.Brands.findAll()

        Promise.all([categories, sizes, brands])
            .then(([categories, sizes, brands]) => res.render('./products/productAdd', { categories, sizes, brands, errores : errors.mapped(),
                old : req.body }))
            .catch(error => res.send(error))}

        /* let errors = validationResult(req);
        if(errors.isEmpty()){
            const {name, price, category, talle, description, images } = req.body;

            var imagenes = req.files.map(imagen => imagen.filename)
        
            let producto = {
            id: products[products.length - 1].id + 1, 
            name, 
            price: +price, 
            category, 
            talle: typeof talle === "string" ? [talle] : talle,
            description: [description], 
            images: req.files.length != 0 ? imagenes : ['default-image.png']
            }
            products.push(producto)

            fs.writeFileSync(productsPath, JSON.stringify(products,null,2),'utf-8')
            
            return res.redirect('/admin')
        } else{
            return res.render('./products/productAdd', 
            {   categories, 
                errores : errors.mapped(),
                old : req.body});
        } */
    },
     update : (req,res) => {

        db.Products.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            genre: req.body.genre,
            category_id: req.body.category,
            brand_id: req.body.brand
        },
        {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                if (req.files.length != 0) {
                    
                    db.Images.destroy({
                        where: {product_id: req.params.id}
                    })
                        .then(() => {
                            let imagenes = req.files.map(imagen => imagen.filename)
                            imagenes.forEach(image => {
                                db.Images.create({
                                    file: image,
                                    product_id: req.params.id
                                })
                            })
                        })
                }

                db.Product_size.destroy({
                    where: {product_id : req.params.id}
                })
                    .then(() => {
                        if (req.body.size) {
                            (req.body.size).forEach(size => {
                                db.Product_size.create({
                                    product_id: req.params.id,
                                    size_id: size
                                })
                            })
                        }
                        return res.redirect("/admin")
                    })
            })
            .catch(error => res.send(error))

        /* const {name, price, category, description, talle, images} = req.body;

        var imagenes = req.files.map(imagen => imagen.filename)
        
        products.forEach(product => {
			if (product.id === +req.params.id) {
				product.name = name
				product.price = +price
				product.category = category
                if (talle) {
                   product.talle = typeof talle === "string" ? [talle] : talle
                } else {
                    product.talle = []
                }
				product.description = [description]
                req.files.length != 0 ? product.images = imagenes : null
			}
		})

        fs.writeFileSync(productsPath, JSON.stringify(products,null,2),'utf-8');

         return res.render('./products/products', {products}) */
    },
    find : (req, res) => {

        db.Products.findByPk(req.params.id, {include:[{association:'images'}]})

        .then(products => res.render('./products/products', { products }))

        .catch(error => res.send(error))

    }
}
