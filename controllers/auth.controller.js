const User = require("../models/User.model")

const bcrypt = require('bcryptjs')

const saltRounds = 10

const jwt = require('jsonwebtoken')

const signup = (req, res, next) => {

    const { email, password } = req.body

    User
        .create({ email, password })
        .then((createdUser) => {
            const { email, _id } = createdUser
            const user = { email, _id }

            res.status(201).json({ user })
        })
        .catch(err => next(err))
}

const login = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Write your email and password"] })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessages: ["User not found"] })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email } = foundUser

                const payload = { _id, email }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ errorMessages: ["Authentication failed"] })
            }

        })
        .catch(err => next(err))
}

const verify = (req, res, next) => {

    res.status(200).json(req.payload)
}

module.exports = {
    signup,
    login,
    verify
}