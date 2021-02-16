const axios = require('axios');
const { CUSTOMER, SHIPPER } = require('../constants/rolesStrings');

const headers = {
    "Content-Type": "application/json"
}

module.exports = {
    login: async (req, res) => {

        console.log("login -start");

        const userId = req.body.userId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if (!userId) {
            return res.status(400).send();
        }

        let party;
        try {
            // SEARCH USER WITH chatId
            const resp = await axios.get(process.env.DATA_SERVICE_URL + '/parties/search/findByUserId', {
                params: {
                    userId: userId
                }
            });
            party = resp.data;
        } catch (error) {
            //console.error(error);
        }

        if (!party) {
            //SAVE USER
            try {
                const partyRes = await axios.post(process.env.DATA_SERVICE_URL + '/parties', {
                    userId: userId
                }, headers);
                party = partyRes.data;
                await axios.post(process.env.DATA_SERVICE_URL + '/persons', {
                    partyId: party.partyId,
                    firstName: firstName,
                    lastName: lastName
                }, headers);
                await axios.post(process.env.DATA_SERVICE_URL + '/partySecurityGroups', {
                    partyId: party.partyId,
                    groupId: CUSTOMER
                }, headers);
                await axios.post(process.env.DATA_SERVICE_URL + '/customers', {
                    customerId: party.partyId,
                    currentLocation: "null"
                }, headers);
            } catch (error) {
                if (error.response) {
                    res.status(error.response.status).send({ error });
                } else {
                    res.status(500).send({ error });
                }
                //console.error(error);
            }
        }
        res.send(party);
    },
    setShipper: async (req, res) => {

        console.log("set-shipper -start");

        const partyId = req.params.partyId;

        try {
            await axios.post(process.env.DATA_SERVICE_URL + '/partySecurityGroups', {
                partyId: partyId,
                groupId: SHIPPER
            }, headers);
            await axios.post(process.env.DATA_SERVICE_URL + '/shippers', {
                shipperId: partyId,
                currentLocation: "null"
            }, headers);
            res.send({ isShipper: true });
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    checkShipper: async (req, res) => {

        console.log("check-shipper -start");

        const partyId = req.params.partyId;

        try {
            await axios.get(process.env.DATA_SERVICE_URL + '/partySecurityGroups/search/findByPartyIdAndGroupId', {
                params: {
                    partyId: partyId,
                    groupId: SHIPPER
                }
            });
            res.send({ isShipper: true });
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    getByUserId: async (req, res) => {

        console.log("get-user-by-id -start");

        const userId = req.params.userId;

        try {
            const resp = await axios.get(process.env.DATA_SERVICE_URL + '/parties/search/findByUserId', {
                params: {
                    userId: userId
                }
            });
            res.send(resp.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    getOne: async (req, res) => {

        console.log("get-one -start");

        const partyId = req.params.partyId;

        try {
            const resp = await axios.get(process.env.DATA_SERVICE_URL + '/parties/' + partyId);
            res.send(resp.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    setLocation: async (req, res) => {

        console.log("set-location -start");

        const partyId = req.params.partyId;
        const data = req.body;

        if (!data.currentLocation) {
            return res.status(400).send();
        }

        data.partyId = partyId;

        try {
            const resp = await axios.post(process.env.LOCATION_SERVICE_URL + '/peoples', data, headers);
            res.send(resp.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    }
}