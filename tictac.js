const gameBoard = (function () {
  let board = [null, null, null, null, null, null, null, null, null];

  function addSymbol(symbol) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.removeEventListener("click", e => {
        board[e.target.dataset.num] = symbol;
      });
    });
    cells.forEach(cell => {
      cell.addEventListener("click", e => {
        board[e.target.dataset.num] = symbol;
      });
    });
  };

  return {
    board: board,
    addSymbol: addSymbol,
  }
})();

const displayController = (function () {
  function displayBoard() {
    const one = document.querySelector("#cell1");
    one.textContent = gameBoard.board[0];
    const two = document.querySelector("#cell2");
    two.textContent = gameBoard.board[1];
    const three = document.querySelector("#cell3");
    three.textContent = gameBoard.board[2];
    const four = document.querySelector("#cell4");
    four.textContent = gameBoard.board[3];
    const five = document.querySelector("#cell5");
    five.textContent = gameBoard.board[4];
    const six = document.querySelector("#cell6");
    six.textContent = gameBoard.board[5];
    const seven = document.querySelector("#cell7");
    seven.textContent = gameBoard.board[6];
    const eight = document.querySelector("#cell8");
    eight.textContent = gameBoard.board[7];
    const nine = document.querySelector("#cell9");
    nine.textContent = gameBoard.board[8];
  };

  return {
    displayBoard: displayBoard,
  }
})();


