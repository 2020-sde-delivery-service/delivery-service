const dotenv = require('dotenv');
const { Markup, Scenes, session, Telegraf } = require('telegraf');

dotenv.config();

const deliveryWizard = require('./wizards/deliveryWizard');
const becomeShipperWizard = require('./wizards/becomeShipperWizard');
const acceptDeliveryWizard = require('./wizards/acceptDeliveryWizard');
const processWizard = require('./wizards/processWizard');
const trip = require('./commands/trip');
const start = require('./commands/start');
const status = require('./commands/status');
const info = require('./commands/info');
const { checkShipper, setPosition } = require('./helpers');
const strings = require('../constant/strings');

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([deliveryWizard, becomeShipperWizard, acceptDeliveryWizard, processWizard]);

bot.use(session());
bot.use(stage.middleware());

const shipperMiddleware = async (ctx, next) => {
    let ok = await checkShipper(ctx.from.id);
    if (ok) {
        next();
    } else {
        ctx.reply(strings.NOSHIPPER_MESSAGE);
    }
}

//customer commands
bot.start((ctx) => start(ctx));
bot.command('help', (ctx) => {
    return ctx.reply('Commands list: \n/start\n/help\n/newdelivery\n/status\n/trip\n/info\n/becomeshipper\n/usermode\n/shippermode')
});
bot.command('newdelivery', (ctx) => ctx.scene.enter('super-wizard'));
bot.command('becomeshipper', (ctx) => ctx.scene.enter('shipper-wizard'));
bot.command('status', (ctx) => status(ctx));
bot.command('usermode', (ctx) =>
    ctx.reply('User mode set', Markup
        .keyboard(['/newdelivery', '/status'])
        .resize()
    )
);
bot.command('shippermode', (ctx) =>
    ctx.reply('Shipper mode set', Markup
        .keyboard(['/trip', '/info'])
        .resize()
    )
);

//shipper commands
bot.command('trip', shipperMiddleware, (ctx) => trip(ctx));
bot.command('info', shipperMiddleware, (ctx) => info(ctx));
bot.action(/acceptDelivery(.+)/, shipperMiddleware, (ctx) => {
    ctx.session.deliveryId = ctx.match[1];
    ctx.scene.enter('accept-wizard');
});
bot.action(/rejectDelivery(.+)/, shipperMiddleware, async (ctx) => {
    await ctx.editMessageText(ctx.update.callback_query.message.text);
    ctx.reply(strings.CANCEL_MESSAGE);
});
bot.hears(/\/process(.+)/, shipperMiddleware, async (ctx) => {
    ctx.session.pointId = ctx.match[1].replace(/_/g, '-');
    ctx.scene.enter('process-wizard');
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

module.exports = bot;