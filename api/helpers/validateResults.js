const { validationResult } = require("express-validator")



const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(400).json({ ok: false, errors: error.array() })
    }
}

module.exports = {
    validateResult
}