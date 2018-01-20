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

// chat
socket.on('chat', (msg) => {
    console.log(msg);
    $('.msg-container ul').append(`<li><b>${msg.name}</b>: ${msg.message}</li>`);
})

// $('#msg-form').on('submit', (e) => {
//     e.preventDefault();
//     console.log($('#message').val());
//     socket.emit('chat', $('#message').val());
// });


$('#message').bind("enterKey",function(e){
    // console.log(e.target.value);
    socket.emit('chat', e.target.value);
    $('#message').val('');
    //do stuff here
 });
 $('#message').keyup(function(e){
     if(e.keyCode == 13)
     {
         $(this).trigger("enterKey");
     }
 });


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
    $($('.shipLeft p')[0]).html(gameState.shipCount);
    //console.log("Pozostało: ",gameState.shipCount);

    Game.setTurn(gameState.turn);
    Game.updateGrid(gameState.gridIndex, gameState.grid);


    //Game.updateGrid(gameState.gridIndex, gameState.grid);
});


socket.on('gameover', function (isWinner) {
    Game.setGameOver(isWinner);
});







function sendShot(field) {
    //console.log('shot');
    //console.log(field);
    socket.emit('shot', field);
}