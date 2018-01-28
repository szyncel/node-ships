// Wykorzystujemy framework Express, który umożliwi nam obsługę protokołu HTTP oraz Socket.IO
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ShipsGame = require('./app/game.js');

const port = process.env.PORT || 3000;

var users = {};
var gameIdCounter = 1;
var GameStatus = {
    inProgress: 1,
    gameOver: 2
}


app.use(express.static(__dirname + '/public/'));

app.locals.pretty = true;

app.get('/:room?', function (req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    });

});

http.listen(port, function () {
    console.log('listening on *:' + port);
});

io.on('connection', function (socket) {
    console.log((new Date().toISOString()) + ' ID ' + socket.id + ' connected.');

    users[socket.id] = {
        inGame: null,
        player: null
    };
    //Dołączamy do pokoju o nazwie "test"
    socket.join('test');

    // Nasłuchujemy eventu 'chat message', który zostaje wysłany przez klienta w momencie wysyłania wiadomości
    socket.on('chat', (msg) => {

        // Emitujemy  wiadomość do przeciwnika. Drugim parametrem przekazujemy treść wiadomości
        socket.broadcast.to('test').emit('chat', {
            name: 'Przeciwnik',
            message: msg,
        });
        // Emitujemy  wiadomość do siebie.
        io.to(socket.id).emit('chat', {
            name: 'Ja',
            message: msg,
        });
    })


    /**
     * Event służący do obsługi strzału przez graczy
     */
    socket.on('shot', (position) => {
        var game = users[socket.id].inGame,
            opponent;
        if (game !== null) {
            if (game.currentPlayer === users[socket.id].player) {
                opponent = game.currentPlayer === 0 ? 1 : 0;

                //obsługa strzału
                game.shot(position);

                //Sprawdzamy czy gra dobiegła końca
                checkGameOver(game);

                //Aktualizacja stanu gry obu graczy
                //Emitowanie  eventu dla aktualnego gracza
                io.to(socket.id).emit('update', game.getGameState(users[socket.id].player, opponent));
                //Emitowanie  eventu dla przeciwnika
                io.to(game.getPlayerId(opponent)).emit('update', game.getGameState(opponent, opponent));
            };
        };
    });


    /**
     * Event obługujący rozłączenie gracza z serwera
     */
    socket.on('disconnect', function () {
        console.log((new Date().toISOString()) + ' ID ' + socket.id + ' disconnected.');
        delete users[socket.id];
    });


    joinWaitingPlayers();
});




function joinWaitingPlayers() {
    var players = io.sockets.adapter.rooms['test'];
    var playersTab = [];
    for (var i in players.sockets) {
        playersTab.push(i);
    }

    if (playersTab.length == 2) {
        console.log('mamy fula');

        var game = new ShipsGame(gameIdCounter++, playersTab[0], playersTab[1]);
        var socket1 = io.sockets.connected[playersTab[0]];
        var socket2 = io.sockets.connected[playersTab[0]];
        // console.log(socket1);
        // socket1.leave('test');
        // socket2.leave('test');
        // socket1.join('game' + game.id);
        // socket2.join('game' + game.id);

        users[playersTab[0]].player = 0;
        users[playersTab[1]].player = 1;
        users[playersTab[0]].inGame = game;
        users[playersTab[1]].inGame = game;

        io.to('test').emit('init', {
            info: "Inicjalizacja",
            gameId: game.id
        });

        io.to(playersTab[0]).emit('update', game.getGameState(0, 0));
        io.to(playersTab[1]).emit('update', game.getGameState(1, 1));

    }

}


function checkGameOver(game) {
    if (game.gameStatus === GameStatus.gameOver) {
        console.log((new Date().toISOString()) + ' Game ID ' + game.id + ' ended.');
        console.log(`winner:`, game.getWinnerId());
        io.to(game.getWinnerId()).emit('gameover', true);
        io.to(game.getLoserId()).emit('gameover', false);
    }
}