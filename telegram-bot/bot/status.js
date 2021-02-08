const strings = require('../constant/strings');

const getShipmentsStatus = require('./helpers').getShipmentsStatus;

const status = async (ctx) => {
    let status = await getShipmentsStatus(ctx.chat.id);
    let message = strings.S_SHIPMENT_MESSAGE + "\n\n";
    status.forEach(e => {
        message += strings.S_RECAP_MESSAGE(e) + "\n\n";
    });

    ctx.reply(
        message
    );
};

module.exports = status;