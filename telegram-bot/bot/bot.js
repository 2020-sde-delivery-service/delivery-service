const dotenv = require('dotenv');
const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

dotenv.config();

const deliveryWizard = require('./deliveryWizard');
const pickupConfirmWizard = require('./pickupConfirmWizard');
const deliveryConfirmWizard = require('./deliveryConfirmWizard');
const trip = require('./trip');
const becomeShipperWizard = require('./becomeShipperWizard');
const status = require('./status');
const { checkShipper, acceptShipment } = require('./helpers');
const strings = require('../constant/strings');
const helpers = require('./helpers');
const { ERROR_MESSAGE, NOSHIPPER_MESSAGE } = require('../constant/strings');

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([deliveryWizard, pickupConfirmWizard, deliveryConfirmWizard, becomeShipperWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {

    const loginData = {
        id: ctx.from.id,
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
        return ctx.reply(ERROR_MESSAGE);
    }
});

bot.command('help', (ctx) => {
    return ctx.reply('Commands list: \n/start\n/help\n/newdelivery\n/status\n/pickup\n/deliver\n/trip\n/becomeshipper\n/usermode\n/shippermode')
});
bot.command('newdelivery', (ctx) => { ctx.scene.enter('super-wizard') });
bot.command('pickup', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        ctx.scene.enter('pickup-wizard');
    } else {
        ctx.reply(NOSHIPPER_MESSAGE);
    }
});
bot.command('deliver', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        ctx.scene.enter('delivery-wizard');
    } else {
        ctx.reply(NOSHIPPER_MESSAGE);
    }
});
bot.command('trip', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        trip(ctx);
    } else {
        ctx.reply(NOSHIPPER_MESSAGE);
    }
});
bot.command('becomeshipper', (ctx) => ctx.scene.enter('shipper-wizard'));
bot.command('status', status);

bot.hears(/\/acceptDelivery(.+)/, async (ctx) => {
    let deliveryId = ctx.match[1];
    let isShipper = await checkShipper(ctx.chat.id);
    if (isShipper) {
        let ok = await acceptShipment(deliveryId);
        if (ok) {
            ctx.reply(strings.BC_ACCEPT_MESSAGE);
        }
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
});

bot.hears(/\/rejectDelivery(.+)/, async (ctx) => {
    let deliveryId = ctx.match[1];
    let isShipper = await checkShipper(ctx.chat.id);
    if (isShipper) {
        //would be better but should pass through delivery service
        //let ok = await acceptShipment(deliveryId, false);
        ok = true;
        if (ok) {
            ctx.reply(strings.CANCEL_MESSAGE);
        }
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
});


bot.on('location', (ctx) => { console.log(ctx.message.location) });
bot.on('edited_message', (ctx) => { console.log(ctx.editedMessage.location) });

bot.command('usermode', (ctx) =>
    ctx.reply('User mode set', Markup
        .keyboard(['/newdelivery', '/status'])
        .resize()
    )
)

bot.command('shippermode', (ctx) =>
    ctx.reply('Shipper mode set', Markup
        .keyboard(['/trip', '/pickup', '/deliver'])
        .resize()
    )
)

module.exports = bot;