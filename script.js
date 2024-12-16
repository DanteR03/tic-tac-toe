const gameBoard = (function () {
    const board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
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