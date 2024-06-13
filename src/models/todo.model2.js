const mongoose = require('mongoose')

const { Schema } = mongoose

const TodoSchema2 = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
}, { timestamps: true })

const TodoModel2 = mongoose.model('TodoApp', TodoSchema2)

//User  = users // Default Nature

model.exports = {
    TodoModel2
}