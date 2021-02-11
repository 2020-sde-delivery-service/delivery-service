const strings = require('../../constant/strings');
const getInfo = require('../helpers').getInfo;

const info = async (ctx) => {
    let info = await getInfo(ctx.chat.id);
    let message = strings.INFO_MESSAGE + '\n\n' + strings.INFO_NAME + ctx.from.first_name + '\n'
        + strings.INFO_NUMBER + info.numberOfTrips + '\n' + strings.INFO_POINTS + parseInt(info.deliveryPoints);

    ctx.reply(
        message
    );
};

module.exports = info;