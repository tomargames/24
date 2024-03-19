export default class Stats {
	constructor(localStorageId) {
		this._totalGames = 0;
		this._totalGuesses = 0;
		this._totalSolved = 0;
		this._currentStreak = 0;
		this._longestStreak = 0;
		this._currentPuzzle = null;
		let statsObject = localStorage.getItem(localStorageId);
		if (typeof statsObject === "string") {
			let stored = JSON.parse(statsObject);
			this.setTotalGames(stored["_totalGames"]);
			this.setTotalSolved(stored["_totalSolved"]);
			this.setTotalGuesses(stored["_totalGuesses"]);
			this.setCurrentStreak(stored["_currentStreak"]);
			this.setLongestStreak(stored["_longestStreak"]);
			this.setCurrentPuzzle(stored["_currentPuzzle"]);
		}
	}
	saveStatsObject(jsonInput) {
		localStorage.setItem(localStorageId, JSON.stringify(jsonInput));
	}
	getCurrentPuzzle() {
		return this._currentPuzzle;
	}
	setCurrentPuzzle(puz) {
		this._currentPuzzle = puz;
	}
	getTotalGames() {
		return this._totalGames;
	}
	setTotalGames(value) {
		if (value > 0) this._totalGames = value;
	}
	getTotalGuesses() {
		return this._totalGuesses;
	}
	setTotalGuesses(value) {
		if (value > 0) this._totalGuesses = value;
	}
	getTotalSolved() {
		return this._totalSolved;
	}
	setTotalSolved(value) {
		if (value > 0) this._totalSolved = value;
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
		if (value > 0) this._longestStreak = value;
	}
}