var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ShipsGame = require('./app/game.js');
var Room = require('./app/room.js');
var rooms = new Room();


var port = 3000;

var users = {};
var gameIdCounter = 1;

// app.use(express.static(__dirname + '/public'));

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

    // create user object for additional data
    users[socket.id] = {
        inGame: null,
        player: null
    };



    socket.on('init', function (roomName) {

        if (rooms.getRoom(roomName).length) {
            if (rooms.getRoom(roomName)[0].players >= 2) {
                console.log('Pokój jest już pełny');
                return;

            } else {
                
                rooms.addUserToRoom(roomName, socket.id);
                socket.to(roomName).emit('playerJoined', {
                    info:"Możmy zaczynać"
                });
                console.log(rooms.getRoom(roomName)[0].players);
            }

        } else {
            
            console.log('tworzymy pokoj');
            rooms.addRoom(roomName);
            rooms.addUserToRoom(roomName, socket.id);
            console.log(rooms.getRoom(roomName)[0].players);
        }

        socket.join(roomName);
        socket.broadcast.to(roomName).emit('playerJoined', {
            roomName
        });

    })



    socket.on('disconnect', function () {
        console.log((new Date().toISOString()) + ' ID ' + socket.id + ' disconnected.');
        delete users[socket.id];
    });

    // joinWaitingPlayers();

});


// function joinWaitingPlayers() {
//     var players = io.sockets.adapter.rooms['waiting room'];
//     var playersTab = [];
//     for (var i in players.sockets) {
//         playersTab.push(i);
//     }



//     if (playersTab.length >= 2) {
//         console.log('mamy fula');

//         //var game = new ShipsGame(gameIdCounter++, playersTab[0], playersTab[1]);
//         io.to('test-room').emit('InitMessage', {
//             info: "Mamy 2"
//         });

//     }

// }