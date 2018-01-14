var socket = io();

var path=window.location.pathname.substring(1, window.location.pathname.length);
console.log(path);
socket.emit('init', window.location.pathname.substring(1, window.location.pathname.length));

socket.on('connect', function () {
    console.log('Connected to server.');
    // $('#disconnected').hide();
    // $('#waiting-room').show();
    var room = "test-room";
    socket.emit('join', room, (err) => {
        if (err) {
            alert(err);
        } else {
            console.log('No errors');
        }
    })
});


socket.on('playerJoined', (roomName) => {
    console.log("Player Joinedto:",roomName);
})

