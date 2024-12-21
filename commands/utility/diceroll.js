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
			option.setName('bet').setDescription('amount to bet').setRequired(true)
		),

	async execute(interaction) {
		/*
			The code section below checks to see if the user is in the
			database. If not, they are added with a default balance of 500
			This is included in all game commands and should only
			be executed once per user
		*/
		if ((await databaseService.isInDB(interaction.user.id)) == false) {
			await databaseService.updateBalance(
				interaction.user.id,
				interaction.user.username,
				500
			);
		}

		// initialize syncbalance and bet amount
		let syncBalance;
		let bet = interaction.options.getInteger('bet');

		/** 
		 * fetches balance from database given user id,
		 * assigns syncBalance to this value
		*/
			
			
		*/
		try {
			const balance = await databaseService.fetchBalance(interaction.user.id);
			syncBalance = balance.balance;
		} catch (error) {
			await interaction.reply(
				'Error fetching balance. Please try again later.'
			);
		}

		// simulare dice rolls using Die object
		let die = new Die(6);
		let houseRoll = die.roll();
		let playerRoll = die.roll();

		/**
		 * handles return message based on came outcome, 
		 * calls function to update player's balance in db
		 */
		if (Number(syncBalance) < bet) {
			await interaction.reply('Your balance is too low!');
		} else if (houseRoll >= playerRoll) {
			databaseService.updateBalance(
				interaction.user.id,
				interaction.user.username,
				syncBalance - bet
			);
			await interaction.reply(
				`house rolled ${houseRoll} and player rolled ${playerRoll}, house wins!`
			);
		} else {
			databaseService.updateBalance(
				interaction.user.id,
				interaction.user.username,
				syncBalance + bet
			);
			await interaction.reply(
				`house rolled ${houseRoll} and player rolled ${playerRoll}, player wins!`
			);
		}
	},
};
