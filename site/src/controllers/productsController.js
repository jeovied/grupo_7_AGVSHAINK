const path = require('path');
const fs = require("fs");
const db = require('../database/models');

const productsPath = path.join(__dirname, "../data/products.json")
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const categories = require('../data/categories_db');
const {validationResult} = require('express-validator');
const {Op} = require('sequelize');

module.exports = {
    productsList: (req,res) =>{

        db.Products.findAll({include:[{association:'images'}]})
        .then(products => res.render('./products/products', { products }))
        .catch(error => res.send(error))
    },

    genreAll: (req,res) => {
        db.Products.findAll({
            where: {genre: req.params.genre},
            include:[{association:'images'}]
        })
            .then(products => res.render("./products/products", { products }))
            .catch(error => res.send(error))
    },

    genreCategory: (req,res) => {
        db.Products.findAll({
            where: {
                genre: req.params.genre,
                category_id: req.params.id
            },
            include:[{association:'images'}]
        })
            .then(products => res.render("./products/products", { products }))
            .catch(error => res.send(error))
    },

    brands: (req,res) => {
        db.Products.findAll({
            where: {brand_id: req.params.id},
            include:[{association:'images'}]
        })
            .then(products => res.render("./products/products", { products }))
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

    },
     update : (req,res) => {
        
        let errors = validationResult(req);
        if(errors.isEmpty()){

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
        }else{
            
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
                .then(([product, categories, sizes, brands]) => res.render("./products/productEdit", { product, categories, sizes, brands, errores : errors.mapped(), old : req.body }))
                .catch(error => res.send(error))
        }
    },
    search : (req,res) => {

        db.Products.findAll({
            where : {
                [Op.or] : [
                    {
                        name :  {
                            [Op.substring] : req.query.keywords
                        }
                    },
                    {
                        description : {
                            [Op.substring] : req.query.keywords
                        }
                    }
                ]
            }
        }).then(result => res.render('./products/productSearch',{
            result,
            busqueda : req.query.keywords
        })).catch(error => console.log(error))

    }

}
