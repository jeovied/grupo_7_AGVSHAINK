const path = require('path');

module.exports = {
    login : (req,res) => {
        return res.render(path.join(__dirname, '..', 'views', 'users', 'login'));
    },
    register : (req,res) => {
        return res.render(path.join(__dirname, '..', 'views', 'users', 'register'));
    }
}