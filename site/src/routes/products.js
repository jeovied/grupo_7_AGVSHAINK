var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const {productsList, genreAll, genreCategory, brands, detail, cart, cartAdd, cartDelete, cartEnd, add, edit, destroy,save, update, search} = require('../controllers/productsController');

const addProductsValidator = require('../validations/addProductValidator');
const updateProductsValidator = require("../validations/updatePoductValidator");
const adminCheck = require("../middlewares/adminCheck");
const userCheck = require("../middlewares/userCheck");


/* subida de archivos */
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/img')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})


router.get('/', productsList);
router.get("/:genre/all", genreAll);
router.get("/:genre/category/:id", genreCategory);
router.get("/brand/:id", brands);
router.get('/detail/:id', detail);

router.get('/cart', userCheck, cart);
router.post("/cart/add/:id", userCheck, cartAdd);
router.post("/cart/end", cartEnd);
router.delete("/cart/:id", cartDelete);

router.get('/add', adminCheck, add);
router.post('/add', upload.array('images'),addProductsValidator, save);

router.get('/edit/:id', adminCheck, edit);
router.put('/edit/:id', upload.array('images'), updateProductsValidator, update)

router.delete('/:id', destroy);
router.get('/search',search);


module.exports = router;