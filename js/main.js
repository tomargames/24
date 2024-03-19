import Puzzle from "./puzzle.js";
import Stats from "./stats.js";

const puzzlePool = new Puzzles();
const targetNumber = 24;
const localStorageId = `tm${targetNumber}stats`;
const puzzleFileName = `puzzles${targetNumber}.json}`;
const stats = new Stats(localStorageId);
let puzzle = null;
const $ = (x) => { return document.getElementById(x); }	
const numberButtonColor = "olivedrab";
const disabledColor = "gray";
const parenColor = "goldenrod";
const operColor = "darkorange";
const navButtonColor = "indigo";
const defaultMessage = `Click on numbers and operators to make ${targetNumber}`;
const giveUpText = "Give Up";
const newPuzzleText = "New Puzzle";
import Puzzles from puzzleFileName;

// launch app
document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		initApp();
	}
});
const initApp = () => {
	// add listeners to operator buttons, puzzle buttons, and navigation buttons
	if (stats.getCurrentPuzzle() == null) {
		puzzle = getRandomPuzzle();
	} else {
		puzzle = new Puzzle(stats.getCurrentPuzzle());
	}
		refreshStats();
	let windowWidth = window.innerWidth;
	["parenLeft", "parenRight", "operPlus", "operMinus", "operMultiply", "operDivide", "arg0", "arg1", "arg2", "arg3"].forEach((item) => {
		let button = $(item);
		button.addEventListener("click", processArgumentClick);
		if (item.substring(0, 3) == "arg") {
			if (windowWidth <= 600) {
				button.style.fontSize = '2em';
			} else if (windowWidth <= 900) {
				button.style.fontSize = '2.5em';
			} else {
				button.style.fontSize = '3em';
			}
		}
	});
	$("navEvaluate").addEventListener("click", (event) => {
		let result = evaluateGuess(puzzle.getGuessAsString());
		if (result.toFixed(2) == targetNumber) result = targetNumber;
		if (result == targetNumber) {
			let numberOfGuesses = puzzle.getFeedback().length + 1;
			let g = (numberOfGuesses == 1) ? "guess" : "guesses";
			$("message").innerText = `You got it in ${numberOfGuesses} ${g}!`;
			stats.setTotalGuesses(stats.getTotalGuesses() + numberOfGuesses);
			stats.setTotalGames(stats.getTotalGames() + 1);
			stats.setTotalSolved(stats.getTotalSolved() + 1);
			stats.setCurrentStreak(stats.getCurrentStreak() + 1);
			if (stats.getCurrentStreak() > stats.getLongestStreak()) {
				stats.setLongestStreak(stats.getCurrentStreak());
			}
			stats.setCurrentPuzzle(null);
			setDisabled("navBack", true);
			setDisabled("navClear", true);
			let loseButton = $("navLose");
			loseButton.innerText = newPuzzleText;
			refreshStats();
		} else if (result == false) {
			alert("Invalid characters! Don't do that!");
		} else {
			let msg = `${guess.innerText} = ${result.toFixed(2)}`;
			$("message").innerText = `Sorry, ${msg}`;
			puzzle.addGuessToFeedback(msg);
			renderFeedback();
		}
		setDisabled("navEvaluate", true);		// true is disabled, false is enabled
	});
	$("navClear").addEventListener("click", (event) => {
		puzzle.clearGuess();
		[0, 1, 2, 3].forEach ((item) => {
			setDisabled(`arg${item}`, false);
		});
		$("guess").innerText = puzzle.getGuessAsString();
		$("message").innerText = defaultMessage;
		setDisabled("navEvaluate", true);
	});
	$("navBack").addEventListener("click", (event) => {
		let backSpaceInfo = puzzle.backSpace();
		$("guess").innerText = backSpaceInfo["guess"];
		if (backSpaceInfo["arg"] != null) {
			setDisabled(`arg${backSpaceInfo["arg"]}`, false);
		}
		validateEquation();
	});
	let navLose = $("navLose");
	navLose.addEventListener("click", (event) => {
		if (navLose.innerText == newPuzzleText) {
			puzzle = getRandomPuzzle();
			setUpGame();
			renderFeedback();
		} else {
			if (confirm("Sure you want to give up?") == true) {
				$("message").innerText = puzzle.getSolution(); 
				stats.setTotalGames(stats.getTotalGames() + 1);
				stats.setCurrentStreak(0);
				stats.setCurrentPuzzle(null);
				setDisabled("navBack", true);
				setDisabled("navClear", true);
				navLose.innerText = newPuzzleText;
				refreshStats();
			}
		}
	});
	setUpGame();
}
const refreshStats = () => {
	$("totalSolved").innerText = stats.getTotalSolved(); 
	$("totalPlayed").innerText = stats.getTotalGames(); 
	$("currentStreak").innerText = stats.getCurrentStreak(); 
	$("longestStreak").innerText = stats.getLongestStreak();
	$("totalGuesses").innerText = stats.getTotalGuesses();
	if (stats.getTotalGuesses() == 0) {
		$("averageGuesses").innerText = "--";
		$("solveRate").innerText = "--";
	} else {
		$("averageGuesses").innerText = (stats.getTotalGuesses()/stats.getTotalSolved()).toFixed(2);
		$("solveRate").innerText = (stats.getTotalSolved()/stats.getTotalGames()).toFixed(2);
	}
	stats.saveStatsObject(stats);
}
const setUpGame = () => {
	for (let i = 0; i < 4; i++) {
		let arg = puzzle.getArguments()[i];
		$(`arg${arg.getIndex()}`).innerText = arg.getValue();
		setDisabled(`arg${arg.getIndex()}`, false);
	}
	setDisabled("navEvaluate", true);			// true is disabled, false is enabled
	setDisabled("navBack", false);			// true is disabled, false is enabled
	setDisabled("navClear", false);			// true is disabled, false is enabled
	$("message").innerText = defaultMessage;
	$("guess").innerText = "";
	$("navLose").innerText = giveUpText;
}
const renderFeedback = () => {
	const list = puzzle.getFeedback();
	const container = $("feedbackItems");
	container.innerHTML = '';
	list.forEach((item) => {
		buildFeedbackItem(item, container);
	});
}
const validateEquation = () => {
	let validEquation = puzzle.validSolution();
	if (validEquation["valid"] == true) {
		setDisabled("navEvaluate", false);
		$("message").innerText = "Valid equation, you can check it!";
	} else {
		setDisabled("navEvaluate", true);
		$("message").innerText = validEquation["message"];
	}
}
const processArgumentClick = (e) => {
	$("message").innerText = "";
	if (e.target.id.substring(0, 3) == "arg") {
		puzzle.addTokenToGuess(e.target.id);
		setDisabled(e.target.id, true);
	} else {
		puzzle.addTokenToGuess($(e.target.id).innerText);
	}
	let puzzleString = puzzle.getGuessAsString();
	$("guess").innerText = puzzleString;
	validateEquation();
}
const buildFeedbackItem = (item, container) => {
	const div = document.createElement("div");
	div.className = "item";
	div.innerText = item;
	container.appendChild(div);
}
const setDisabled = (elemName, bool) => {
	let elem = $(elemName);
	elem.disabled = bool;
	if (bool == true) {
		elem.style.backgroundColor = disabledColor;
	} else {
		elem.style.backgroundColor = getButtonColor(elemName);
	}
	if (elemName.substring(0, 3) == "arg") {
		puzzle.getArguments()[puzzle.getArgumentByIndex(parseInt(elemName.substring(3)))].setDisabled(bool);
	}
}
const getButtonColor = (elemName) => {
	if (elemName.substring(0, 3) == "arg") {
		return numberButtonColor;
	} else if (elemName.substring(0, 5) == "paren") {
		return parenColor;
	} else if (elemName.substring(0, 4) == "oper") {
		return operColor;
	} else {
		return navButtonColor;
	}
}
const evaluateGuess = (guess) => {
	const regex = /[^0-9+\-*/()]/;
	if (!regex.test(guess)) {
 		return false;
	} 
	return eval(guess);
}
const getRandomPuzzle = () => {
	let newPuzzle = puzzlePool.getRandomPuzzle();
	stats.setCurrentPuzzle(newPuzzle);
	return new Puzzle(newPuzzle);
}