const { SlashCommandBuilder } = require('discord.js');
const aiChat = require('../../aiChat');
// exports makes it so that this can be ''required in other files
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dan')
		.setDescription('Ask the gambling genie, Dan, for assistance')
		.addStringOption((option) =>
			option.setName('prompt').setDescription('Message/question for Dan')
		),
	async execute(interaction) {
		try {
			response = await aiChat.run(interaction.options.getString('prompt'));
			await interaction.reply(`Dan: ${response}`);
		} catch (e) {
			console.log(e);
			await interaction.reply(
				`Dan is unavailable right now. Please try again later.`
			);
		}
	},
};
