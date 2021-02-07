const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

const strings = require('../constant/strings');
const { getCorrectAddress, createDeliveryRequest, getCustomerId } = require('./helpers');

const step1Handler = new Composer();
const step2Handler = new Composer();
const step3Handler = new Composer();
const step41Handler = new Composer();
const step42Handler = new Composer();
const step4Handler = new Composer();
const step5Handler = new Composer();

let start_address = '';
let destination_address = '';
let phone_number = '';
let quantity = '';
let weight = '';

step1Handler.action('next', async (ctx) => {
    await ctx.editMessageText(strings.DW_DELIVERY_REQUEST);
    ctx.reply(strings.DW_START_MESSAGE);
    return ctx.wizard.next();
});
step1Handler.action('cancel', async (ctx) => {
    await ctx.editMessageText(strings.DW_DELIVERY_REQUEST);
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step1Handler.command('next', async (ctx) => {
    await ctx.editMessageText(strings.DW_DELIVERY_REQUEST);
    ctx.reply(strings.DW_START_MESSAGE);
    return ctx.wizard.next();
});
step1Handler.command('cancel', async (ctx) => {
    await ctx.editMessageText(strings.DW_DELIVERY_REQUEST);
    ctx.reply(strings.CANCEL_MESSAGE)
    return await ctx.scene.leave();
});


step2Handler.command('cancel', async (ctx) => {
    ctx.reply(strings.CANCEL_MESSAGE)
    return await ctx.scene.leave()
});
step2Handler.on('text', async (ctx) => {
    start_address = ctx.message.text;
    await ctx.reply(strings.DW_DESTINATION_MESSAGE);
    return ctx.wizard.next();
});

step3Handler.command('cancel', async (ctx) => {
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step3Handler.on('text', async (ctx) => {
    destination_address = ctx.message.text;
    await ctx.reply(strings.DW_PHONE_MESSAGE);
    return ctx.wizard.next();
});

step4Handler.command('cancel', async (ctx) => {
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step4Handler.on('text', async (ctx) => {
    phone_number = ctx.message.text;
    await ctx.reply(strings.DW_QUANTITY_MESSAGE);
    return ctx.wizard.next();
});

step41Handler.command('cancel', async (ctx) => {
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step41Handler.on('text', async (ctx) => {
    quantity = ctx.message.text;
    await ctx.reply(strings.DW_WEIGHT_MESSAGE);
    return ctx.wizard.next();
});

step42Handler.command('cancel', async (ctx) => {
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step42Handler.on('text', async (ctx) => {
    weight = ctx.message.text;

    start_address = await getCorrectAddress(start_address);
    destination_address = await getCorrectAddress(destination_address);

    await ctx.reply(
        strings.DW_RECAP_MESSAGE(start_address, destination_address, phone_number, quantity, weight),
        Markup.inlineKeyboard([
            Markup.button.callback(strings.ACCEPT_BUTTON, 'accept'),
            Markup.button.callback(strings.CANCEL_BUTTON, 'reject')
        ])
    )

    return ctx.wizard.next();
});

step5Handler.action('accept', async (ctx) => {
    //send order
    let id = await getCustomerId(ctx.from.id);
    let ok = false;
    if (id) {
        const data = {
            customerId: id,
            pickupAddress: start_address,
            deliveryAddress: destination_address,
            unit: "Kg",
            customerPhoneNumber: phone_number,
            quantity: parseFloat(quantity),
            weight: parseFloat(weight)
        }
        ok = await createDeliveryRequest(data);
    }
    await ctx.editMessageText(strings.DW_RECAP_MESSAGE(start_address, destination_address, phone_number, quantity, weight));
    if (ok) {
        ctx.reply(strings.DW_ACCEPT_MESSAGE);
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
    return await ctx.scene.leave();
});
step5Handler.command('accept', async (ctx) => {
    //send order
    let id = await getCustomerId(ctx.from.id);
    let ok = false;
    if (id) {
        const data = {
            customerId: id,
            pickupAddress: start_address,
            deliveryAddress: destination_address,
            unit: "Kg",
            customerPhoneNumber: phone_number,
            quantity: parseFloat(quantity),
            weight: parseFloat(weight)
        }
        ok = await createDeliveryRequest(data);
    }
    await ctx.editMessageText(strings.DW_RECAP_MESSAGE(start_address, destination_address, phone_number, quantity, weight));
    if (ok) {
        ctx.reply(strings.DW_ACCEPT_MESSAGE);
    } else {
        ctx.reply(strings.ERROR_MESSAGE);
    }
    return await ctx.scene.leave();
});
step5Handler.action('reject', async (ctx) => {
    await ctx.editMessageText(strings.DW_RECAP_MESSAGE(start_address, destination_address, phone_number, quantity, weight));
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});
step5Handler.command('reject', async (ctx) => {
    await ctx.editMessageText(strings.DW_RECAP_MESSAGE(start_address, destination_address, phone_number, quantity, weight));
    ctx.reply(strings.CANCEL_MESSAGE);
    return await ctx.scene.leave();
});

const superWizard = new Scenes.WizardScene(
    'super-wizard',
    step1Handler,
    step2Handler,
    step3Handler,
    step4Handler,
    step41Handler,
    step42Handler,
    step5Handler
);

superWizard.enter((ctx) => {
    ctx.reply(
        strings.DW_DELIVERY_REQUEST,
        Markup.inlineKeyboard([
            Markup.button.callback(strings.CANCEL_BUTTON, 'cancel'),
            Markup.button.callback(strings.DW_NEXT_BUTTON, 'next'),
        ])
    );
});

module.exports = superWizard;