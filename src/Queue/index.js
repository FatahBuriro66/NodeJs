const Queue = require('bull')
const redisConfig = require('../Configs/redis.config.js')
const { sendEmail } = require('../services/mail.service.js')

const mailQueue = new Queue('email queue', {
    redis: { ...redisConfig }
})

// 1,2,3,4,5,6,7,8,9,10
mailQueue.process((payload, done) => {
    const { data } = payload
    sendEmail(data)
        .then(res => {
            done()
        })
        .catch(err => {
            done(new Error('Error processing send =ing emails'))
            console.log(eoor)
        })
})