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

    function checkMarkInBoard (index) {
        if (board[index] !== null) {
            return false;
        }  else {
            return true;
        }
    }

    return { getBoard, addMark, clearBoard, checkMarkInBoard };
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

    function initializeGame (name1, name2) {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");
        changeCurrentPlayer();
    }

    function resetGame () {
        player1 = undefined;
        player2 = undefined;
        currentPlayer = undefined;
        currentPlayerMark = undefined;
        gameBoard.clearBoard();
    }

    function playRound (index) {
        if (gameBoard.checkMarkInBoard(index) === true) {
            gameBoard.addMark(index, currentPlayerMark);
        if (checkWinner() === true) {
            currentPlayer.increaseScore();
        } else {
            changeCurrentPlayer ();
        }
        }
    }

    function getPlayers () {
        return [player1, player2]
    }

    return { initializeGame, playRound, resetGame, getPlayers };
})();

const displayController = (function (){
    const gameBoardCells = document.querySelectorAll(".cell");
    let status = "start";
    
    function addMoveListener () {
        const gameBoardContainer = document.querySelector(".board-container");
        gameBoardContainer.addEventListener("click", function(e) {
        game.playRound(e.target.dataset.index);
        renderGameBoard();
        displayVariables();
    })
};

    function renderGameBoard () {
        const gameBoardContent = gameBoard.getBoard();
        gameBoardCells.forEach((cell) => {
            cell.textContent = gameBoardContent[cell.dataset.index];
        });
    };

    function readNames () {
        const playerOneNameInput = document.querySelector("#player1")
        const playerTwoNameInput = document.querySelector("#player2")
        const playerOneName = playerOneNameInput.value || "Player 1";
        const playerTwoName = playerTwoNameInput.value || "Player 2";
        return [playerOneName, playerTwoName];
    }

    function addStartButtonListener () {
        const startButton = document.querySelector(".start-button")
        startButton.addEventListener("click", function() {
            const names = readNames();
            game.initializeGame(names[0], names[1]);
            addMoveListener();
            changeButtons();
            displayVariables();
        });
    };

    function changeButtons () {
        const startButton = document.querySelector(".start-button")
        const resetButton = document.querySelector(".reset-button")
        const restartButton = document.querySelector(".restart-button")
        const inputs = document.querySelectorAll(".playername-input");

        if (status === "start") {
            startButton.classList.add("hidden");
            resetButton.classList.remove("hidden");
            restartButton.classList.remove("hidden");
            inputs.forEach((input) => {
                input.classList.add("hidden");
            })
            status = "reset";
        }
        else {
            startButton.classList.remove("hidden");
            resetButton.classList.add("hidden");
            restartButton.classList.add("hidden");
            inputs.forEach((input) => {
                input.classList.remove("hidden");
            })
            status = "start";
        }
    }

    function addResetButtonListener () {
        const resetButton = document.querySelector(".reset-button")
        resetButton.addEventListener("click", function () {
            gameBoard.clearBoard();
            renderGameBoard();
        })
    }

    function addRestartButtonListener () {
        const restartButton = document.querySelector(".restart-button")
        restartButton.addEventListener("click", function () {
            game.resetGame();
            renderGameBoard();
            changeButtons();
        })
    }

    function displayVariables () {
        let players = game.getPlayers();
        const playerOneNameDisplay = document.querySelector(".player-one-name");
        const playerTwoNameDisplay = document.querySelector(".player-two-name");
        const playerOneScoreDisplay = document.querySelector(".player-one-score");
        const playerTwoScoreDisplay = document.querySelector(".player-two-score");
        playerOneNameDisplay.textContent = players[0].getName();
        playerTwoNameDisplay.textContent = players[1].getName();
        playerOneScoreDisplay.textContent = players[0].getScore();
        playerTwoScoreDisplay.textContent = players[1].getScore();
    }

    return { addStartButtonListener, addResetButtonListener, addRestartButtonListener }
})();

displayController.addStartButtonListener();
displayController.addResetButtonListener();
displayController.addRestartButtonListener();