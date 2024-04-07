const bot = require("./bot");
const { createUser, updateUser, getUser} = require("./db");

const commands = [
    {
        command: /\/start/,
        controller: (msg) => {
            const username = msg.from.username;

            bot.sendMessage(msg.chat.id, 'Welcome!\n`Please, send your email`', {
                reply_markup: {
                    keyboard: [["/start"], ["/sendpic"], ["/getmydatafromdb"], ["/sendlocation"]],
                },
                parse_mode: "Markdown"
            });
        }
    },
    {
        command: '/getmydatafromdb',
        controller: (msg) => {
            const username = msg.from.username;
            getUser(username).then((data) => {
                bot.sendMessage(msg.chat.id, `Your data from database:${JSON.stringify(data)}`);
            }).catch((err) => {
                bot.sendMessage(msg.chat.id, `Error: ${err}`);
            })
        }
    },
    {
        command: /\/sendpic/,
        controller: (msg) => {
            const width = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
            const height = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

            bot.sendPhoto(msg.chat.id, `https://random.imagecdn.app/${width}/${height}`, {caption: "Image caption"});
        }
    },
    {
        command: /\/sendlocation/,
        controller: (msg) => {
            bot.sendLocation(msg.chat.id, 44.97108, -104.27719);
            bot.sendMessage(msg.chat.id, "Here is the point");
        }
    }
]

module.exports = commands;
