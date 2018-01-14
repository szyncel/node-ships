var Player = require('./player.js');

class ShipsGame {
    constructor(id, idPlayer1, idPlayer2) {
        this.id = id;
        this.currentPlayer = Math.floor(Math.random() * 2);
        this.winningPlayer = null;

        this.players = [new Player(idPlayer1), new Player(idPlayer2)];
    }

}

module.exports = ShipsGame;