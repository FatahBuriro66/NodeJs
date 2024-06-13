const cron = require('node-cron')

const dummyJOb = cron.schedule('*****', () => {
    console.log("Hi from Dummy JSON")
})

module.exports = { dummyJOb }