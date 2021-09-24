var express = require('express');
var router = express.Router();
var path = require("path");
var multer = require("multer");
var registerValidate = require("../validations/registerValidator");
var { login, register , processRegister, processLogin, logout, profile, profileEdit, update, destroy } = require('../controllers/userController');
var viewCheck = require('../middlewares/viewCheck');
const userCheck = require("../middlewares/userCheck");
const loginValidator = require('../validations/loginValidator');

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
router.get('/login', viewCheck, login);
router.post("/login", loginValidator,processLogin);
router.get('/register', viewCheck, register);
router.post("/register", upload.single("image"), registerValidate, processRegister);
router.get("/logout", logout);
router.get('/profile', userCheck, profile);
router.get('/edit',userCheck, profileEdit);
router.put('/edit/:id', upload.single('image'), update);
router.delete('/:id', destroy);




module.exports = router;
