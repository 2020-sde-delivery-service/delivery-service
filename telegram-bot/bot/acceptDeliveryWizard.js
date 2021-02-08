const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const strings = require('../constant/strings');
const { acceptShipment } = require('./helpers');

const step1Handler = new Composer();

step1Handler.action('accept', async (ctx) => {

    let ok = await acceptShipment(ctx.session.deliveryId);
    await ctx.editMessageText(strings.ADW_ASK_MESSAGE);
    if (ok) {
        ctx.reply(strings.ADW_ACCEPT_MESSAGE);
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
    return await ctx.scene.leave();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(strings.ADW_ASK_MESSAGE);
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step1Handler.command('accept', async (ctx) => {

    let ok = await acceptShipment(ctx.session.deliveryId);
    await ctx.editMessageText(strings.ADW_ASK_MESSAGE);
    if (ok) {
        ctx.reply(strings.ADW_ACCEPT_MESSAGE);
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
    return await ctx.scene.leave();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(strings.ADW_ASK_MESSAGE);
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});

const acceptDeliveryWizard = new Scenes.WizardScene(
    'accept-wizard',
    step1Handler
);

acceptDeliveryWizard.enter(async (ctx) => {
    await ctx.editMessageText(ctx.update.callback_query.message.text);

    ctx.reply(
        strings.ADW_ASK_MESSAGE,
        Markup.inlineKeyboard([
            Markup.button.callback(strings.CANCEL_BUTTON, 'cancel'),
            Markup.button.callback(strings.ACCEPT_BUTTON, 'accept'),
        ])
    );
});

module.exports = acceptDeliveryWizard;