const { SlashCommandBuilder } = require('discord.js');
const databaseService = require('../../db_services.js');
const Die = require('../../game_classes/Die.js');
const balance = require('./balance.js');
// exports makes it so that this can be ''required in other files
module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll a dia against the house, highest roll wins')
		.addIntegerOption((option) =>
			option.setName('bet').setDescription('amount to bet')
		),

	async execute(interaction) {
		let syncBalance;
		try {
			const balance = await databaseService.fetchBalance(interaction.user.id);
			syncBalance = balance.balance;
			// console.log(balance.balance);
			if (
				balance.balance < interaction.options.getInteger('bet') ||
				balance.balance == null
			) {
				await interaction.reply({
					content: 'Your balance is too low!',
					flags: MessageFlags.Ephemeral,
				});
			}
		} catch (error) {
			await interaction.reply(
				'Error fetching balance. Please try again later.'
			);
		}

		let die = new Die(6);

		let houseRoll = die.roll();
		let playerRoll = die.roll();

		if (houseRoll >= playerRoll) {
			databaseService.updateBalance(
				interaction.user.id,
				interaction.user.username,
				syncBalance - interaction.options.getInteger('bet')
			);
			await interaction.reply(
				`house rolled ${houseRoll} and player rolled ${playerRoll}, house wins!`
			);
		} else {
			databaseService.updateBalance(
				interaction.user.id,
				interaction.user.username,
				syncBalance + interaction.options.getInteger('bet')
			);
			await interaction.reply(
				`house rolled ${houseRoll} and player rolled ${playerRoll}, player wins!`
			);
		}
	},
};
