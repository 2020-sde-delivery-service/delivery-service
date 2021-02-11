const { Composer, Markup, Scenes } = require('telegraf');

const strings = require('../../constant/strings');
const helpers = require('../helpers');

const start = async (ctx) => {

    const loginData = {
        userId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name
    }

    let ok = await helpers.start(loginData);

    if (ok) {
        return ctx.reply('Welcome, type /help to see the commands list!', Markup
            .keyboard(['/newdelivery', '/status'])
            .resize()
        );
    } else {
        return ctx.reply(strings.ERROR_MESSAGE);
    }
};

module.exports = start;