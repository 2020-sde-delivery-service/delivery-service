const axios = require('axios');

const newAuthToken = async function (user) {
    let signOptions = {
        expiresIn: "30d",
        algorithm: "RS256"
    };
    const token = jwt.sign({ _id: user.id.toString() }, process.env.PRIVATE_KEY, signOptions);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

module.exports = {
    /*
    create: async (req, res) => {
        try {
            // create user with (req.body);
            res.status(201).send();
        } catch (e) {
            res.status(400).send(e);
        }
    },
    getMe: async (req, res) => {
        res.send(req.user);
    },
    */
    login: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send();
        }

        try {
            let user = {};
            // SEARCH USER WITH chatId
            const resp = await axios.get(process.env.DATA_SERVICE_URL + '/users', {
                params: { id: id }
            });

            user = resp.data.user;

            if (!user) {
                //SAVE USER
                const resp = await axios.post(process.env.DATA_SERVICE_URL + '/users', {
                });

                res.send(resp.data.user);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    setShipper: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send();
        }

        try {
            const resp = await axios.post(process.env.DATA_SERVICE_URL + '/users', {
            });

            res.send({ isShipper: resp.data.user.isShipper });

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    checkShipper: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send();
        }

        try {
            const resp = await axios.get(process.env.DATA_SERVICE_URL + '/users', {
                params: { id: id }
            });

            res.send({ isShipper: resp.data.user.isShipper });

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
    /*
    login: async (req, res) => {
        try {
            const user = {}; // search user with chatId
            if (user) {
                const token = await newAuthToken(user);
                //console.log(user, token);
                res.send({ user, token });
            }
            else {
                return res.status(404).send();
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
    }
    */
}