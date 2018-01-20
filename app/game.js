var Player = require('./player.js');

class ShipsGame {
    constructor(id, idPlayer1, idPlayer2) {
        this.id = id;
        this.currentPlayer = Math.floor(Math.random() * 2);
        this.winningPlayer = null;
        this.players = [new Player(idPlayer1), new Player(idPlayer2)];


    }


    getPlayerId(player) {
        return this.players[player].id;
    };



    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    };

    shot(position) {
        var opponent = this.currentPlayer === 0 ? 1 : 0;

        if (this.players[opponent].shots[position.x][position.y] === 0) {
            if (!this.players[opponent].shoot(position)) {
                // Miss
                this.switchPlayer();
            }
        }

        console.log(position);

        //this.switchPlayer();
    }

    getGameState(player, gridOwner) {
        return {
            turn: this.currentPlayer === player,
            gridIndex: player === gridOwner ? 0 : 1,
            grid: this.getGrid(gridOwner, player !== gridOwner)
        };
    }


    getGrid(player, hideShips) {
        return {
            shots: this.players[player].shots,
            ships: hideShips ? this.players[player].getSunkShips() : this.players[player].shipGrid
        };
    }



}

module.exports = ShipsGame;