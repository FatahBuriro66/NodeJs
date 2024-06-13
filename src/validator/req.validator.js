const { body, query } = require('express-validator')

const signupRouteValidator = [
    body('username'),
    body('email').trim().isEmail().withMessage('Invalid Message'),
    body('password').trim()
]

module.exports = {
    signupRouteValidator
}