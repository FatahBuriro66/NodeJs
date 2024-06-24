require('dotenv').config()

const config = {
    appPort: process.env.SERVER_APP_PORT,
    dbUri: process.env.MONGO_URI,
    secretKey: process.env.SECRET_KEY,
    gmailPassKey: process.env.GMAIL_PASS_KEY,
    userGmailKey: process.env.GMAIL_USER_KEY,
}

module.exports = {
    config
}