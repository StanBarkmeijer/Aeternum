const { RichEmbed, MessageCollector } = require("discord.js");
const { findMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "whois",
        aliases: ["user"],
        description: "Returns user information",
        usage: "..whois [mention | id | tag | username | displayname]",
        type: "info"
    },
    run: async (bot, message, args) => {
        let member = findMember(message, args[0]);

        if (Array.isArray(member) && member.length > 1) {
            message.reply(`Please select one of these users:\n${member.slice(0, member.length > 5 ? 5 : member.length).map((x, index) => `${index + 1}: \`${x.displayName}\``).join("\n")}`)
            const coll = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30 * 1000});

            coll.on("collect", msg => {
                if (isNaN(msg.content)) {
                    msg.reply("You did not provide a number. Please run the command again")
                        .then(m => m.delete(5 * 1000));
                    return coll.stop("No number provided.");
                } else {
                    member = member[parseInt(msg.content) - 1];

                    sendEmbed(message, member);
                    return coll.stop("Success.");
                }
            });
        } else {
            return sendEmbed(message, member);
        }
    }
}

function sendEmbed(message, member) {
    const roles = member.roles.size - 1 === 0 ? "None" : member.roles.filter(role => role.name != "@everyone").map(role => role).join(", ");

    const embed = new RichEmbed()
        .setColor(member.highestRole.name != "@everyone" ? member.highestRole.hexColor : "#363940")
        .setAuthor(member.displayName, member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`**Name**: ${member.displayName}` + "\n" +
            `**Tag**: ${member.user.tag}` + "\n" +
            `**Account creation**: ${member.user.createdAt.toDateString()}` + "\n" +
            `**Server join date**: ${member.joinedAt.toDateString()}` + "\n" +
            `**Roles**: ${roles}`)
       
    message.channel.send(embed);
}