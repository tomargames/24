export default class Stats {
	constructor() {
		this._totalGames = 0;
		this._totalSolved = 0;
		this._currentStreak = 0;
		this._longestStreak = 0;
		this._currentPuzzle = null;
		let statsObject = localStorage.getItem("tm24stats");
		if (typeof statsObject === "string") {
			let stored = JSON.parse(statsObject);
			this.setTotalGames(stored["totalGames"]);
			this.setTotalSolved(stored["totalSolved"]);
			this.setCurrentStreak(stored["currentStreak"]);
			this.setLongestStreak(stored["longestStreak"]);
			this.setCurrentPuzzle(stored["currentPuzzle"]);
		}
	}
	getCurrentPuzzle() {
		return this._currentPuzzle;
	}
	setCurrentPuzzle(puz) {
		this._currentPuzzle = puz;
	}
	saveStatsObject(jsonInput) {
		localStorage.setItem("tm24stats", JSON.stringify(jsonInput));
	}
	getTotalGames() {
		return this._totalGames;
	}
	setTotalGames(value) {
		this._totalGames = value;
	}
	getTotalSolved() {
		return this._totalSolved;
	}
	setTotalSolved(value) {
		this._totalSolved = value;
	}
	getCurrentStreak() {
		return this._currentStreak;
	}
	setCurrentStreak(value) {
		this._currentStreak = value;
	}
	getLongestStreak() {
		return this._longestStreak;
	}
	setLongestStreak(value) {
		this._longestStreak = value;
	}
}