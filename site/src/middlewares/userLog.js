module.exports = (req,res,next) => {
    res.locals.isLogged = false

    if (req.session.userLog) {
        res.locals.isLogged = true
        res.locals.userLog = req.session.userLog
    }

    next()
}