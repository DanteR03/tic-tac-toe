const gameBoard = (function () {
    const board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    function getBoard () {
        return board
    };
    return { getBoard }
})();

function createPlayer (name, marker) {
    const playerName = name;
    const playerMarker = marker;

    function getName () {
        return playerName;
    };
    function getMarker () {
        return playerMarker;
    };
    return { getName, getMarker };
}

const game = (function () {
    let currentPlayer = "X";
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
    return { checkWinner };
})();