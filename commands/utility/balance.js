const databaseService = require('../../db_services.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Display user balance'),
	async execute(interaction) {
		try {
			const balance = await databaseService.fetchBalance(interaction.user.id);
			await interaction.reply(`Your balance is: ${balance.balance}`);
		} catch (error) {
			await interaction.reply(
				'Error fetching balance. Please try again later.'
			);
		}
	},
};
