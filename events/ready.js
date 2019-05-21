let firstStart = true;

module.exports = async bot => {
    if (firstStart) {
        firstStart = false;

        const url = await bot.generateInvite("ADMINISTRATOR");

        bot.user.setPresence({
            game: {
                name: `on ${bot.guilds.size} serve${bot.guilds.size === 1 ? 'r' : 'rs'} 💻`
            },
            status: "online"
        });

        console.log(`\n\n --+ ${bot.user.username} is now online +--\n --+ ${url} +-- \n\n`);
    }
}