const bot = require('./bot')
const commands = require('./commands')
const {updateUser} = require("./db");

const possibleGreetings = ['hi', 'hello', 'sup', 'hey', 'yo']

commands.forEach(({ command, controller }) => {
    bot.onText(command, controller)
})

bot.on('message', (msg) => {
    if (msg.text.startsWith('/', 0)) return;

    if (msg.text.includes('@')) {
        updateUser(msg.from.username, msg.text)
        bot.sendMessage(msg.chat.id, `Thanks for your email, ${msg.from.first_name}!`);

        return;
    }

    if (possibleGreetings.includes(msg.text.toLowerCase())) {
        bot.sendMessage(msg.chat.id, `Hello _${msg.from.first_name}!_`, { parse_mode: "Markdown" })
    } else {
        bot.sendMessage(msg.chat.id, `I don't understand what you're saying`)
    }
});
