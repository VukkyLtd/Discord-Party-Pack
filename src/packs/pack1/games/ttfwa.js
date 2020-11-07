const Discord = require("discord.js");
const embeds = require("../../../embeds");
var players = [];

module.exports = {
	open
};

function open(message) {
	message.channel.send(embeds.generic("How to play TTFWA", "Two players will talk about something.\nThen, another player will show up and say Trying To Find Who Asked, or TTFWA."))
		.then((tutoral) => play(tutoral));
}

function play(message) {
	const filter = userMessage => {
		if(!players.includes(userMessage.author.id)) {
			players.push(userMessage.author.id);
			return true;
		} else {
			return false;
		}
	};
	message.channel.send(embeds.generic("Let's play TTFWA!", "The game is starting now.")).then((ttfwaPrompt) => {
		ttfwaPrompt.channel.awaitMessages(filter, { max: 3, time: 60000, errors: ["time"] })
			.then(collected => {
				let lastPersonContent = collected.last().content.toLowerCase();
				console.log("ttfwa");
				console.log(lastPersonContent);
				if(lastPersonContent == "ttfwa" && lastPersonContent == "trying to find who asked") {
					message.channel.send(embeds.generic("You did it!", "You just played TTFWA."));
				} else {
					message.channel.send(embeds.generic("Oops!", "The last person who spoke didn't say TTFWA."));
				}
			})
			.catch(collected => {
				message.delete();
				ttfwaPrompt.delete();
				message.channel.send("Looks like nobody decided to play TTFWA.");
			});
	});
}