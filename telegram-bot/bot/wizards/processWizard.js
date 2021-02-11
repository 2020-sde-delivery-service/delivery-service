const { Composer, Markup, Scenes } = require('telegraf');

const strings = require('../../constant/strings');
const { processPoint } = require('../helpers');

const step1Handler = new Composer();

step1Handler.action('accept', async (ctx) => {

    let ok = await processPoint(ctx.session.pointId);
    await ctx.editMessageText(strings.PW_ASK_MESSAGE);
    if (ok) {
        ctx.reply(strings.PW_ACCEPT_MESSAGE);
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
    return await ctx.scene.leave();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(strings.PW_ASK_MESSAGE);
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step1Handler.command('accept', async (ctx) => {

    let ok = await processPoint(ctx.session.pointId);
    await ctx.editMessageText(strings.PW_ASK_MESSAGE);
    if (ok) {
        ctx.reply(strings.PW_ACCEPT_MESSAGE);
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
    return await ctx.scene.leave();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(strings.PW_ASK_MESSAGE);
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});

const processWizard = new Scenes.WizardScene(
    'process-wizard',
    step1Handler
);

processWizard.enter(async (ctx) => {
    ctx.reply(
        strings.PW_ASK_MESSAGE,
        Markup.inlineKeyboard([
            Markup.button.callback(strings.CANCEL_BUTTON, 'cancel'),
            Markup.button.callback(strings.ACCEPT_BUTTON, 'accept'),
        ])
    );
});

module.exports = processWizard;