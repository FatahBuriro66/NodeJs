const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { config } = require('./src/Configs/server.config')
const { corsConfig } = require('./src/Configs/cors.config')
const { route: userRoute } = require('./src/routes/user.route.js')
const { route: todoRoute } = require('./src/routes/todo.route.js')
const {
    DB_RETRY_LIMIT,
    DB_RETRY_TIMEOUT
} = require('./src/constants/constants.js')
const cronManager = require('./src/jobs/inedx.js')

let connectionRetries = 0
async function connectToDB() {
    try {
        console.log("Establishing DB connection....")
        await mongoose.connect(config.dbUri)
        console.log("Db Connected");
    } catch (error) {
        if (connectionRetries < DB_RETRY_LIMIT) {
            connectionRetries++

            console.log(`Reconnecting to DB ${connnectionRetries}/${DB_RETRY_LIMIT}`)
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT))
            await connectToDB()
        } else {
            process.exit()
        }
    }
}


const PORT = config.appPort
const app = express()

    ; (async () => {
        try {
            await connectToDB()

            app.use(cors(corsConfig))
            app.use(express.json()) // to accept json in body

            // jobs todo in nodejs
            const job1 = cronManager.get('dummyJob')
            job1.start()


            app.use('/user', userRoute)
            app.use('/todo', todoRoute)



            app.get('*', (req, res) => {
                return res.send('Invalid route')
            })

            app.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`);
            })
        } catch (error) {
            console.error('Error', error)
        }
    })()

