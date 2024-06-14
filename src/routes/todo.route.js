const express = require('express')
const { createTodo, getTodoItem , createTodoListItem} = require('../controllers/todo.controller')
const { checkAuth } = require('../middlewares/check-auth.middleware')

const route = express.Router()


route.post('/create-todo', createTodo)
route.get('/get-todo-item/:todoId', getTodoItem)
route.post('/list-item/:todoId/create', createTodoListItem)

module.exports = { route } 

// class assignment
// todo name 15 characters ,no speical ch   aracter , min 5 - 15char
// desc 15 char max length  50 char max length 
// color in hexa (#000) starting #
// end date  => greater than today   