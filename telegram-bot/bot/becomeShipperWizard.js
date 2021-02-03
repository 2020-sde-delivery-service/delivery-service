const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const CANCEL_BUTTON = '❌ Cancel'
const ACCEPT_BUTTON = '✅ Accept'
const ASK_MESSAGE = '📦 Are you sure to become a shipper?'
const CANCEL_MESSAGE = '❌ Operation canceled'
const ACCEPT_MESSAGE = '✅ Now you are a shipper'

const step1Handler = new Composer();

step1Handler.action('accept', async (ctx) => {
    //send shipper
    await ctx.editMessageText(ASK_MESSAGE);
    ctx.reply(ACCEPT_MESSAGE, Markup
        .keyboard(['/trip', '/pickup', '/deliver'])
        .resize()
    );
    return await ctx.scene.leave();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(ASK_MESSAGE);
    ctx.reply(CANCEL_MESSAGE,);
    return await ctx.scene.leave();
});
step1Handler.command('accept', async (ctx) => {
    //send shipper
    await ctx.editMessageText(ASK_MESSAGE);
    ctx.reply(ACCEPT_MESSAGE, Markup
        .keyboard(['/trip', '/pickup', '/deliver'])
        .resize()
    );
    return await ctx.scene.leave();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(ASK_MESSAGE);
    ctx.reply(CANCEL_MESSAGE)
    return await ctx.scene.leave();
});

const becomeShipperWizard = new Scenes.WizardScene(
    'shipper-wizard',
    step1Handler
);

becomeShipperWizard.enter((ctx) => {
    ctx.reply(
        ASK_MESSAGE,
        Markup.inlineKeyboard([
            Markup.button.callback(CANCEL_BUTTON, 'cancel'),
            Markup.button.callback(ACCEPT_BUTTON, 'accept'),
        ])
    );
});

module.exports = becomeShipperWizard;