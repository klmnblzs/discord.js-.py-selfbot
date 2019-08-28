const Discord = require('discord.js');

exports.run = (client, message, args, sides) => {
    if (sides.length < 1) { sides = 6; }
    if (sides === 0) { return message.channel.send(`:x: You can't throw from 0.`); }

    if (Number.isInteger(Number(sides))) { 
        var result = Math.floor(Math.random() * (Math.floor(sides) - Math.ceil(1) + 1)) + Math.ceil(1);
        return message.channel.send(`:game_die: You threw: ${result}`);
    } else {
        return message.channel.send(`:x: Please, try later.`);
    }    
};

exports.help = {
    name: "roll",
    category: "fun",
    description: "roll"
}