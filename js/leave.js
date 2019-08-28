const Discord = require('discord.js');

exports.run = async (client, message, args) => {
 if (args.length  < 1) return message.channel.send(`:x: Error: *You didn't enter a valid Guild ID.*`);
 if (message.author.id !== 'Your ID') return;
client.guilds.get(args.join(" ")).leave()
.then(g => console.log(`Leaved from: ${g}`)) .catch(console.error);
}

exports.help = {
    name: "leave",
    category: "utility",
    description: "quitting by guild id"
}