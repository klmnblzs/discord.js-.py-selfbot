const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  message.delete();
  const embed = new Discord.RichEmbed();
    embed.setColor('RANDOM');
    embed.setTitle(`Embed sent by ${message.author.tag}`);
    embed.addField('Message:', message.content, true)
    embed.setTimestamp();
  message.channel.send(embed)
};

exports.help = {
    name: "embed",
    category: "utility/fun/moderation",
    description: "embedding your message"
}