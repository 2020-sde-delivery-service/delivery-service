const axios = require('axios');

const headers = {
    "Content-Type": "application/json"
}

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
        const id = req.body.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if (!id) {
            return res.status(400).send();
        }

        let userLogin;
        try {
            // SEARCH USER WITH chatId
            const resp = await axios.get(process.env.DATA_SERVICE_URL + '/userLogins/' + id);
            userLogin = resp.data;
        } catch (error) {
            //console.log(error);
        }

        if (!userLogin) {
            //SAVE USER
            try {
                const partyRes = await axios.post(process.env.DATA_SERVICE_URL + '/parties', headers);
                party = partyRes.data;
                await axios.post(process.env.DATA_SERVICE_URL + '/persons', {
                    partyId: party.partyId,
                    firstName: firstName,
                    lastName: lastName
                }, headers);
                const userLoginResp = await axios.post(process.env.DATA_SERVICE_URL + '/userLogins', {
                    userLoginId: id,
                    partyId: party.partyId
                }, headers);
                userLogin = userLoginResp.data;
            } catch (error) {
                console.log(error);
                res.status(500).send({ error });
            }
        }
        res.send(userLogin);
    },
    setShipper: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send();
        }

        let userLogin;

        try {
            // SEARCH USER WITH chatId
            const userResponse = await axios.get(process.env.DATA_SERVICE_URL + '/userLogins/' + id);
            userLogin = userResponse.data;
        } catch (error) {
            return res.status(404).send();
            //console.log(error);
        }

        try {
            const shipperResponse = await axios.post(process.env.DATA_SERVICE_URL + '/shippers', {
                shipperId: userLogin.partyId,
                currentLocation: "none"
            }, headers);
            res.send({ isShipper: true });
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

        let userLogin;

        try {
            // SEARCH USER WITH chatId
            const userResponse = await axios.get(process.env.DATA_SERVICE_URL + '/userLogins/' + id);
            userLogin = userResponse.data;
        } catch (error) {
            return res.status(404).send();
            //console.log(error);
        }

        try {
            await axios.get(process.env.DATA_SERVICE_URL + '/shippers/' + userLogin.partyId);
            res.send({ isShipper: true });
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