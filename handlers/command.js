const { readdirSync } = require("fs");

const ascii = require("ascii-table");

module.exports = bot => {
    function load(dir) {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        let table = new ascii('Commands');

        table.setHeading('Command', 'Load status')

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.help && typeof(pull.help.name) === "string") {
                bot.commands.set(pull.help.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }

            if (pull.help.aliases && typeof(pull.help.aliases) === "object") pull.help.aliases.forEach(alias => bot.aliases.set(alias, pull.help.name));
        }

        console.log(table.toString());
    }

    ["info"].forEach(dir => load(dir));
}
