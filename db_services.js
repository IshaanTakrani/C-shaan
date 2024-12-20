require('dotenv').config(); // Load environment variables from .env

const { createClient } = require('@supabase/supabase-js');
const balance = require('./commands/utility/balance');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

databaseService = {
	fetchBalance: async (id) => {
		const { data, error } = await supabase
			.from('userdata')
			.select('balance')
			.eq('userID', id)
			.single();
		return data;
	},

	updateBalance: async (id, username, newAmount) => {
		const { data, error } = await supabase
			.from('userdata')
			.upsert({ userID: id, username: username, balance: newAmount })
			.select();
	},
};

// databaseService
// 	.updateBalance('573901384718483466', 'eyechai', 509)
// 	.then((data) => {
// 		console.log(data);
// 	});

// databaseService.fetchBalance('573901384718483466').then((data) => {
// 	console.log(data);
// });

module.exports = {
	fetchBalance: async (id) => {
		const { data, error } = await supabase
			.from('userdata')
			.select('balance')
			.eq('userID', id)
			.single();
		return data;
	},

	updateBalance: async (id, username, newAmount) => {
		const { data, error } = await supabase
			.from('userdata')
			.upsert({ userID: id, username: username, balance: newAmount })
			.select();
	},
};
