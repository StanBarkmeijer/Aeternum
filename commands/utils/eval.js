const { RichEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
    help: {
        name: "eval",
        aliases: ["e", "val"]
    },
    run: async (bot, message, args) => {
        let arr = ["229258267187085316"];
        if (!arr.includes(message.author.id)) {
            return message.channel.send("You're not the owner of this bot!!").then(m => m.delete(5000));
        } else {
            try {
                let toEval = args.join(" ");
                if (toEval.includes("token") || toEval.includes("destroy()") || toEval.includes("this.run") || toEval.includes("exit()")) return;
                let evaluated = eval(toEval);

                if (!toEval) {
                    let undefEmbed = new RichEmbed()
                        .setColor(`#FF0000`)
                        .setTitle("❌ Error!")
                        .setDescription("You need to evaluate **_SOMETHING_**, please?")
                        .setThumbnail()
                        .setFooter("HypeBeast", bot.user.displayAvatarURL);

                    message.channel.send(undefEmbed);
                } else {
                    let embed = new RichEmbed()
                        .setTitle("Eval")
                        .addField("To evaluate:", `\`\`\`js\n${beautify(toEval, {format: "js"})}\n\`\`\``)
                        .addField("Evaluated:", evaluated)
                        .addField("Type of:", typeof (evaluated))
                        .setFooter("HypeBeast", bot.user.displayAvatarURL)
                        .setColor("#00FF00")
                        .setTimestamp();

                    message.channel.send(embed);
                }
            } catch (e) {
                let errEmbed = new RichEmbed()
                    .setColor(`#FF0000`)
                    .setTitle("\:x: Error!")
                    .setDescription(e)
                    .setThumbnail()
                    .setFooter("HypeBeast", bot.user.displayAvatarURL);

                message.channel.send(errEmbed);
            }
        }
    }
}
