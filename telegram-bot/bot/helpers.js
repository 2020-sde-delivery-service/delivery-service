const axios = require('axios');

module.exports = {
    getCorrectAddress: async (address) => {
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

        return address;
    },
    getShipments: async (shipper) => {
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
    getTrip: async (shipper) => {
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
    getShipmentsStatus: async (user) => {
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
    }
}