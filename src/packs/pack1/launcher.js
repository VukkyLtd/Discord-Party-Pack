module.exports = {
	open
};

function open(message) {
	const embeds = require("../../embeds");
	message.channel.send(embeds.titleScreenMain("You can pick from TTFWA (🙄 - requires 3 players)."))
		.then((botPrompt) => {
			botPrompt.react("🙄");
			botPrompt.react("🚫");
			const filter = (reaction, user) => {
				return ["🙄", "🚫"].includes(reaction.emoji.name) && user.id === message.author.id;
			};
			
			botPrompt.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
				.then(collected => {
					const reaction = collected.first();
			
					if (reaction.emoji.name === "🙄") {
						const ttfwa = require("./games/ttfwa");
						botPrompt.delete();
						message.reply("let's play TTFWA!")
							.then((letsPlay) => {
								setTimeout(() => {
									letsPlay.delete();
									ttfwa.open(message);
								}, 2000);
							});
					} else if (reaction.emoji.name === "🚫") {
						botPrompt.delete();
						message.reply("it seems like you don't want to pick a game. But that's okay! We can play another time.");
					}
				})
				.catch(collected => {
					console.log(collected);
					message.reply("it seems like you didn't pick a game, or a scary error got thrown in my face!");
				});
		});
}