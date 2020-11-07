const Discord = require("discord.js");
const embeds = require("../../../embeds");

module.exports = {
	open
};

function open(message) {
	message.channel.send(embeds.generic("How to play TTFWA", "Two players will talk about something.\nThen, another player will show up and say Trying To Find Who Asked, or TTFWA."));
	play(message);
}

function play(message) {
	message.channel.send(embeds.generic("Let's play TTFWA!", "The game is starting now."));
	
}