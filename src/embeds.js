let author = "Vukbox Games";
const Discord = require("discord.js");

module.exports = {
	author,
	titleScreenMain,
	titleScreenPack,
	generic,
};

function titleScreenMain(description) {
	return new Discord.MessageEmbed()
		.setAuthor(author)
		.setTitle("Pick a pack!")
		.setDescription(description);
}

function titleScreenPack(description, pack) {
	return new Discord.MessageEmbed()
		.setAuthor(author)
		.setTitle(`Pick a game from ${pack}!`)
		.setTitle(description);
}

function generic(title, description) {
	return new Discord.MessageEmbed()
		.setAuthor(author)
		.setTitle(title)
		.setDescription(description);
}