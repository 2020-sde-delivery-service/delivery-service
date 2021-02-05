const axios = require('axios');

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
            console.error(err);
        }

        return address;
    },
    getShipments: async (shipperId) => {
        /*
        get shipments of the shipper
        try {
            const resp = await axios.get('http://google-maps-adapter:8080/maps/v1/geocode', {
                params: {
                    address: address
                }
            });
    
            address = resp.data.address;
        } catch (err) {
            console.error(err);
        }
    */

        let shipping = [
            { shipment: "id_54735", pickup: "Trento, via Brennero 10", delivery: "Trento, via Brennero 70", phone: "1551651189" },
            { shipment: "id_58558", pickup: "New York", delivery: "Chicago", phone: "6515515189556" },
            { shipment: "id_22255", pickup: "Los Angeles", delivery: "Mexico City", phone: "756961166516" },
            { shipment: "id_22125", pickup: "Los Angeles", delivery: "Nanno", phone: "2827827278028" },
            { shipment: "id_11505", pickup: "Trento", delivery: "Mexico City", phone: "693652536026" },
            { shipment: "id_54935", pickup: "Los Angeles", delivery: "Los Angeles", phone: "25727052757527" },
            { shipment: "id_54784", pickup: "Trento, via Brennero 40", delivery: "Trento, via Brennero 100", phone: "525260227227" }
        ];

        return shipping;
    },
    getTrip: async (shipperId) => {
        /*
        get trip of the shipper
        try {
            const resp = await axios.get('http://google-maps-adapter:8080/maps/v1/geocode', {
                params: {
                    address: address
                }
            });
    
            address = resp.data.address;
        } catch (err) {
            console.error(err);
        }
    */

        let trip = [
            { address: "Trento, via Brennero 10", action: "Pickup", shipment: "id_54735" },
            { address: "Trento, via Brennero 40", action: "Pickup", shipment: "id_54784" },
            { address: "Trento, via Brennero 70", action: "Delivery", shipment: "id_54735" },
            { address: "Trento, via Brennero 100", action: "Delivery", shipment: "id_54784" },
        ];

        return trip;
    },
    getShipmentsStatus: async (userId) => {
        /*
        get trip of the shipper
        try {
            const resp = await axios.get('http://google-maps-adapter:8080/maps/v1/geocode', {
                params: {
                    address: address
                }
            });
    
            address = resp.data.address;
        } catch (err) {
            console.error(err);
        }
    */

        let shipments = [
            { shipment: "id_54735", pickup: "Trento, via Brennero 10", delivery: "Trento, via Brennero 70", phone: "1551651189", status: "delivered" },
            { shipment: "id_58558", pickup: "New York", delivery: "Chicago", phone: "6515515189556", status: "delivered" },
            { shipment: "id_22255", pickup: "Los Angeles", delivery: "Mexico City", phone: "756961166516", status: "delivered" },
            { shipment: "id_22125", pickup: "Los Angeles", delivery: "Nanno", phone: "2827827278028", status: "delivered" },
            { shipment: "id_11505", pickup: "Trento", delivery: "Mexico City", phone: "693652536026", status: "delivering" },
            { shipment: "id_54935", pickup: "Los Angeles", delivery: "Los Angeles", phone: "25727052757527", status: "delivering" },
            { shipment: "id_54784", pickup: "Trento, via Brennero 40", delivery: "Trento, via Brennero 100", phone: "525260227227", status: "working" }
        ];

        return shipments;
    },
    createDeliveryRequest: async (delivery) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.SHIPMENT_SERVICE_URL + '/users/v1/' + chatId + '/login', delivery);
            ok = resp.data.id ? true : false;
        } catch (err) {
            console.error(err);
        }

        return ok;
    },
    checkShipper: async (chatId) => {
        let ok = false;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/users/v1/' + chatId + '/shipper');
            ok = resp.data.isShipper;
        } catch (err) {
            console.error(err);
        }

        return ok;
    },
    setShipper: async (chatId) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.USER_SERVICE_URL + '/users/v1/' + chatId + '/shipper');
            ok = resp.data.isShipper;
        } catch (err) {
            console.error(err);
        }

        return ok;
    },
    acceptShipment: async (deliveryRequestId) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.SHIPMENT_SERVICE_URL + '/shipment/v1/shipper' + deliveryRequestId);
            ok = resp.data.isShipper;
        } catch (err) {
            console.error(err);
        }

        return ok;
    },
    start: async (chatId, name) => {
        let ok = false;
        try {
            const resp = await axios.post(process.env.USER_SERVICE_URL + '/users/v1/' + chatId + '/login',
                {
                    name: name
                }
            );
            ok = resp.data.id ? true : false;
        } catch (err) {
            console.error(err);
        }

        return ok;
    },
}