// Your code here
import { checkWin } from "/winners.js";

window.addEventListener("DOMContentLoaded", () => {

  let result = document.getElementById("result");
  let boardContainer = document.getElementById("board-container");
  let newGameButton = document.getElementById("new-game");
  let resetButton = document.getElementById("give-up");

  let grid = JSON.parse(localStorage.getItem("grid"));
  if (!grid) {
    grid =
    [ [null, null, null],
      [null, null, null],
      [null, null, null] ]
  }

  let currentMove = localStorage.getItem("currentMove");
  if (!currentMove) {
    currentMove = "x";
  }

  let winner = localStorage.getItem("winner");
  console.log(typeof winner, winner);

  //update storage
  let updateStorage = () => {
    localStorage.setItem("currentMove", currentMove);
    localStorage.setItem("grid", JSON.stringify(grid));
    localStorage.setItem("winner", winner);
  }

  //listen for clicks on the board
  const boardClickListener = (event) => {
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;
    updateSquare(row, col);
  }

  //address winner
  const addressWinner = () => {
    //show result
    result.innerText = `Winner: ${winner.toUpperCase()}`;
    result.classList.remove("hidden");

    //enable new game button
    newGameButton.removeAttribute("disabled");

    //disable give up
    resetButton.setAttribute("disabled", "");

    //disable clicks on board
    boardContainer.removeEventListener("click", boardClickListener)
  }

  //populate board
  const fillBoard = (grid) => {
    let board = document.createElement("div");
    board.id = "board";
    grid.forEach(
      (row, rowIndex) => {
        row.forEach(
          (element, columnIndex) => {
            let square = document.createElement("div");
            square.setAttribute("data-row", rowIndex);
            square.setAttribute("data-col", columnIndex);
            square.className = "square";
            square.id = `S${rowIndex}${columnIndex}`;
            //if a move has been stored, fill with correct svg
            if (element) {
              square.innerHTML = `<embed src='./player-${element}.svg'></embed>`;
            }
            board.append(square);
          }
        );
      }
    );

    boardContainer.append(board);
    boardContainer.addEventListener("click", boardClickListener);

    //if a winner already exists in local storage
    if (winner && winner !== "undefined") {
      addressWinner();
    }

  }

  fillBoard(grid);
  updateStorage();

  //update a square given a row and column
  const updateSquare = (row, col) => {

    //grid must contain null at row, col for valid move
    if (grid[row][col] === null) {

      let id = "S" + row + col;
      let targetSquare = document.getElementById(id);
      targetSquare.innerHTML = `<embed src='./player-${currentMove}.svg'></embed>`;
      grid[row][col] = currentMove;

      //check for wins
      winner = checkWin(grid);
      if (winner) {
        addressWinner();
      }

      //if no win
      if (currentMove === "x") {
        currentMove = "o";
      } else if (currentMove === "o") {
        currentMove = "x";
      }
    }

    updateStorage();
  }



  //create a new game
  const newGame = (event) => {

    let oldBoard = document.getElementById("board");
    oldBoard.remove();
    grid =
      [ [null, null, null],
        [null, null, null],
        [null, null, null] ];

    fillBoard(grid);
    result.classList.add("hidden");
    newGameButton.setAttribute("disabled", "");
    resetButton.removeAttribute("disabled");
    boardContainer.addEventListener("click", boardClickListener);
    localStorage.clear();
  }

  //reset game
  const reset = (event) => {
    winner = currentMove;
    updateStorage();
    addressWinner();
    boardContainer.removeEventListener("click", boardClickListener);
    newGameButton.removeAttribute("disabled");
    resetButton.setAttribute("disabled", "");
  }

  newGameButton.addEventListener("click", newGame);
  resetButton.addEventListener("click", reset);

});
