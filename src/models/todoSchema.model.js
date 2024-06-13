const mongoose = require('mongoose')

const { Schema } = mongoose

const TodoSchemaItem = new Schema({
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const TodoModel = mongoose.model('TodoItem', TodoSchemaItem)

//User  = users // Default Nature

model.exports = {
    TodoModel
}