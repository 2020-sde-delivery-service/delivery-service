const axios = require('axios');
let dotenv = require('dotenv');

dotenv.config();

module.exports = {
    getOne: async (req, res) => {
        const id = req.params.id;

        try {
            const resp = await axios.get('https://url', {
                params: {
                    id: id
                }
            });
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    getSingularDistance: async (req, res) => {
        const origin = req.query.origin;
        const destination = req.query.destination;

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
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    getMatrix: async (req, res) => {
        const origins = req.query.origins;
        const destinations = req.query.destinations;

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
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    }
}