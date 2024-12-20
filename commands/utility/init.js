const { SlashCommandBuilder } = require('discord.js');
const databaseService = require('../../db_services.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init')
		.setDescription('initialize user profile'),
	async execute(interaction) {
		// const message = await interaction.fetchReply();
		try {
			const isInDb = await databaseService.isInDB(interaction.user.id);
			if (isInDb == null) {
				await databaseService.initUser(interaction.user.id);
				await interaction.reply(
					`You have successfully been initialized, ${interaction.user.username}!, Welcome to the bot.`
				);
			} else {
				await interaction.reply(
					`You have already been initialized, ${interaction.user.username}.`
				);
			}
		} catch (error) {
			await interaction.reply(
				'Error initializing user. Please try again later.'
			);
		}
	},
};
