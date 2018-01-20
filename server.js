var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ShipsGame = require('./app/game.js');
var Room = require('./app/room.js');
var rooms = new Room();
// var game = new ShipsGame();

var port = 3000;

var users = {};
var gameIdCounter = 1;



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
    // create user object for additional data

    socket.join('test');


    /**
     * Handle shot from client
     */
    socket.on('shot', (position) => {
        var game = users[socket.id].inGame,
            opponent;
        if (game !== null) {
            if (game.currentPlayer === users[socket.id].player) {
                opponent = game.currentPlayer === 0 ? 1 : 0;
                console.log('test:', socket.id);
                game.shot(position);

                // Update game state on both clients.
                io.to(socket.id).emit('update', game.getGameState(users[socket.id].player, opponent));
                io.to(game.getPlayerId(opponent)).emit('update', game.getGameState(opponent, opponent));

            }

        }
        //console.log(position);
    });



    socket.on('disconnect', function () {
        console.log((new Date().toISOString()) + ' ID ' + socket.id + ' disconnected.');
        delete users[socket.id];
    });


    joinWaitingPlayers();
});




function joinWaitingPlayers() {
    var players = io.sockets.adapter.rooms['test'];

    // for (var id in io.sockets.adapter.rooms['test']) {
    //     console.log(io.sockets.adapter.nsp.connected[id]);
    //   }

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