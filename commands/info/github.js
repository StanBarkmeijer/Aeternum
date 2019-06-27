const { RichEmbed, ReactionCollector } = require("discord.js");

module.exports = {
    help: {
        name: "github",
        aliases: ["git"],
        description: "Returns GitHub info",
        usage: "..github",
        type: "info"
    },
    run: async (bot, message, args) => {
        const emoji = bot.emojis.get("593729920602210324").toString();

        const embed = new RichEmbed()
            .setColor("#363940")
            .setDescription(`React to this with a ${emoji} to reveal the GitHub repo`);

        const emb = new RichEmbed()
            .setColor("#363940")
            .setAuthor(message.guild.me.displayName, bot.user.displayAvatarURL)
            .setDescription(`Press [me](https://github.com/akaStannn/Aeternum) to find the GitHub repo ${emoji} of this bot`);

        const msg = await message.channel.send(embed);

        await msg.react("593729920602210324");

        const coll = new ReactionCollector(msg, (reaction, user) => !user.bot && user.id == message.author.id);

        coll.on("collect", collected => {
            msg.edit(emb);
            msg.clearReactions();
        });
    }
}