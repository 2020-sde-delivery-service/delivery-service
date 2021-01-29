const axios = require('axios');

module.exports = {
    getOne: async (req, res) => {
        const id = req.params.id

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
    }
}