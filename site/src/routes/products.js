var express = require('express');
var router = express.Router();
const {productsList, detail, cart, add, edit, destroy} = require('../controllers/productsController');

router.get('/', productsList)
router.get('/detail/:id', detail);
router.get('/cart', cart);
router.get('/add', add);
router.get('/edit/:id', edit);
router.delete('/:id', destroy);

module.exports = router;