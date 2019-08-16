const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`:x: You don't have permission for that.`);
  let mentionedMember = message.mentions.members.first() || message.guild.members.get(args[0]);
  let kickReason = args.slice(1).join(' ');
  if (!mentionedMember) return message.channel.send(`:x: Mention a valid member.`);
  if (!mentionedMember.kickable) return message.channel.send(`:x: You don't have permission to kick the mentioned member.`);
  await mentionedMember.kick(kickReason).catch(error => console.log(`Error.`));
  message.channel.send(`:white_check_mark: ${mentionedMember} has been **kicked** from the server, by **${message.author}**. Reason: **${kickReason}**`);
};

module.exports.help = {
    name: "kick",
    category: "moderation",
    description: "kick the mentioned member from the server"
}	
