const statusDisplay = document.querySelector('.game--status');

let gameIsActive = true; // Spiel ist aktiv 
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const currentPlayerTurn = () => `Spieler ${currentPlayer} ist dran`; // Nachrichten für die Spieler
const winMessage = () => `Spieler ${currentPlayer} hat gewonnen!`;
const drawMessage = () => `Unentschieden!`;

statusDisplay.innerHTML = currentPlayerTurn(); // Anzeige des Spielers

const winningCombinations = [ // Gewinnmöglichkeiten als arrays
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];12

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
	
	let winField1 = 0;
	let winField2 = 0;
	let winField3 = 0;
	
    for (let i = 0; i <= 7; i++) { // for loop zum durchsuchen der Gewinnmöglichkeiten, gibt es einen Gewinner?
        const winCombination = winningCombinations[i];
        let a = gameState[winCombination[0]]; // Inhalt der ersten Zeile der Gewinnmöglichkeiten
        let b = gameState[winCombination[1]]; // Inhalt der zweiten Zeile der Gewinnmöglichkeiten
        let c = gameState[winCombination[2]]; // Inhalt der dritten Zeile der Gewinnmöglichkeitent
        if (a === '' || b === '' || c === '') { // Ist eins der Felder frei?
            continue; // Suche nach weiteren Gewinnmöglichkeiten 
        }
        if (a === b && b === c) { // Sind alle drei Felder mit dem selben Symbol markiert?
            roundWon = true; // Runde ist gewonnen
			winField1 = winCombination[0]; // Die drei cells die markiert werden müssen
			winField2 = winCombination[1];
			winField3 = winCombination[2];
            break // Hört auf weiter nach Gewinnen zu suchen
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winMessage();
        gameIsActive = false; // Spielrunde ist vorbei
		var elem = document.getElementById(""+winField1); //nimmt sich die divs raus, die markiert werden müssen
		var elem1 = document.getElementById(""+winField2);
		var elem2 = document.getElementById(""+winField3);
		elem.classList.add('winningcell'); // markiert die drei Gewinn-cells
		elem1.classList.add('winningcell');
		elem2.classList.add('winningcell');
        return;
    }

    let roundDraw = !gameState.includes(""); // Unentschieden
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage(); // Unentschieden Benachrichtigung
        gameIsActive = false; // Spielrunde vorbei
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameIsActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() { //entfernt die highlighted cells und x und o's 
    gameIsActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
	document.querySelectorAll('.cell').forEach(cell =>cell.classList.remove('winningcell'));
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);