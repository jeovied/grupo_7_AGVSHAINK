const path = require('path');
const fs = require("fs");
const db = require('../database/models');

const {validationResult} = require('express-validator');
const {Op} = require('sequelize');

module.exports = {
    productsList: (req,res) =>{

        db.Products.findAll({include:[{association:'images'}]})
        .then(products => res.render('./products/products', { products, title: "Todos Los Productos" }))
        .catch(error => res.send(error))
    },

    genreAll: (req,res) => {
        db.Products.findAll({
            where: {genre: req.params.genre},
            include:[{association:'images'}]
        })
            .then(products => res.render("./products/products", { products, title: `Todos Los Productos de ${req.params.genre  == "femenino" ? "Mujer" : "Hombre"}` }))
            .catch(error => res.send(error))
    },

    genreCategory: (req,res) => {
        
        let products = db.Products.findAll({where: { genre: req.params.genre, category_id: req.params.id }, include:[{association:'images'}]})

        let category = db.Categories.findByPk(req.params.id)

        Promise.all([products, category])
            .then(([products, category]) => res.render("./products/products", { products, title: `${category.name} de ${req.params.genre  == "femenino" ? "Mujer" : "Hombre"}` }))
            .catch(error => res.send(error))
    },

    brands: (req,res) => {
         
        let products = db.Products.findAll({ where: {brand_id: req.params.id}, include:[{association:'images'}]})

        let brand = db.Brands.findByPk(req.params.id)
        
        Promise.all([products, brand])
            .then(([products, brand]) => res.render("./products/products", { products, title: `Todos Los Productos de ${brand.name}` }))
            .catch(error => res.send(error))
    },

    detail : (req,res) => {
        
        db.Products.findByPk(req.params.id, {include:[{association: 'images'}, {association: 'sizes'}]})        
            .then(product => {
                
                db.Products.findAll({ where: { genre: product.genre }, include:[{association: 'images'}]})
                    .then(products => res.render('./products/productDetail', {product, products}))
                                
            })
            .catch(error => res.send(error))

    },

    cart : (req,res) => {

        let carts = db.Carts.findAll({where: {user_id: req.session.userLog.id }})

        let Allproducts = db.Products.findAll({ include:[{association:'images'}]})

        Promise.all([carts, Allproducts])
            .then(([carts, Allproducts]) => {
                let products = []

                carts.forEach(cart => {
                    Allproducts.forEach(product => {
                        product.id == cart.product_id && products.push(Object.assign({product},{amount: cart.amount})) 
                    });
                });

                return res.render("./products/productCart", {products, total: products.map(product => product.product.price * product.amount)})
            })
            .catch(e => console.log(e))
    },

    cartAdd: (req,res) => {

        db.Carts.findAll({where: {user_id: req.session.userLog.id}})
            .then(carts => {
                
                return carts.filter(cart => cart.product_id == req.params.id)
                
            }) 
            .then(cart => {
                if (cart.length != 0) {
                    let amount = parseInt(cart[0].amount) + parseInt(req.body.amount)
                    let duplicado = cart[0].id
                    
                    db.Carts.destroy({where: {id: duplicado}})
                            .then(() => {
                                db.Carts.create(
                                    {
                                        amount: amount,
                                        user_id: req.session.userLog.id,
                                        product_id: req.params.id
                                    }
                                )
                                    .then(() => res.redirect('/products/cart'))
                                    .catch(e => console.log(e))
                            })
                            .catch(e => console.log(e))
                } else {
                    db.Carts.create(
                        {
                            amount: req.body.amount,
                            user_id: req.session.userLog.id,
                            product_id: req.params.id
                        }
                    )
                        .then(() => res.redirect('/products/cart'))
                        .catch(e => console.log(e))
                }
            })
            .catch(e => console.log(e))
    },

    cartDelete: (req,res) => {
        db.Carts.destroy(
            {
                where: {
                    user_id: req.session.userLog.id,
                    product_id: req.params.id
                }
            }
        )
            .then(() => res.redirect('/products/cart'))
            .catch(e => console.log(e))
    },

    cartEnd: (req,res) => {
        db.Carts.destroy(
            {
                where: {user_id: req.session.userLog.id}
            }
        )
            .then(() => res.redirect("/"))
            .catch(e => console.log(e))
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
                    let images = []
                    let imagenes = req.files.map(imagen => imagen.filename)

                    imagenes.forEach(image => {
                        var img = {
                            file: image,
                            product_id: product.id
                        }
                        images.push(img)
                    })

                    db.Images.bulkCreate(images, {validate: true})
                        .then( response => {
                            
                            let talles = []
                            let sizes = typeof req.body.size === "string" ? [req.body.size] : req.body.size
                            
                            if (req.body.size) {
                                (sizes).forEach(size => {
                                    var talle = {
                                        product_id: response[0].product_id,
                                        size_id: size
                                    }
                                    talles.push(talle)
                                })

                                db.Product_size.bulkCreate(talles, {validate: true})
                                    .then(() => res.redirect("/admin"))
                                    .catch(error => res.send(error))
                            }else{
                                return res.redirect("/admin")
                            }

                        })
                        .catch(error => res.send(error))
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
                            let sizes = typeof req.body.size === "string" ? [req.body.size] : req.body.size

                            if (req.body.size) {
                                (sizes).forEach(size => {
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
                            [Op.substring] : req.query.keywords.trim()
                        }
                    },
                    {
                        description : {
                            [Op.substring] : req.query.keywords.trim()
                        }
                    }
                ]
            },
            include:[{association: 'images'}]
        })
        .then(products => {
            if (req.query.keywords != "") {
                res.render('./products/products',{
                    products,
                    title : `Resultado de ${req.query.keywords.toLowerCase().trim()}`
                })
            } else {
                res.render('./products/products',{
                    products: [],
                    title : `Resultado de ${req.query.keywords.toLowerCase().trim()}`
                })
            }
        })
        .catch(error => console.log(error))

    }

}
