const { SlashCommandBuilder } = require('discord.js');
// exports makes it so that this can be ''required in other files
module.exports = {
	data: new SlashCommandBuilder()
		.setName('greet')
		.setDescription('Send a greeting!')
		.addStringOption((option) =>
			option.setName('person').setDescription('individual to greet')
		),
	async execute(interaction) {
		// const message = await interaction.fetchReply();
		let person =
			interaction.options.getString('person') ?? interaction.user.username;
		console.log(typeof interaction.user.id);

		await interaction.reply(`Hello, ${person}`);
	},
};
