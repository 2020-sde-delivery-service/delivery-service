const axios = require('axios');
const statusStrings = require('../constant/statusStrings');
const headers = {
    "Content-Type": "application/json"
}

module.exports = {
    getCorrectAddress: async (address) => {
        try {
            const resp = await axios.get(process.env.GOOGLEMAP_SERVICE_URL + '/maps/v1/geocode', {
                params: {
                    address: address
                }
            });

            address = resp.data.address;
        } catch (err) {
            //console.error(err);
        }

        return address;
    },
    getTrip: async (shipperId) => {

        let id;
        try {
            const idResp = await axios.get(process.env.USER_SERVICE_URL + '/users/v1/byUserId/' + shipperId);
            id = idResp.data.partyId;

            const tripResp = await axios.get(process.env.STATUS_SERVICE_URL + '/status/v1/trip/' + id);

            return tripResp.data.points.filter(p => p.statusId == statusStrings.POINT_ASSIGNED);

        } catch (err) {
            //console.error(err);
            return [];
        }
    },
    getShipmentsStatus: async (userId) => {

        let id;
        try {
            const idResp = await axios.get(process.env.USER_SERVICE_URL + '/users/v1/byUserId/' + userId);
            id = idResp.data.partyId;

            const resp = await axios.get(process.env.SHIPMENT_SERVICE_URL + '/shipment/v1/deliveryRequest/ofuser/' + id);

            return resp.data;

        } catch (err) {
            //console.error(err);
            return [];
        }

    },
    createDeliveryRequest: async (delivery) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.DELIVERY_SERVICE_URL + '/create-delivery-request', delivery, headers);
            ok = resp.data.deliveryRequestId ? true : false;
        } catch (err) {
            //console.error(err);
        }


        return ok;
    },
    checkShipper: async (chatId) => {
        let ok = false;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/users/v1/' + chatId + '/shipper');
            ok = resp.data.isShipper;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    setUserToShipper: async (chatId) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.USER_SERVICE_URL + '/users/v1/' + chatId + '/shipper');
            ok = resp.data.isShipper;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    acceptShipment: async (deliveryRequestId) => {

        //should pass through delivery service

        let ok = false;
        try {
            const data = { "statusId": statusStrings.DELIVERY_STATUS_ACCEPTED }
            const resp = await axios.post(process.env.SHIPMENT_SERVICE_URL + '/shipment/v1/deliveryRequest/' + deliveryRequestId + '/status', data, headers);
            ok = resp.data.deliveryRequestId;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    processPoint: async (pointId) => {

        let ok = false;
        try {
            await axios.post(process.env.STATUS_SERVICE_URL + '/status/v1/point/' + pointId, headers);
            ok = true;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    start: async (loginData) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.USER_SERVICE_URL + '/users/v1/login', loginData);
            ok = resp.data.userId ? true : false;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    getCustomerId: async (chatId) => {
        let id;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/users/v1/byUserId/' + chatId);
            id = resp.data.partyId;
        } catch (err) {
            //console.error(err);
        }

        return id;
    },
    setPosition: async (chatId, location) => {

        let id;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/users/v1/byUserId/' + chatId);
            id = resp.data.partyId;
        } catch (err) {
            //console.error(err);
            return;
        }

        let data = {
            "partyId": id,
            "currentLocation": {
                "point": {
                    "x": location.longitude,
                    "y": location.latitude
                }
            }
        }

        try {
            await axios.post(process.env.LOCATION_SERVICE_URL + '/peoples', data, headers);
        } catch (err) {
            //console.error(err);
        }
    },

}