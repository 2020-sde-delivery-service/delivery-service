const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const strings = require('../constant/strings');

const step1Handler = new Composer();

step1Handler.action('accept', async (ctx) => {
    //send shipper
    await ctx.editMessageText(strings.BSW_ASK_MESSAGE);
    ctx.reply(strings.BSW_ACCEPT_MESSAGE, Markup
        .keyboard(['/trip', '/pickup', '/deliver'])
        .resize()
    );
    return await ctx.scene.leave();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(strings.BSW_ASK_MESSAGE);
    ctx.reply(strings.CANCEL_MESSAGE,);
    return await ctx.scene.leave();
});
step1Handler.command('accept', async (ctx) => {
    //send shipper
    await ctx.editMessageText(strings.BSW_ASK_MESSAGE);
    ctx.reply(strings.BSW_ACCEPT_MESSAGE, Markup
        .keyboard(['/trip', '/pickup', '/deliver'])
        .resize()
    );
    return await ctx.scene.leave();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(strings.BSW_ASK_MESSAGE);
    ctx.reply(strings.CANCEL_MESSAGE)
    return await ctx.scene.leave();
});

const becomeShipperWizard = new Scenes.WizardScene(
    'shipper-wizard',
    step1Handler
);

becomeShipperWizard.enter((ctx) => {
    ctx.reply(
        strings.BSW_ASK_MESSAGE,
        Markup.inlineKeyboard([
            Markup.button.callback(strings.CANCEL_BUTTON, 'cancel'),
            Markup.button.callback(strings.ACCEPT_BUTTON, 'accept'),
        ])
    );
});

module.exports = becomeShipperWizard;