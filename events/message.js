module.exports = async (bot, message) => {
    if (message.author.bot || !message.guild) return;

    // If the message.member is uncached, message.member might return null. 
    // This prevents that from happening. 
    if (!message.member) message.member = await message.guild.fetchMember(message.author);

    console.log(`📧\t ${message.author.tag} : ${message.content}`);
}