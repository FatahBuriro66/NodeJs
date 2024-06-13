const mongoose = require('mongoose')
const UserModel = require('./user.model')
const TokenModel = require('./token.model')
const todoModel = require('./todo.model')

const db = {}
db.mongoose = mongoose;
db.user = UserModel;
db.token = TokenModel;
db.todo = todoModel;


module.exports = db
