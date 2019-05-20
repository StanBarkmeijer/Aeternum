const { Client } = require("discord.js");
const { token } = require("./token.json");

const bot = new Client();

bot.on("ready", async () => {
    const url = await bot.generateInvite("ADMINISTRATOR");
    
    bot.user.setPresence({
        game: {
            name: `on ${bot.guilds.size} serve${bot.guilds.size === 1 ? 'r' : 'rs'} 💻`
        },
        status: "online"        
    });

    console.log(`\n\n --+ ${bot.user.username} is now online +--\n --+ ${url} +-- \n\n`);
});

bot.on("message", async message => {
    if (message.author.bot || !message.guild) return;

    // If the message.member is uncached, message.member might return null. 
    // This prevents that from happening. 
    if (!message.member) message.member = await message.guild.fetchMember(message.author);

    console.log(`📧\t ${message.author.tag} : ${message.content}`);
});

bot.login(token);
