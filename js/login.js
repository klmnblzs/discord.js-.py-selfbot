let Discord = require('discord.js'), client = new Discord.Client(), config = ('./config.json'), TOKEN_AUTH = 'authentication token';

client.on('ready', () => {
  console.log(`${client.user.tag} logged! Guilds: ${client.guilds.size}`);
  client.user.setPresence({ game: { name: `👀 py-js-selfbot`, type: 'WATCHING' }, status: 'online' });
});

//Command handler
client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
  }
});

//Log (messageDelete)
client.on('messageDelete', async (msg) => {
  if (!msg.content) return;
  if (message.channel.type === "dm") {
  const embed = new Discord.RichEmbed()
    embed.setTitle(`Delete log`);
    embed.setColor(0xa12a2a);
    embed.setTimestamp();
    embed.addField(`${message.author.tag} deleted a message:`, msg.content, true);
   return client.guilds.get('GuildID').channels.get('ChannelID').send(embed)
}});

//Log (messageUpdate)
client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (!msg.content) return;
  if (message.channel.type === "dm") {
  const embed = new Discord.RichEmbed()
    embed.setTitle(`Edit log; sent by ${oldMessage.author.tag}`);
    embed.setColor(0xa12a2a);
    embed.setTimestamp();
    embed.addField(`Before`, oldMessage.content, true);
	embed.addField(`After`, newMessage.content, true);
   return client.guilds.get('GuildID').channels.get('ChannelID').send(embed)
}});

client.login(TOKEN_AUTH);