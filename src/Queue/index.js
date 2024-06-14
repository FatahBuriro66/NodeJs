const Queue = require('bull')
const redisConfig = require('../Configs/redis.config.js')

const mailQueue = new Queue('email queue', {
    redis: { ...redisConfig }
})

// 1,2,3,4,5,6,7,8,9,10
mailQueue.process((payload, done) => {
    console.log('Payload', payload)
    console.log('Queue is Pro');
    setTimeout(() => {
        console.log("Queue is finshed");
        done();
    }, 1000);
})