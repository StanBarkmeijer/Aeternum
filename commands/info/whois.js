const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "whois",
        aliases: ["user"],
        description: "Returns user information",
        usage: "..whois [mention | id | tag | username | displayname]",
        type: "info"
    },
    run: async (bot, message, args) => {
        const fail = new RichEmbed()
            .setColor("#f00")
            .setDescription("Couldn't find any user?");

        let member;

        if (!args[0]) member = message.member;
        else member = message.mentions.members.first()
        || message.guild.members.get(args[0]) 
        || message.guild.members.find(member => member.user.tag.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        || message.guild.members.find(member => member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
        || message.guild.members.find(member => member.displayName.toLowerCase().startsWith(args.join(" ").toLowerCase()));

        if (!member) 
            return message.channel.send(fail)
                .then(msg => msg.delete(10 * 1000));

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
}