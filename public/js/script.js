var socket = io();

//var game = Game();
/**
 * Successfully connected to server event
 */
socket.on('connect', function () {
    console.log('Connected to server.');
    $('#waiting-room').show();
});

// socket.emit('init', window.location.pathname.substring(1, window.location.pathname.length));



/**
 * Users has joined a game
 */
socket.on('init', function (start) {
    console.log(start);
    $('#waiting-room').hide();
    $('#game').show();
    $('#game-number').html(start.gameId);
    Game.initGame();
})

/**
 * Update player's game state
 */
socket.on('update', function (gameState) {
    console.log(gameState);

    Game.setTurn(gameState.turn);


    //Game.updateGrid(gameState.gridIndex, gameState.grid);
});






$(".btn").on('click', () => {
    console.log($('p.lead')[0]);


})



function sendShot(field) {
    console.log('shot');
    console.log(field);
    socket.emit('shot', field);
}