const SHIPMENT_MESSAGE = '📦 Shipments'
const RECAP_MESSAGE = (shipment) => '🆔 Shipment: ' + shipment.shipment + '\n📍 Pickup address: ' + shipment.pickup + '\n📍 Destination address: ' + shipment.delivery + '\n☎️ Phone number: ' + shipment.phone + '\nℹ️ Status: ' + shipment.status + '\n'

const getShipmentsStatus = require('./helpers').getShipmentsStatus;

const status = async (ctx) => {
    let trip = await getShipmentsStatus();
    let message = SHIPMENT_MESSAGE + "\n\n";
    trip.forEach(e => {
        message += RECAP_MESSAGE(e) + "\n\n";
    });

    ctx.reply(
        message
    );
};

module.exports = status;