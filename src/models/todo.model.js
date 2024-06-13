const mongoose = require('mongoose')

const { Schema } = mongoose

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: 'User'
    }
}, { timestamps: true })

const TodoModel = mongoose.model('Todo', TodoSchema)

//User  = users // Default Nature

model.exports = {
    TodoModel
}