const Player = (name, symbol) => {
  return { name, symbol };
}

const gameBoard = (function () {
  let board = [null, null, null, null, null, null, null, null, null];

  function addSymbol(input) {
    symbol = input;
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.removeEventListener("click", e => { insertSymbol(e) });
    });
    cells.forEach(cell => {
      cell.addEventListener("click", e => { insertSymbol(e) });
    });
  }

  function insertSymbol(index) {
    if (gameBoard.board[index.target.dataset.num] === null) {
      gameBoard.board[index.target.dataset.num] = symbol;
      displayController.displayBoard();
      checkVictory();
      if (symbol === "X") {
        symbol = "O";
      } else {
        symbol = "X";
      };
    };
  };

  return {
    board: board,
    addSymbol: addSymbol,
    insertSymbol: insertSymbol,
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
    five.textContent = gameBoard.board[4];;
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

const player1 = Player(prompt("Your name?"), prompt("Your symbol?"));

const player2 = Player(prompt("Your name?"), prompt("Your symbol?"));

gameBoard.addSymbol("X");

function checkVictory() {
  let victory = 0;
  let condition1 = [];
  condition1.push(gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]);
  let condition2 = [];
  condition2.push(gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]);
  let condition3 = [];
  condition3.push(gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]);
  let condition4 = [];
  condition4.push(gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]);
  let condition5 = [];
  condition5.push(gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]);
  let condition6 = [];
  condition6.push(gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]);
  let condition7 = [];
  condition7.push(gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]);
  let condition8 = [];
  condition8.push(gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]);
  let conditions = []
  conditions.push(condition1, condition2, condition3, condition4, condition5, condition6, condition7, condition8);
  conditions.forEach((condition) => {
    if (condition.every(symbol => symbol === player1.symbol) === true) {
      alert(`${player1.name} wins!`)
      victory = 1
    } else if (condition.every(symbol => symbol === player2.symbol) === true) {
      alert(`${player2.name} wins!`)
      victory = 1
    };
  });
  if (gameBoard.board.some(symbol => symbol === null) === false && victory === 0) {
    console.log("It's a tie!");
  };
};
