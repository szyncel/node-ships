class Room {
    constructor() {
        this.rooms = [];
    }

    addRoom(name) {
        var room = {
            name: name,
            players:0
        };

        this.rooms.push(room);
        return room;
    }

    getRoom(name) {
        return this.rooms.filter((room) => room.name === name);
    }

    // getUser(id) {
    //     return this.users.filter((user) => user.id === id)[0];
    // }

    removeRoom(name) {

    }


    addUserToRoom(room, userId) {
        return this.rooms.filter((room) => room.players+=1);
    }

    // getNumbersOfPlayers(room) {
        
    //     const romek= this.rooms.filter((room) => room.name === room);
    //     return romek.players.length;
    // }

}

module.exports = Room;