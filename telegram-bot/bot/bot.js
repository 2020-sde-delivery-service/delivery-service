const dotenv = require('dotenv');
const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

dotenv.config();

const deliveryWizard = require('./deliveryWizard');
const pickupConfirmWizard = require('./pickupConfirmWizard');
const deliveryConfirmWizard = require('./deliveryConfirmWizard');
const trip = require('./trip');
const becomeShipperWizard = require('./becomeShipperWizard');
const status = require('./status');

//const pickupWizard = require('./tripWizard');

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([deliveryWizard, pickupConfirmWizard, deliveryConfirmWizard, becomeShipperWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    //database.saveUserChat(ctx.from.id, ctx.chat.id);
    return ctx.reply('Welcome, type /help to see the commands list!', Markup
        .keyboard(['/newdelivery', '/status'])
        .resize()
    );
});

bot.command('help', (ctx) => {
    return ctx.reply('Commands list: \n/start\n/help\n/newdelivery\n/status\n/pickup\n/deliver\n/trip\n/becomeshipper\n/usermode\n/shippermode')
});

bot.command('newdelivery', (ctx) => { ctx.scene.enter('super-wizard') });
bot.command('pickup', (ctx) => ctx.scene.enter('pickup-wizard'));
bot.command('deliver', (ctx) => ctx.scene.enter('delivery-wizard'));
bot.command('trip', trip);
bot.command('becomeshipper', (ctx) => ctx.scene.enter('shipper-wizard'));
bot.command('status', status);

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