// controllr =>  

const createTodo = async (req, res) => {
    try {
        const { name, uid } = req.body
        return res.send("Hello From From TOdo Controller")
    } catch (error) {
        return res.send("Something went wrong")
    }
}
module.exports = {
    createTodo
}