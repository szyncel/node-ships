//var Ship = require('./ship.js');
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Player {
    constructor(id) {

        this.id = id;
        this.shots = [];
        this.shipGrid = [];
        //this.ships = [];

        for (var i = 0; i <= 9; i++) {
            this.shots[i] = [];
            this.shipGrid[i] = [];
            for (var j = 0; j <= 9; j++) {
                this.shots[i][j] = 0;
                this.shipGrid[i][j] = "empty";
            };
        };
        var rand = getRandomInt(0, 2);
        if (rand == 0) {
            this.generateShips(this.shipGrid);
        } else if (rand == 1) {
            this.generateShips2(this.shipGrid);
        } else {
            this.generateShips3(this.shipGrid);
        }



    }


    shoot(position) {
        if (this.shipGrid[position.x][position.y] == "ship") {
            this.shipGrid[position.x][position.y] = "sunk";
            this.shots[position.x][position.y] = 2;
            //hit
            return true;
        } else {
            //miss
            this.shots[position.x][position.y] = 1;
            return false;
        }

    }

    getSunkShips() {
        var i, sunkShips = [];
        for (var i = 0; i <= 9; i++) {
            sunkShips[i] = [];
            for (var j = 0; j <= 9; j++) {
                if (this.shipGrid[i][j] == "sunkShip") {
                    sunkShips[i][j] = 1;
                }

            };
        };
        return sunkShips;
    }



    generateShips(playerTab) {
        playerTab[0][1] = "ship";
        playerTab[0][2] = "ship";
        playerTab[0][3] = "ship";

        playerTab[2][4] = "ship";
        playerTab[2][5] = "ship";
        playerTab[2][6] = "ship";

        playerTab[4][2] = "ship";
        playerTab[4][3] = "ship";
        playerTab[4][4] = "ship";
        playerTab[4][5] = "ship";

        playerTab[6][6] = "ship";
        playerTab[6][7] = "ship";
        playerTab[6][8] = "ship";
        playerTab[6][9] = "ship";
    }
    generateShips2(playerTab) {
        playerTab[0][3] = "ship";
        playerTab[0][4] = "ship";
        playerTab[0][5] = "ship";

        playerTab[3][4] = "ship";
        playerTab[3][5] = "ship";
        playerTab[3][6] = "ship";

        playerTab[4][2] = "ship";
        playerTab[4][3] = "ship";
        playerTab[4][4] = "ship";
        playerTab[4][5] = "ship";

        playerTab[6][6] = "ship";
        playerTab[6][7] = "ship";
        playerTab[6][8] = "ship";
        playerTab[6][9] = "ship";
    }
    generateShips3(playerTab) {
        playerTab[1][4] = "ship";
        playerTab[1][5] = "ship";
        playerTab[1][6] = "ship";

        playerTab[4][0] = "ship";
        playerTab[4][0] = "ship";
        playerTab[4][0] = "ship";

        playerTab[4][3] = "ship";
        playerTab[4][4] = "ship";
        playerTab[4][5] = "ship";
        playerTab[4][6] = "ship";

        playerTab[8][6] = "ship";
        playerTab[8][7] = "ship";
        playerTab[8][8] = "ship";
        playerTab[8][9] = "ship";
    }
}

module.exports = Player;