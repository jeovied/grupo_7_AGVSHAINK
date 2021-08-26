var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const {productsList, detail, cart, add, edit, destroy,save, update} = require('../controllers/productsController');

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


router.get('/', productsList)
router.get('/detail/:id', detail);
router.get('/cart', cart);

router.get('/add', add);
router.post('/add',upload.array('images'), save);

router.get('/edit/:id', edit);
router.put('/edit/:id', update)

router.delete('/:id', destroy);


module.exports = router;