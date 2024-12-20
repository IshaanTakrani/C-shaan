class Die {
	constructor(number) {
		this.number = number;
	}

	roll() {
		let max = Math.floor(this.number);
		return Math.floor(Math.random() * (max - 1 + 1)) + 1;
	}

	rollMultiple(numDie) {
		let roll_list = [];
		for (let i = 0; i < numDie; i++) {
			roll_list.push(this.roll());
		}
		return roll_list;
	}

	rollMultipleSum(numDie) {
		let roll_list = 0;
		for (let i = 0; i < numDie; i++) {
			roll_list += this.roll();
		}
		return roll_list;
	}
}

// let myDie = new Die(5)
// // console.log(myDie.roll());
// console.log(myDie.rollMultipleSum(5));

module.exports = Die;
// // let randomNumber = getRandomInt(1, 10);
// // console.log(randomNumber); // Output: A random integer between 1 and 10
