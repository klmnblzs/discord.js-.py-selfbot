const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: You don't have permission for that.`)
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: Error, i don't have **MANAGE_MESSAGES** permission!`);

    if (!args[0]) return message.channel.send(`:thinking: How many messages would you like to delete?`);
    if (args[0] < 1) return message.channel.send(`:x: Please enter a number greater than 1.`);
    if (args[0] > 100) return message.channel.send(`:x: Please enter a number less than 100.`);
    if (isNaN(args[0])) return message.channel.send(`:x: Please enter a correct number.`);

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`:white_check_mark: Deleted **${args[0]}** messages!`).then(message => message.delete(2750));
    }).catch().catch((e) => message.channel.send(`:x: You cannot delete a message older than 14 days.`));
};

module.exports.help = {
    name: "purge",
    category: "moderation",
    description: "clears the specified amount"
}
