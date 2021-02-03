const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const CANCEL_BUTTON = '❌ Cancel'
const ACCEPT_BUTTON = '✅ Accept'
const CANCEL_MESSAGE = '❌ Operation canceled'
const ACCEPT_MESSAGE = '✅ Pickup confirmed'
const SHIPMENT_MESSAGE = '📦 Shipments'
const CONFIRM_MESSAGE = '📦 Confirm pickup for shipment'

const RECAP_MESSAGE = (shipment) => '🆔 Shipment: ' + shipment.shipment + '\n📍 Pickup address: ' + shipment.pickup + ',\n📍 Destination address: ' + shipment.delivery + '\n☎️ Phone number: ' + shipment.phone + "\n"

const step1Handler = new Composer();
const step2Handler = new Composer();

const getShipments = require('./helpers').getShipments;

step1Handler.action(/Shipment \[(.+)\]/i, async (ctx) => {
    selected = ctx.match[1].charCodeAt(0) - 97;
    await ctx.editMessageText(message);
    ctx.reply(CONFIRM_MESSAGE + "\n\n" + RECAP_MESSAGE(shipments[selected]),
        Markup.inlineKeyboard([
            Markup.button.callback(ACCEPT_BUTTON, 'accept'),
            Markup.button.callback(CANCEL_BUTTON, 'reject')
        ]));
    return ctx.wizard.next();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(message);
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(message);
    ctx.reply(CANCEL_MESSAGE)
    return await ctx.scene.leave();
});

step2Handler.action('accept', async (ctx) => {
    //send pickup
    await ctx.editMessageText(CONFIRM_MESSAGE + "\n\n" + RECAP_MESSAGE(shipments[selected]));
    ctx.reply(ACCEPT_MESSAGE);
    return await ctx.scene.leave();
});
step2Handler.command('accept', async (ctx) => {
    //send pickup
    await ctx.editMessageText(CONFIRM_MESSAGE + "\n\n" + RECAP_MESSAGE(shipments[selected]));
    ctx.reply(ACCEPT_MESSAGE);
    return await ctx.scene.leave();
});
step2Handler.action('reject', async (ctx) => {
    await ctx.editMessageText(CONFIRM_MESSAGE + "\n\n" + RECAP_MESSAGE(shipments[selected]));
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step2Handler.command('reject', async (ctx) => {
    await ctx.editMessageText(CONFIRM_MESSAGE + "\n\n" + RECAP_MESSAGE(shipments[selected]));
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});

const pickupConfirmWizard = new Scenes.WizardScene(
    'pickup-wizard',
    step1Handler,
    step2Handler
);

let selected = 0;
let message = '';
let shipments = [];

pickupConfirmWizard.enter(async (ctx) => {
    shipments = await getShipments();
    message = SHIPMENT_MESSAGE + "\n\n";
    let buttons = [];
    let line = [];
    let n = 0;
    let chr = String.fromCharCode(97 + n);
    shipments.forEach(e => {
        message += "Shipment [" + chr + "]\n" + RECAP_MESSAGE(e) + "\n";
        line.push(Markup.button.callback("Shipment [" + chr + "]", "Shipment [" + chr + "]"));
        n += 1;
        if (n % 3 == 0) {
            buttons.push(line);
            line = [];
        }
        chr = String.fromCharCode(97 + n);
    });
    buttons.push(line);
    buttons.push([Markup.button.callback(CANCEL_BUTTON, 'cancel')]);

    ctx.reply(
        message,
        Markup.inlineKeyboard(buttons)
    );
});

module.exports = pickupConfirmWizard;