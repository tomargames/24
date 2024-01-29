import Puzzle from "./puzzle.js";
import Stats from "./stats.js";
import Puzzles from "./puzzles.js";

const puzzlePool = new Puzzles();
const stats = new Stats();
let puzzle = null;
if (stats.getCurrentPuzzle() == null) {
	puzzle = new Puzzle(puzzlePool.getRandomPuzzle());
} else {
	puzzle = new Puzzle(stats.getCurrentPuzzle());
}
const $ = (x) => { return document.getElementById(x); }	
const numberButtonColor = "olivedrab";
const evalButtonColor = "indigo";
const disabledColor = "gray";

// launch app
document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		initApp();
	}
});

const initApp = () => {
	$("totalSolved").innerText = stats.getTotalSolved(); 
	$("totalPlayed").innerText = stats.getTotalGames(); 
	$("currentStreak").innerText = stats.getCurrentStreak(); 
	$("longestStreak").innerText = stats.getLongestStreak();
	for (let i = 0; i < 4; i++) {
		$(`arg${i}`).innerText = puzzle.getArguments()[i].getValue();
	}
	// add listeners to operator buttons, puzzle buttons, and navigation buttons
	["leftParen", "rightParen", "plusSign", "minusSign", "multiplicationSign", "divisionSign", "arg0", "arg1", "arg2", "arg3"].forEach((item) => {
		$(item).addEventListener("click", processArgumentClick);
	});
	const evalButton = $("evaluate");
	evalButton.addEventListener("click", (event) => {
		console.log("got here");
	});
	evalButton.setAttribute("disabled", true);
	evalButton.style.backgroundColor = disabledColor;
}
const renderFeedback = () => {
	const list = puzzle.getFeedback();
	list.forEach((item) => {
		buildFeedbackItem(item);
	});
}
const processArgumentClick = (e) => {
	let elem = $(e.target.id);
	puzzle.addTokenToGuess(elem.innerText);
	if (["arg0", "arg1", "arg2", "arg3"].includes(e.target.id)) {
		elem.style.backgroundColor = disabledColor;
		elem.setAttribute("disabled", true);
		puzzle.getArguments()[partseInt(e.target.id.substring(3))].setDisabled(true);
	}
	$("guess").innerText = puzzle.getGuessAsString();
	if (puzzle.validSolution() == true) {
		$("evaluate").disabled = false;
	}
}
const buildFeedbackItem = (item) => {
	const div = document.createElement("div");
	div.className = "item";
	const container = $("feedbackItems");
	container.appendChild(div);
}

const addClickListenerToCheckbox = (checkbox) => {
	checkbox.addEventListener("click", (event) => {
		toDoList.removeItemFromList(checkbox.id);
		updatePersistentData(toDoList.getList());
		setTimeout(() => {
			refreshThePage();
		}, 1000);
	});
}
const updatePersistentData = (listArray) => {
	localStorage.setItem("tm24stats", JSON.stringify(stats));
}
const processSubmission = () => {
	const newEntryText = getNewEntry();
	if (!newEntryText.length) return;
	const nextItemId = calcNextItemId();
	const toDoItem = createNewItem(nextItemId, newEntryText);
	toDoList.addItemToList(toDoItem);
	updatePersistentData(toDoList.getList()); 
	refreshThePage();
}
