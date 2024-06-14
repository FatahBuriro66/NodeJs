require('dotenv').config()

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.SECRET_PASS
}

module.exports = {
    redisConfig
}