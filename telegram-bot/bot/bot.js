const dotenv = require('dotenv');
const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');

dotenv.config();

const handlers = require('./handlers');

const superWizard = new Scenes.WizardScene(
    'super-wizard',
    (ctx) => {
        ctx.reply(
            '📦 New delivery request',
            Markup.inlineKeyboard([
                Markup.button.callback('❌ Cancel', 'cancel'),
                Markup.button.callback('➡️ Next', 'next'),
            ])
        );
        return ctx.wizard.next();
    },
    handlers.step1Handler,
    handlers.step2Handler,
    handlers.step3Handler,
    handlers.step4Handler,
    handlers.step5Handler
);

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([superWizard]);

stage.register(superWizard)

bot.use(session());
bot.use(stage.middleware());


bot.command('newdelivery', (ctx) => ctx.scene.enter('super-wizard')
);

/*
bot.start((ctx) => {
    //database.saveUserChat(ctx.from.id, ctx.chat.id);
    return ctx.reply('Welcome');
});
*/
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

const gameShortName = 'your-game';

bot.command('beverage', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Coke', 'Coke'),
            Markup.button.callback('Pepsi', 'Pepsi')
        ])
    })
})

bot.action('Coke', (ctx) => {
    ctx.editMessageText('Now: <b>7up</b> or <b>Fanta</b>?', {
    })
})

bot.action('Pepsi', (ctx, next) => {
    return ctx.reply('👍').then(() => next())
})

module.exports = bot;
