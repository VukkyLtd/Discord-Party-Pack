require("dotenv").config();
let prefix = process.env.PREFIX;
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const maintenance = false;
	if (command === "play") {
		const embeds = require("./embeds");
		if (maintenance == false) {
			message.delete();
			message.channel.send(embeds.titleScreenMain("You can pick from The Discord Party Pack 1 (1️⃣)."))
				.then((botPrompt) => {
					botPrompt.react("1️⃣");
					botPrompt.react("🚫");
					const filter = (reaction, user) => {
						return ["1️⃣", "🚫"].includes(reaction.emoji.name) && user.id === message.author.id;
					};
					
					botPrompt.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
						.then(collected => {
							const reaction = collected.first();
					
							if (reaction.emoji.name === "1️⃣") {
								const pack1launch = require("./packs/pack1/launcher");
								botPrompt.delete();
								message.reply("let's play Party Pack 1!")
									.then((letsPlay) => {
										setTimeout(() => {
											letsPlay.delete();
											pack1launch.open(message);
										}, 2000);
									});
							} else if (reaction.emoji.name === "🚫") {
								message.reply("it seems like you don't want to pick a pack. But that's okay! We can play a different time.");
							}
						})
						.catch(collected => {
							console.log(collected);
							message.reply("it seems like you didn't pick a pack, or a scary error got thrown in my face!");
						});
				});
		} else {
			message.channel.send(embeds.generic("Uh oh!", "The Discord Party Pack bot is down for maintenance and will be back soon."));
		}
	}
});

client.login(process.env.TOKEN);