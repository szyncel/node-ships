var socket = io();


/**
 * Pomyślnie połączono z serverem
 */
socket.on('connect', function () {
    console.log('Connected to server.');
    $('#waiting-room').show();
});




socket.on('chat', (msg) => {
    $('.msg-container ul').append(`<li><b>${msg.name}</b>: ${msg.message}</li>`);
});



// $('#msg-form').on('submit', (e) => {
//     e.preventDefault();
//     console.log($('#message').val());
//     socket.emit('chat', $('#message').val());
// });


$('#message').bind("enterKey",function(e){
    socket.emit('chat', e.target.value);
    $('#message').val('');
 });
 $('#message').keyup(function(e){
     if(e.keyCode == 13)
     {
         $(this).trigger("enterKey");
     }
 });


/**
 * Gracz dołączył do gry
 */
socket.on('init', function (start) {
    console.log(start);
    $('#waiting-room').hide();
    $('#game').show();
    $('#game-number').html(start.gameId);
    Game.initGame();
})

/**
 * Aktualizacja stanu gry
 */
socket.on('update', function (gameState) {
    console.log(gameState);
    $('.remaing').show();
    $('#left').html(gameState.shipCount);
    
    Game.setTurn(gameState.turn);
    Game.updateGrid(gameState.gridIndex, gameState.grid);

});


socket.on('gameover', function (isWinner) {
    Game.setGameOver(isWinner);
});







function sendShot(field) {
    socket.emit('shot', field);
}