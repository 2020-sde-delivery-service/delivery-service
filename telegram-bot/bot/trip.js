const TRIP_MESSAGE = '🗺️ Trip'
const RECAP_MESSAGE = (entry) => '📍 Address: ' + entry.address + '\n📦 Action: ' + entry.action + '\n🆔 Shipment: ' + entry.shipment + "\n"

const getTrip = require('./helpers').getTrip;

const trip = async (ctx) => {
    let trip = await getTrip();
    let message = TRIP_MESSAGE + "\n\n";
    trip.forEach(e => {
        message += RECAP_MESSAGE(e) + "\n\n";
    });

    ctx.reply(
        message
    );
};

module.exports = trip;