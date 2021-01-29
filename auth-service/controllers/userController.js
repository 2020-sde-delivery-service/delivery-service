const userModel = require('../models/userModel');

module.exports = {
    create: async (req, res) => {
        try {
            // create user with (req.body);
            res.status(201).send()
        } catch (e) {
            res.status(400).send(e)
        }
    },
    getMe: async (req, res) => {
        res.send(req.user)
    },
    login: async (req, res) => {
        try {
            const user = {}; // search user with req.body.email, req.body.password
            if (user) {
                const token = await user.newAuthToken()
                console.log(user, token)
                res.send({ user, token })
            }
            else {
                return res.status(404).send()
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ error })
        }
    }
}