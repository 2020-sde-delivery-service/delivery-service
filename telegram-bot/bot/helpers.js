const axios = require('axios');
const statusStrings = require('../constant/statusStrings');
const headers = {
    "Content-Type": "application/json"
}

const getPartyId = async (userId) => {
    const resp = await axios.get(process.env.USER_SERVICE_URL + '/api/v1/users/by-user-id/' + userId);
    return resp.data.partyId;
};

module.exports = {
    getCorrectAddress: async (address) => {
        try {
            const resp = await axios.get(process.env.GOOGLEMAP_SERVICE_URL + '/api/v1/geocode', {
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
    getTrip: async (userId) => {

        try {
            const partyId = await getPartyId(userId);

            const tripResp = await axios.get(process.env.STATUS_SERVICE_URL + '/api/v1/status/trip/by-shipper/' + partyId);

            return tripResp.data.points.filter(p => p.statusId == statusStrings.POINT_ASSIGNED);

        } catch (err) {
            //console.error(err);
            return [];
        }
    },
    getShipmentsStatus: async (userId) => {

        try {
            const partyId = await getPartyId(userId);

            const resp = await axios.get(process.env.SHIPMENT_SERVICE_URL + '/api/v1/shipments/by-user/' + partyId);
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
    checkShipper: async (userId) => {

        let ok = false;
        try {
            const partyId = await getPartyId(userId);

            const resp = await axios.get(process.env.USER_SERVICE_URL + '/api/v1/users/' + partyId + '/shipper');
            ok = resp.data.isShipper;

        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    setUserToShipper: async (userId) => {

        let ok = false;
        try {
            const partyId = await getPartyId(userId);

            const resp = await axios.post(process.env.USER_SERVICE_URL + '/api/v1/users/' + partyId + '/shipper');
            ok = resp.data.isShipper;

        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    acceptShipment: async (deliveryRequestId) => {

        let ok = false;
        try {
            const data = { "statusId": statusStrings.DELIVERY_STATUS_ACCEPTED }
            const resp = await axios.post(process.env.SHIPMENT_SERVICE_URL + '/api/v1/shipments/' + deliveryRequestId + '/status', data, headers);
            ok = resp.data.deliveryRequestId;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    processPoint: async (pointId) => {

        let ok = false;
        try {
            await axios.post(process.env.STATUS_SERVICE_URL + '/api/v1/status/point/' + pointId, headers);
            ok = true;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    start: async (loginData) => {

        let ok = false;
        try {
            const resp = await axios.post(process.env.USER_SERVICE_URL + '/api/v1/users/login', loginData);
            ok = resp.data.userId ? true : false;
        } catch (err) {
            //console.error(err);
        }

        return ok;
    },
    getCustomerId: async (userId) => {

        let partyId;
        try {
            partyId = await getPartyId(userId);
        } catch (err) {
            //console.error(err);
        }

        return partyId;
    },
    setPosition: async (userId, location) => {

        let partyId;
        try {
            partyId = await getPartyId(userId);
        } catch (err) {
            //console.error(err);
            return;
        }

        let data = {
            "currentLocation": {
                "point": {
                    "x": location.longitude,
                    "y": location.latitude
                }
            }
        }

        try {
            await axios.post(process.env.USER_SERVICE_URL + '/api/v1/users/' + partyId + '/location', data, headers);
        } catch (err) {
            //console.error(err);
        }
    },
    getInfo: async (userId) => {

        try {
            const partyId = await getPartyId(userId);

            const tripResp = await axios.get(process.env.TRIP_SERVICE_URL + '/trip-of-shipper-info/' + partyId);
            return tripResp.data;

        } catch (err) {
            //console.error(err);
            return {};
        }
    },

}