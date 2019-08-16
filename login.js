let Discord = require('discord.js'), client = new Discord.Client(), TOKEN_AUTH = 'authentication token';

client.on('ready', () => {
  console.log(`${client.user.tag} logged! Guilds: ${client.guilds.size}`);
  client.user.setPresence({ game: { name: `👀 py-js-selfbot`, type: 'WATCHING' }, status: 'online' });
});

client.login(TOKEN_AUTH);
