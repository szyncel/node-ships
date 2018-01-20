var Player = require('./player.js');

var GameStatus = {
    inProgress: 1,
    gameOver: 2
}

class ShipsGame {
    constructor(id, idPlayer1, idPlayer2) {
        this.id = id;
        this.currentPlayer = Math.floor(Math.random() * 2);
        this.winningPlayer = null;
        this.players = [new Player(idPlayer1), new Player(idPlayer2)];
        this.gameStatus = GameStatus.inProgress;


    }


    getPlayerId(player) {
        return this.players[player].id;
    };

    getWinnerId() {
        if (this.winningPlayer === null) {
            return null;
        }
        return this.players[this.winningPlayer].id;
    }

    getLoserId() {
        if (this.winningPlayer === null) {
            return null;
        }
        var loser = this.winningPlayer === 0 ? 1 : 0;
        return this.players[loser].id;
    }




    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    };

    shot(position) {
        var opponent = this.currentPlayer === 0 ? 1 : 0;

        if (this.players[opponent].shots[position.x][position.y] === 0 && this.gameStatus === GameStatus.inProgress) {
            if (!this.players[opponent].shoot(position)) {
                // Miss
                this.switchPlayer();
            }

            // Check if game over
            if (this.players[opponent].getShipsLeft() <= 0) {
                //console.log(this.players[opponent].getShipsLeft());
                console.log('test;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
                this.gameStatus = GameStatus.gameOver;
                this.winningPlayer = opponent === 0 ? 1 : 0;
                console.log(this.winningPlayer);
            }

            return true;

        }

        return false;




        //this.switchPlayer();
    }

    getGameState(player, gridOwner) {
        //console.log(`test test: `player);
        return {
            turn: this.currentPlayer === player,
            gridIndex: player === gridOwner ? 0 : 1,
            grid: this.getGrid(gridOwner, player !== gridOwner),
            shipCount: this.players[player == 1 ? 0 : 1].getShipsLeft()
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