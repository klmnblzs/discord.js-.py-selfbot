const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: You don't have permission for that.`);
  let mentionedMember = message.mentions.members.first() || message.guild.members.get(args[0]);
  let banReason = args.slice(1).join(' ');
  if (!mentionedMember) return message.channel.send(`:x: Mention a valid member.`);
  if (!mentionedMember.bannable) return message.channel.send(`:x: You don't have permission to ban the mentioned member.`);
  await mentionedMember.ban(banReason).catch(error => console.log(`Error.`));
  message.channel.send(`:white_check_mark: ${mentionedMember} has been **banned** from the server, by: **${message.author}**. Reason: **${banReason}**`);
};

module.exports.help = {
    name: "ban",
    category: "moderation",
    description: "ban the mentioned member from the server"
}	
