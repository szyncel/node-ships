var Player = require('./player.js');

class ShipsGame {
    constructor(id, idPlayer1, idPlayer2) {
        this.id = id;
        this.currentPlayer = Math.floor(Math.random() * 2);
        this.winningPlayer = null;

        this.players = [{
            id: idPlayer1
        }, {
            id: idPlayer2
        }];
        this.table1 = []; //First player
        this.table2 = []; //second player

        for (var i = 0; i <= 9; i++) {
            this.table1[i] = [];
            for (var j = 0; j <= 9; j++) {
                this.table1[i][j] = {
                    x: 0,
                    y: 0,
                    status: "0"
                };
            };
        };

        for (var i = 0; i <= 9; i++) {
            this.table2[i] = [];
            for (var j = 0; j <= 9; j++) {
                this.table2[i][j] = {
                    x: 0,
                    y: 0,
                    status: "1"
                };
            };
        };
    }


    getPlayerId(player) {
        return this.players[player].id;
      };



    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    };

    shot(position) {
        console.log(position);
        this.switchPlayer();
    }

    getGameState(player) {
        return {
            turn: this.currentPlayer === player,
            grid: player===0 ? this.table1 : this.table2
        }
        //return tralalal;
    }

}

module.exports = ShipsGame;