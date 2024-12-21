const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embedtest')
		.setDescription('Test embeds'),
	async execute(interaction) {
		// const exampleEmbed = new EmbedBuilder()
		// 	// .setColor(0xba2a2a)
		// 	.setColor(0x46ba2a)
		// 	.setTitle(`${interaction.user.username}'s diceroll results:`)

		// 	.addFields(
		// 		{
		// 			name: 'Results:',
		// 			value: `house rolled 3 and ${interaction.user.username} rolled 4\n ${interaction.user.username} wins!`,
		// 		},
		// 		{
		// 			name: 'Balance Changes:',
		// 			value: 'Old balance: 200 :coin:\nNew balance: 240 :coin:',
		// 		}
		// 	)

		// 	.setThumbnail(
		// 		interaction.user.displayAvatarURL({
		// 			dynamic: true,
		// 			size: 4096,
		// 		})
		// 	);

		const exampleEmbed = {
			color: 0x46ba2a,
			title: `${interaction.user.username}`,
			fields: [
				{
					name: 'Results:',
					value: `house rolled 3 and ${interaction.user.username} rolled 4\n ${interaction.user.username} wins!`,
				},
				{
					name: 'Balance Changes:',
					value: 'Old balance: 200 :coin:\nNew balance: 240 :coin:',
				},
			],
			thumbnail: {
				url: interaction.user.displayAvatarURL({
					dynamic: true,
					size: 4096,
				}),
			},
		};

		// const balanceEmbed = new EmbedBuilder()
		// 	.setColor(0x2a93ba)
		// 	.setTitle(`${interaction.user.username}'s balance:`)
		// 	.addFields({ name: 'Balance:', value: '200 :coin:' })
		// 	.setThumbnail(
		// 		interaction.user.displayAvatarURL({
		// 			dynamic: true,
		// 			size: 4096,
		// 		})
		// 	);

		const balanceEmbed = {
			color: 0x2a93ba,
			title: `${interaction.user.username}'s balance:`,
			fields: [{ name: 'Balance:', value: '200 :coin:' }],
			thumbnail: {
				url: interaction.user.displayAvatarURL({
					dynamic: true,
					size: 4096,
				}),
			},
		};

		await interaction.reply({ embeds: [exampleEmbed] });
	},
};
