import Argument from "./argument.js";
export default class Puzzle {
	constructor(puzzle) {
		console.log(puzzle);
		this._arguments = [];
		let args = "0123";
		puzzle["puz"].forEach((item) => {
			let idx = Math.floor(Math.random() * args.length);
			this._arguments.push(new Argument(idx, item));
			args = `${args.substring(0, args.indexOf(idx))}${args.substring(args.indexOf(idx) + 1)}`;
		});
		this._solution = puzzle["sol"];
		this._feedback = ["Feedback goes here"];
		this._guess = [];
	}
	validSolution() {
		let allArgumentsUsed = true;
		for (let i = 0; i < this._arguments.length; i++) {
			if (this._arguments[i].getDisabled() == false) {
				allArgumentsUsed = false;
				break;
			}
		}
		if (!allArgumentsUsed) { return false; }
		// check parentheses here
		return true;
	}
	getFeedback() {
		return this._feedback;
	}
	getArguments() {
		return this._arguments;
	}
	setArgumments(list) {
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
		this._guess.push(x);
	}
}