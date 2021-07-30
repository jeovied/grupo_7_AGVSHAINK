var express = require('express');
var router = express.Router();
const {detail, cart,add,edit} = require('../controllers/productsController');

router.get('/detail', detail);
router.get('/cart', cart);
router.get('/add', add);
router.get('/edit', edit);

module.exports = router;