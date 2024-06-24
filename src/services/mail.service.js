const { config } = require('../configs/server.config.js')
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: config.userGmailKey,
        pass: config.gmailPassKey
    }
})

const sendEmail = async (data) => {
    try {
        const response = await transporter.sendMail({
            from: config.userGmailKey,
            ...data
        })

        return response
    } catch (error) {
        throw error
    }
}


module.exports = {
    sendEmail
}