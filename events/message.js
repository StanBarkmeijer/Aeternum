module.exports = async (bot, message) => {
    const prefix = "..";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    let command;

    if (message.author.bot || !message.guild) return;

    // If the message.member is uncached, message.member might return null. 
    // This prevents that from happening. 
    if (!message.member) message.member = await message.guild.fetchMember(message.author);

    if (!message.content.startsWith(prefix)) return;

    if (cmd.length === 0) return;
    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args);
}