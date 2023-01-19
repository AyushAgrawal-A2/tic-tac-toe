const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".text");
const restart = document.querySelector(".restart");
const TURN_CLASSES = ["o", "x"];
const STATUS_TEXT = [
  " O's turn",
  " X's turn",
  " O's Win..!!!",
  " X's Win..!!!",
  " Draw",
];
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn;

restart.addEventListener("click", startGame);
startGame();

function startGame() {
  turn = getTurn();
  setBoardClass();
  setStatusText();
  cells.forEach((cell) => {
    cell.classList.remove(TURN_CLASSES[0]);
    cell.classList.remove(TURN_CLASSES[1]);
    cell.classList.remove("zoom");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  if (turn > 1) return;
  addCellClass(e.target);
  if (checkWin()) {
    animateCells();
    turn += 2;
    endGame();
    return;
  }
  if (checkDraw()) {
    turn = 4;
    endGame();
    return;
  }
  swapTurn();
  setStatusText();
  setBoardClass();
}

function endGame() {
  setStatusText();
  clearBoardClass();
}

function getTurn() {
  return Math.floor(Math.random() * 2);
}

function addCellClass(cell) {
  cell.classList.add(TURN_CLASSES[turn]);
}

function swapTurn() {
  turn = 1 - turn;
}

function setBoardClass() {
  board.classList.remove(TURN_CLASSES[1 - turn]);
  board.classList.add(TURN_CLASSES[turn]);
}

function clearBoardClass() {
  board.classList.remove(TURN_CLASSES[0]);
  board.classList.remove(TURN_CLASSES[1]);
}

function setStatusText() {
  status.dataset.text = STATUS_TEXT[turn];
}

function checkWin() {
  return WIN_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(TURN_CLASSES[turn]);
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    return TURN_CLASSES.some((TURN_CLASS) =>
      cell.classList.contains(TURN_CLASS)
    );
  });
}

function animateCells() {
  const winCombination = WIN_COMBINATIONS.find((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(TURN_CLASSES[turn]);
    });
  });
  winCombination.forEach((index) => {
    cells[index].classList.add("zoom");
  });
}
