const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const CANCEL_BUTTON = '❌ Cancel'
const ACCEPT_BUTTON = '✅ Accept'
const NEXT_BUTTON = '➡️ Next'
const CANCEL_MESSAGE = '❌ Operation canceled'
const ACCEPT_MESSAGE = '✅ Delivery accepted'
const DELIVERY_REQUEST = '📦 New delivery request'
const START_MESSAGE = '📍 Type pickup address:'
const DESTINATION_MESSAGE = '📍 Type destination address:'
const PHONE_MESSAGE = '☎️ Type phone number:'
const RECAP_MESSAGE = () => '📦 New delivery request\n\n📍 Pickup address: ' + start_address + '\n📍 Destination address: ' + destination_address + '\n☎️ Phone number: ' + phone_number + '\n\nProceed?'

const step1Handler = new Composer();
const step2Handler = new Composer();
const step3Handler = new Composer();
const step4Handler = new Composer();
const step5Handler = new Composer();

let start_address = '';
let destination_address = '';
let phone_number = '';

const getCorrectAddress = require('./helpers').getCorrectAddress;

step1Handler.action('next', async (ctx) => {
    await ctx.editMessageText(DELIVERY_REQUEST);
    ctx.reply(START_MESSAGE);
    return ctx.wizard.next();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(DELIVERY_REQUEST);
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step1Handler.command('next', async (ctx) => {
    await ctx.editMessageText(DELIVERY_REQUEST);
    ctx.reply(START_MESSAGE);
    return ctx.wizard.next();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(DELIVERY_REQUEST);
    ctx.reply(CANCEL_MESSAGE)
    return await ctx.scene.leave();
});


step2Handler.command('cancel', async (ctx) => {
    ctx.reply(CANCEL_MESSAGE)
    return await ctx.scene.leave()
});
step2Handler.on('text', async (ctx) => {
    start_address = ctx.message.text;
    await ctx.reply(DESTINATION_MESSAGE);
    return ctx.wizard.next();
});

step3Handler.command('cancel', async (ctx) => {
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step3Handler.on('text', async (ctx) => {
    destination_address = ctx.message.text;
    await ctx.reply(PHONE_MESSAGE);
    return ctx.wizard.next();
});

step4Handler.command('cancel', async (ctx) => {
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step4Handler.on('text', async (ctx) => {
    phone_number = ctx.message.text;

    start_address = await getCorrectAddress(start_address);
    destination_address = await getCorrectAddress(destination_address);

    await ctx.reply(
        RECAP_MESSAGE(),
        Markup.inlineKeyboard([
            Markup.button.callback(ACCEPT_BUTTON, 'accept'),
            Markup.button.callback(CANCEL_BUTTON, 'reject')
        ])
    )
    return ctx.wizard.next();
});

step5Handler.action('accept', async (ctx) => {
    //send order
    await ctx.editMessageText(RECAP_MESSAGE());
    ctx.reply(ACCEPT_MESSAGE);
    return await ctx.scene.leave();
});
step5Handler.command('accept', async (ctx) => {
    //send order
    await ctx.editMessageText(RECAP_MESSAGE());
    ctx.reply(ACCEPT_MESSAGE);
    return await ctx.scene.leave();
});
step5Handler.action('reject', async (ctx) => {
    await ctx.editMessageText(RECAP_MESSAGE());
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step5Handler.command('reject', async (ctx) => {
    await ctx.editMessageText(RECAP_MESSAGE());
    ctx.reply(CANCEL_MESSAGE);
    return await ctx.scene.leave();
});

const superWizard = new Scenes.WizardScene(
    'super-wizard',
    step1Handler,
    step2Handler,
    step3Handler,
    step4Handler,
    step5Handler
);

superWizard.enter((ctx) => {
    ctx.reply(
        DELIVERY_REQUEST,
        Markup.inlineKeyboard([
            Markup.button.callback(CANCEL_BUTTON, 'cancel'),
            Markup.button.callback(NEXT_BUTTON, 'next'),
        ])
    );
});

module.exports = superWizard;