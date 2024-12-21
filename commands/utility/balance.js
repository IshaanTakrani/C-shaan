const databaseService = require('../../db_services.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Display user balance'),
	async execute(interaction) {
		if ((await databaseService.isInDB(interaction.user.id)) == false) {
			await databaseService.updateBalance(
				interaction.user.id,
				interaction.user.username,
				500
			);
		}
		let syncBalance;
		try {
			const balance = await databaseService.fetchBalance(interaction.user.id);
			syncBalance = balance.balance;
			// await interaction.reply(`Your balance is: ${balance.balance}`);
		} catch (error) {
			await interaction.reply(
				'Error fetching balance. Please try again later.'
			);
		}

		const balanceEmbed = {
			color: 0x2a93ba,
			title: `${interaction.user.username}'s balance:`,
			fields: [{ name: 'Balance:', value: `${syncBalance} :coin:` }],
			thumbnail: {
				url: interaction.user.displayAvatarURL({
					dynamic: true,
					size: 4096,
				}),
			},
		};
		await interaction.reply({ embeds: [balanceEmbed] });
	},
};
