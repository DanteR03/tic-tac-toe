const gameBoard = (function () {
    let board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    function getBoard () {
        return board
    };

    function addMark (index, mark) {
        board[index] = mark;
    };

    function clearBoard () {
        board = [
          null, null, null,
          null, null, null,
          null, null, null
        ];
    };

    return { getBoard, addMark, clearBoard };
})();

function createPlayer (name, mark) {
    const playerName = name;
    const playerMark = mark;
    let playerScore = 0;

    function getName () {
        return playerName;
    };

    function getMark () {
        return playerMark;
    };

    function increaseScore () {
        playerScore++;
    }

    function getScore () {
        return playerScore;
    }

    return { getName, getMark, increaseScore, getScore };
}

const game = (function () {
    let currentPlayer;
    let currentPlayerMark;
    let player1;
    let player2;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner () {
        let winner = false;
        winningCombos.forEach((combo) => {
            let [a, b, c] = combo;
            let board = gameBoard.getBoard();
            if (board[a] === currentPlayerMark && board[a] === board[b] && board[a] === board[c]) {
                winner = true;
            }
        })
        return winner;
    };

    function changeCurrentPlayer () {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        currentPlayerMark = currentPlayer.getMark();
    };

    function initializeGame () {
        player1 = undefined;
        player2 = undefined;
        player1 = createPlayer(prompt("Player 1 name?"), "X");
        player2 = createPlayer(prompt("Player 2 name?"), "O");
        changeCurrentPlayer();
    }

    function playRound (index) {
        console.log(index, currentPlayerMark);
        gameBoard.addMark(index, currentPlayerMark);
        if (checkWinner() === true) {
            console.log(`${currentPlayer.getName()} wins!`);
            currentPlayer.increaseScore();
            gameBoard.clearBoard();
        } else {
            changeCurrentPlayer ();
        }
    }

    return { initializeGame, playRound };
})();

const displayController = (function (){
    const gameBoardContainer = document.querySelector(".board-container");
    const gameBoardCells = document.querySelectorAll(".cell");
    
    function addMoveListener () {
        gameBoardContainer.addEventListener("click", function(e) {
        game.playRound(e.target.dataset.index);
    })
};

    function renderGameBoard () {
        const gameBoardContent = gameBoard.getBoard();
        gameBoardCells.forEach((cell) => {
            cell.textContent = gameBoardContent[cell.dataset.index];
        });
    }

    return { addMoveListener, renderGameBoard }
})();