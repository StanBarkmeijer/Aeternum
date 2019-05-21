const { Client, Collection } = require("discord.js");
const { token } = require("./token.json");

const bot = new Client();

bot.commands = new Collection();
bot.aliases = new Collection();

["command", "event"].forEach(handler => require(`./handlers/${handler}`)(bot));

bot.login(token);
