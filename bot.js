const dotenv = require('dotenv')
const TelegramBot = require('node-telegram-bot-api')

dotenv.config()

const bot = new TelegramBot(process.env.NODE_TELEGRAM_BOT_SECRET, {polling: true})

module.exports = bot
