const axios = require('axios');
let dotenv = require('dotenv');

dotenv.config();

module.exports = {
    /*
    getOne: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send();
        }

        try {
            const resp = await axios.get('https://url', {
                params: {
                    id: id
                }
            });
            //console.log(resp.data);
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
    */
    getSingularDistance: async (req, res) => {
        const origin = req.query.origin;
        const destination = req.query.destination;

        if (!(origin && destination)) {
            return res.status(400).send();
        }

        try {
            const resp = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: process.env.GOOGLE_KEY
                }
            });

            const mydata = {
                distance: resp.data.rows[0].elements[0].distance.value,
                duration: resp.data.rows[0].elements[0].duration.value
            }

            res.send(mydata);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    getMatrix: async (req, res) => {
        const origins = req.query.origins;
        const destinations = req.query.destinations;

        if (!(origins && destinations)) {
            return res.status(400).send();
        }

        try {
            const resp = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                    origins: origins,
                    destinations: destinations,
                    key: process.env.GOOGLE_KEY
                }
            });

            const mydata = {
                rows: resp.data.rows
            }

            res.send(mydata);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    getCoordinates: async (req, res) => {
        const address = req.query.address;

        if (!address) {
            return res.status(400).send();
        }

        try {
            const resp = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: address,
                    key: process.env.GOOGLE_KEY
                }
            });

            const mydata = {
                address: resp.data.results[0].formatted_address,
                location: resp.data.results[0].geometry.location
            }

            res.send(mydata);
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