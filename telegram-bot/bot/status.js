const strings = require('../constant/strings');

const getShipmentsStatus = require('./helpers').getShipmentsStatus;

const status = async (ctx) => {
    let trip = await getShipmentsStatus();
    let message = strings.S_SHIPMENT_MESSAGE + "\n\n";
    trip.forEach(e => {
        message += strings.S_RECAP_MESSAGE(e) + "\n\n";
    });

    ctx.reply(
        message
    );
};

module.exports = status;