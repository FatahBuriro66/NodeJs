// controllr =>  

const createTodo = async (req, res) => {
    try {
        const { name, uid } = req.body
        const createTodoResponse = await createTodoCategory({ name, uid })
        return res.status(200).json({ success: true, message: 'success', data: createTodoResponse })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'somthing went wrong', data: null })
    }
}

const getTodoItem = async (req, res) => {
    try {
        const { todoId } = req.params

        const response = await getTodoCategoryById(todoId)
        return res.status(200).json({ success: true, message: 'success', data: response })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'somthing went wrong', data: null })
    }
}
const createTodoListItem = async (req, res) => {
    try {
        const { todoId } = req.params
        const { name } = req.body

        const response = await createTodoListItem({ items }) // {_id : 0i09090909}

        const getTodoCategory = await getTodoCategoryById(todoId)
        console.log(getTodoCategory)
        if (!getTodoCategory) return res.status(500).json({ success: false, message: `Category by ${todoId} not exist` })

        getTodoCategory.todoList.push(response.id)
        await getTodoCategory.save
        return res.status(200).json({ success: true, message: 'success', data: response })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'somthing went wrong', data: error })
    }
}

module.exports = {
    createTodo,
    getTodoItem,
    createTodoListItem
}