const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { findByEmail, createUser, saveToken, getTokenByUID, deleteTokensByUID, updateUserByEmail } = require('../services/user.service.js');
const { createHash, compareHash } = require('../utils/hash.util.js');
const { config } = require('../Configs/server.config.js');
// const { generateOTP } = require('../utils/randomString.util.js');
// const { sendEmail } = require('../services/mail.service.js');


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await findByEmail(email)
        if (!user) return res.status(500).json({ success: false, message: 'invalid cruds', data: null })

        if (user.isActive) return res.send(500).json({ succes: false, message: "invalid curds", data: null })

        const isAlreadyLoggedin = await getTokenByUID(user.id)
        if (isAlreadyLoggedin.length > 0) return res.status(500).json({ success: false, message: 'User Already Logged in', data: null })

        const passwordMatch = await compareHash(password, user.password)
        if (!passwordMatch) return res.status(500).json({ success: false, message: 'invalid cruds', data: null })

        const token = jwt.sign({ email: user.email, username: user.username }, config.secretKey, { expiresIn: '1h' })
        const generateToken = await saveToken({ token, user: user.id })

        return res.status(200).json({ success: true, message: 'Success', data: { token: generateToken.token } })
    } catch (error) {
        res.send("Something went wrong")
    }
}
const signup = async (req, res) => {
    try {
        const errors = validationResult(req)
        console.log(errors);
        if (!errors.isEmpty()) return res.status(500).json({
            succes: false,
            data: errors.array(),
            message: "validation error"
        })

        const { username, email, password } = req.body

        const user = await findByEmail(email)
        if (user) {
            return res.send("Email already exists")
        }

        const hashedPassword = await createHash(password)

        const payload = {
            username,
            email,
            password: hashedPassword,
        }
        const newUser = await createUser(payload)

        if (!newUser) {
            return res.send('Something went wrong')
        }

        return res.send("success")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await findByEmail(email)

        if (!user) return res.send('unprocessable request')

        if (user.otp !== otp) return res.send('Invalid otp')

        const response = await updateUserByEmail(user.email)

        return res.send('OTP verified')
    } catch (error) {
        return res.send("Something went wrong")
    }
}

const logout = async (req, res) => {
    try {
        const { uid } = req.body
        const logoutUser = await deleteTokensByUID(uid)
        if (logoutUser.deletedCount === 0) {
            return res.status(500).json({ success: false, message: 'already logged in', data: null })
        }

        return res.status(200).json({ success: true, message: 'succesfully logged out', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong', data: null })
    }
}



module.exports = {
    login,
    signup,
    logout,
    verifyOtp
}