import Argument from "./argument.js";
export default class Puzzle {
	constructor(puzzle) {
		// console.log(puzzle);
		this._arguments = [];
		let args = "0123";
		puzzle["puz"].forEach((item, index) => {
			let rnd = Math.floor(Math.random() * args.length);
			let idx = parseInt(args.substring(rnd, rnd + 1));
			// console.log(`selected index ${idx} for item ${item}`);
			this._arguments.push(new Argument(index, idx, item));
			args = `${args.substring(0, rnd)}${args.substring(rnd + 1)}`;
			// console.log(`args is now ${args}`);
		});
		// console.log(this._arguments);
		this._solution = puzzle["sol"];
		this._feedback = [];
		this._guess = [];
	}
	clearGuess() {
		this._guess = [];
	}
	backSpace() {
		if (this._guess.length > 0) {
			let item = this._guess.pop();
			if (typeof(item) != "string") {
				item.setDisabled(false);
				return {"guess": this.getGuessAsString(), "arg": item.getIndex()};
			} else {
				return {"guess": this.getGuessAsString(), "arg": null};
			}
		} else {
			return {"guess": this.getGuessAsString(), "arg": null};
		}
	}
	validSolution() {
		let allArgumentsUsed = true, result = null;
		for (let i = 0; i < this._arguments.length; i++) {
			if (this._arguments[i].getDisabled() == false) {
				allArgumentsUsed = false;
				break;
			}
		}
		try {
			result = eval(this.getGuessAsString());
		} catch (error) {
			return {"valid": false, "message": error};
		}
		if (!allArgumentsUsed) {
			return {"valid": false, "message": "Must use all the numbers"};
		}
		return {"valid": true, "message": result};
	}
	getFeedback() {
		return this._feedback;
	}
	getArguments() {
		return this._arguments;
	}
	getArgumentByIndex(idx) {
		for (let i = 0; i < this._arguments.length; i++) {
			if (this._arguments[i].getIndex() == idx) {
				return i;
			}
		}
	}
	setArguments(list) {
		this._arguments = list;
	}
	getSolution() {
		return this._solution;
	}
	setSolution(solution) {
		this._solution = solution;
	}
	addGuessToFeedback(text) {
		this._feedback = [text].concat(this._feedback);
	}
	getFeedback() {
		return this._feedback;
	}
	getGuessAsString() {
		let guessDisplay = [];
		this._guess.forEach((item) => {
			if (typeof(item) == "string") {
				guessDisplay.push(item);
			} else {
				guessDisplay.push(item.getValue());
			}
		});
		return guessDisplay.join(" ");
	}
	addTokenToGuess(x) {
		if (x.length < 4) {
			this._guess.push(x);
		} else {
			let idx = parseInt(x.substring(3));
			for (var i = 0; i < 4; i++) {
				if (this._arguments[i]._index == idx) {
					this._guess.push(this._arguments[i]);
					this._arguments[i].setDisabled(true);
				}
			}
		}
		// console.log(this._guess);
	}
}