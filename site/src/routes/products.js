var express = require('express');
var router = express.Router();
const {detail, cart} = require('../controllers/productsController');

router.get('/detail', detail);
router.get('/cart', cart);

module.exports = router;