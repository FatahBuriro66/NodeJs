const mongoose = require('mongoose');
const { generateOTP } = require('../utils/randomString.util');
const { sendEmail } = require('../services/mail.service');

const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

UserSchema.pre('save', function (next) {
    console.log("Schema", this);
    if (this.otp) {
        this.otp = generateOTP()
        const payload = sendEmail({
            to: this.email,
            subject: "your OTP ",
            text: `your OTP is ${this.otp} `
        }).then(res => console.log(`Success sending email to ${this.email}`))
            .catch(err => console.log(`Error sending to email ${this.email}`))
    }

    next()
})

const UserModel = mongoose.model('User', UserSchema)
// User => users

module.exports = UserModel




