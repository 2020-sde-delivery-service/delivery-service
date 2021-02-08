const strings = require('../constant/strings');

const getTrip = require('./helpers').getTrip;

const trip = async (ctx) => {
    let trip = await getTrip(ctx.chat.id);
    let message = strings.T_TRIP_MESSAGE + "\n\n";
    trip.forEach(e => {
        message += strings.T_RECAP_MESSAGE(e) + "\n\n";
    });

    ctx.reply(
        message
    );
};

module.exports = trip;