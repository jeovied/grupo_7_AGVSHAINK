var express = require('express');
var router = express.Router();
var {login, register} = require('../controllers/userController');


/* GET users listing. */
router.get('/login', login);
router.get('/register', register);

module.exports = router;
