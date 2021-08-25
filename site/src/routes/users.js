var express = require('express');
var router = express.Router();
var path = require("path");
var multer = require("multer");
var registerValidate = require("../validations/registerValidator");
var { login, register , processRegister, processLogin } = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "public/img/users")
    },
    filename: (req,file,cb) =>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });


/* GET users listing. */
router.get('/login', login);
router.post("/login", processLogin);
router.get('/register', register);
router.post("/register", upload.single("avatar"), registerValidate, processRegister);

module.exports = router;
