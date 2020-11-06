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
	if (command === "play") {
		message.channel.send("VUKBOX GAMES\n\nPick a pack.\nYou can pick from Party Pack 1, and nothing else.")
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
							message.reply("let's play Party Pack 1!");
							const pack1launch = require("packs/pack1/launcher");
							pack1launch.open(message);
						} else {
							message.reply("it seems like you don't want to play a pack. But that's okay! We can play a different time.");
						}
					})
					.catch(collected => {
						message.reply("it seems like you don't want to play a pack. But that's okay! We can play a different time.");
					});
			});
	}
});

client.login(process.env.TOKEN);