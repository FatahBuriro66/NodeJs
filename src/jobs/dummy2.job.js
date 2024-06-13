const cron = require('node-cron')

const dummyJOb2 = cron.schedule('*****', () => {
    console.log("Hi from Dummy JSON")
})

module.exports = {
    dummyJOb2
}