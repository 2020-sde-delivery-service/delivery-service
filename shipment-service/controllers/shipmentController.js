const axios = require('axios');
let dotenv = require('dotenv');
const DELIVERY_REQUEST_API="/delivery-request"
dotenv.config();

module.exports = {
    create: async (req, res) => {
        console.log(req.body);
        try {
            const resp = await axios.post(process.env.DATA_SERVICE_URL+DELIVERY_REQUEST_API, req.body);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        try {
            const resp = await axios.get(process.env.DATA_SERVICE_URL+DELIVERY_REQUEST_API+"/"+id, {
                
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
    assignShipper: async (req, res) => {
        const deliveryRequestId=req.params.deliveryRequestId;
        try {
            const resp = await axios.patch(process.env.DATA_SERVICE_URL+DELIVERY_REQUEST_API+"/"+deliveryRequestId, req.body);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    acceptRequest: async (req, res) => {
        // try {
        //     const resp = await axios.patch(process.env.DATA_SERVICE_URL+DELIVERY_REQUEST_API, req.body);
        //     console.log(resp.data);
        //     res.send(resp.data);
        // } catch (err) {
        //     console.error(err);
        //     res.status(500).send()
        // }
    },
}