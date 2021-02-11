const dotenv = require('dotenv');
const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

dotenv.config();

const deliveryWizard = require('./deliveryWizard');
//const pickupConfirmWizard = require('./pickupConfirmWizard');
//const deliveryConfirmWizard = require('./deliveryConfirmWizard');
const trip = require('./trip');
const becomeShipperWizard = require('./becomeShipperWizard');
const acceptDeliveryWizard = require('./acceptDeliveryWizard');
const status = require('./status');
const info = require('./info');
const processWizard = require('./processWizard');
const { checkShipper, acceptShipment, setPosition } = require('./helpers');
const strings = require('../constant/strings');
const helpers = require('./helpers');

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([deliveryWizard, /*pickupConfirmWizard, deliveryConfirmWizard, */becomeShipperWizard, acceptDeliveryWizard, processWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {

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
});

bot.command('help', (ctx) => {
    return ctx.reply('Commands list: \n/start\n/help\n/newdelivery\n/status\n/trip\n/info\n/becomeshipper\n/usermode\n/shippermode')
});
bot.command('newdelivery', (ctx) => { ctx.scene.enter('super-wizard') });
bot.command('pickup', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        ctx.scene.enter('pickup-wizard');
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});
bot.command('deliver', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        ctx.scene.enter('delivery-wizard');
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});
bot.command('trip', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        trip(ctx);
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});
bot.command('becomeshipper', (ctx) => ctx.scene.enter('shipper-wizard'));
bot.command('status', status);
bot.command('info', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        info(ctx);
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});
/*
bot.hears(/\/acceptDelivery(.+)/, async (ctx) => {
    ctx.session.deliveryId = ctx.match[1];
    let isShipper = await checkShipper(ctx.chat.id);
    if (isShipper) {
        ctx.scene.enter('accept-wizard');
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});
*/
bot.action(/acceptDelivery(.+)/, async (ctx) => {

    ctx.session.deliveryId = ctx.match[1];
    let isShipper = await checkShipper(ctx.chat.id);
    if (isShipper) {
        ctx.scene.enter('accept-wizard');
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});

bot.action(/rejectDelivery(.+)/, async (ctx) => {
    await ctx.editMessageText(ctx.update.callback_query.message.text);
    ctx.reply(strings.CANCEL_MESSAGE);
});

/*
bot.hears(/\/rejectDelivery(.+)/, async (ctx) => {
    let deliveryId = ctx.match[1];
    let isShipper = await checkShipper(ctx.chat.id);
    if (isShipper) {
        //would be better but should pass through delivery service
        //let ok = await acceptShipment(deliveryId, false);
        ctx.reply(strings.BC_REJECT_MESSAGE);
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});
*/

bot.hears(/\/process(.+)/, async (ctx) => {
    ctx.session.pointId = ctx.match[1].replace(/_/g, '-');
    let isShipper = await checkShipper(ctx.chat.id);
    if (isShipper) {
        ctx.scene.enter('process-wizard');
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
});


bot.on('location', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        setPosition(ctx.chat.id, ctx.message.location);
    }
});
bot.on('edited_message', async (ctx) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        if (ctx.editedMessage.location) {
            setPosition(ctx.chat.id, ctx.editedMessage.location);
        }
    }
});
bot.command('usermode', (ctx) =>
    ctx.reply('User mode set', Markup
        .keyboard(['/newdelivery', '/status'])
        .resize()
    )
)

bot.command('shippermode', (ctx) =>
    ctx.reply('Shipper mode set', Markup
        .keyboard(['/trip', '/info'])
        .resize()
    )
)

module.exports = bot;