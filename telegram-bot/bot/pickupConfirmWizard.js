/*
const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const strings = require('../constant/strings');

const step1Handler = new Composer();
const step2Handler = new Composer();

const getShipments = require('./helpers').getShipments;

step1Handler.action(/Shipment \[(.+)\]/i, async (ctx) => {
    selected = ctx.match[1].charCodeAt(0) - 97;
    await ctx.editMessageText(message);
    ctx.reply(strings.PCW_CONFIRM_MESSAGE + "\n\n" + strings.PCW_RECAP_MESSAGE(shipments[selected]),
        Markup.inlineKeyboard([
            Markup.button.callback(strings.ACCEPT_BUTTON, 'accept'),
            Markup.button.callback(strings.CANCEL_BUTTON, 'reject')
        ]));
    return ctx.wizard.next();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(message);
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(message);
    ctx.reply(strings.CANCEL_MESSAGE)
    return await ctx.scene.leave();
});

step2Handler.action('accept', async (ctx) => {
    //send pickup
    await ctx.editMessageText(strings.PCW_CONFIRM_MESSAGE + "\n\n" + strings.PCW_RECAP_MESSAGE(shipments[selected]));
    ctx.reply(strings.PCW_ACCEPT_MESSAGE);
    return await ctx.scene.leave();
});
step2Handler.command('accept', async (ctx) => {
    //send pickup
    await ctx.editMessageText(strings.PCW_CONFIRM_MESSAGE + "\n\n" + strings.PCW_RECAP_MESSAGE(shipments[selected]));
    ctx.reply(strings.PCW_ACCEPT_MESSAGE);
    return await ctx.scene.leave();
});
step2Handler.action('reject', async (ctx) => {
    await ctx.editMessageText(strings.PCW_CONFIRM_MESSAGE + "\n\n" + strings.PCW_RECAP_MESSAGE(shipments[selected]));
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step2Handler.command('reject', async (ctx) => {
    await ctx.editMessageText(strings.PCW_CONFIRM_MESSAGE + "\n\n" + strings.PCW_RECAP_MESSAGE(shipments[selected]));
    ctx.reply(strings.CANCEL_MESSAGE);
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
    message = strings.PCW_SHIPMENT_MESSAGE + "\n\n";
    let buttons = [];
    let line = [];
    let n = 0;
    let chr = String.fromCharCode(97 + n);
    shipments.forEach(e => {
        message += "Shipment [" + chr + "]\n" + strings.PCW_RECAP_MESSAGE(e) + "\n";
        line.push(Markup.button.callback("Shipment [" + chr + "]", "Shipment [" + chr + "]"));
        n += 1;
        if (n % 3 == 0) {
            buttons.push(line);
            line = [];
        }
        chr = String.fromCharCode(97 + n);
    });
    buttons.push(line);
    buttons.push([Markup.button.callback(strings.CANCEL_BUTTON, 'cancel')]);

    ctx.reply(
        message,
        Markup.inlineKeyboard(buttons)
    );
});

module.exports = pickupConfirmWizard;
*/