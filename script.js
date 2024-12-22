const gameBoard = (function () {
    const board = [
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

    return { getBoard, addMark };
})();

function createPlayer (name, marker) {
    const playerName = name;
    const playerMarker = marker;
    let playerScore = 0;

    function getName () {
        return playerName;
    };

    function getMarker () {
        return playerMarker;
    };

    function increaseScore () {
        playerScore++;
    }

    function getScore () {
        return playerScore;
    }

    return { getName, getMarker, increaseScore, getScore };
}

const game = (function () {
    let currentPlayer;
    let currentPlayerMarker;
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
        winningCombos.forEach((combo) => {
            let [a, b, c] = combo;
            let board = gameBoard.getBoard();
            if (board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c]) {
                console.log("WINNER");
            } else {
                console.log("LOSER");
            }
        })
    };

    function changeCurrentPlayer () {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        currentPlayerMarker = currentPlayer.getMarker;
    };

    function getCurrentPlayer () {
        return currentPlayer;
    };

    function initializeGame () {
        player1 = undefined;
        player2 = undefined;
        player1 = createPlayer(prompt("Player 1 name?"), "X");
        player2 = createPlayer(prompt("Player 2 name?"), "O");
    }

    return { checkWinner, changeCurrentPlayer, getCurrentPlayer, initializeGame };
})();