const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "ping",
        aliases: ["p"],
        description: "Returns the API ping",
        usage: "..ping",
        type: "info"
    },
    run: async (bot, message, args) => {
        message.channel.send("***Pinging...**")
            .then(msg => {
                msg.edit(`**Pong!** *What's this?*\nAPI Ping: \`${bot.ping | 0}\`ms\nAverage Ping: \`${msg.createdTimestamp - message.createdTimestamp}\`ms`)
            });
    }
}