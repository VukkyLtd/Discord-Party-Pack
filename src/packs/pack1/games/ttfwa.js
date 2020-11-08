var players = [];

module.exports = {
	open,
	ttfwaValidate,
	playerValidate
};

function open(message) {
	const embeds = require("../../../embeds");
	message.channel.send(embeds.generic("How to play TTFWA", "Two players will talk about something.\nThen, another player will show up and say Trying To Find Who Asked, or TTFWA."))
		.then((tutoral) => play(tutoral));
}

function play(message) {
	const embeds = require("../../../embeds");
	const filter = userMessage => {
		if (playerValidate(userMessage.author.id, players) == true) {
			players.push(userMessage.author.id);
			return true;
		} else {
			return false;
		}
	};
	message.channel.send(embeds.generic("Let's play TTFWA!", "The game is starting now.")).then((ttfwaPrompt) => {
		ttfwaPrompt.channel.awaitMessages(filter, { max: 3, time: 60000, errors: ["time"] })
			.then(collected => {
				message.delete();
				ttfwaPrompt.delete();
				var lastPersonContent = collected.last().content.toLowerCase();
				if(ttfwaValidate(lastPersonContent) == true) {
					message.channel.send(embeds.generic("You did it!", "You just played TTFWA."));
				} else {
					message.channel.send(embeds.generic("Oops!", "The last person who spoke didn't say TTFWA."));
				}
			})
			.catch(collected => {
				message.delete();
				ttfwaPrompt.delete();
				message.channel.send("Looks like there weren't enough players to play TTFWA.");
			});
	});
}

function ttfwaValidate(content) {
	if (content == "ttfwa" || content == "trying to find who asked") {
		return true;
	} else {
		return false;
	}
}

function playerValidate(playerID, playersIn) {
	if(!playersIn.includes(playerID)) {
		return true;
	} else {
		return false;
	}
}