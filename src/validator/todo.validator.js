const { body, query } = require('express-validator')

const createToDORouteValidator = [
    body('name').isLength({
        min: 5,
        max: 15
    })
        .withMessage('Name must be between 5 and 15 characters long'),
    body('color'),
    body('date').trim(),
    body('desc').trim()
]

const getTodoItemsValidator = [
    query('name').isEmpty
]


module.exports = {
    createToDORouteValidator
}