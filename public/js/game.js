var GameStatus = {
    inProgress: 1,
    gameOver: 2
}


var Game = (function () {
    var that = {};
    var gameStatus, turn = false;

    var table = $('.battlefield-table');

    grid = [];


    /**
     * Fire shot on mouse click event (if it's user's turn).
     */
    for (var i = 0; i <= 9; i++) {
        for (var j = 0; j <= 9; j++) {
            table[1].rows[i].cells[j].onclick = (e) => {
                if (turn) {
                    var field = e.target;
                    var shot = {
                        x: field.dataset.x,
                        y: field.dataset.y
                    }

                    // field.classList.remove('empty');
                    // field.classList.add('busy');

                    sendShot(shot);
                }
            };
        };
    };




    //..............................................
    that.initGame = () => {
        gameStatus = GameStatus.inProgress;

        // Create empty grids for player and opponent
        grid[0] = {
            shots: [],
            ships: []
        };
        grid[1] = {
            shots: [],
            ships: []
        };

        for (var i = 0; i <= 9; i++) {
            grid[0].shots[i] = [];
            grid[1].shots[i] = [];
            for (var j = 0; j <= 9; j++) {
                grid[0].shots[i][j] = 0;
                grid[1].shots[i] = [];

            };
        };

        //generateShips();
    }

    that.setGameOver = (winner) => {
        gameStatus = GameStatus.gameOver;
        turn = false;
        console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
        console.log(winner);
        $('#game').hide();
        $('#game-over').show();
        if (winner) {
            $('#game-over h3').html("Wygrałeś!");
            console.log('wygrana');
        } else {
            $('#game-over h3').html("Przegrałeś ;(");
            console.log('przegrana');
        }
    }


    that.setTurn = (turnState) => {
        if (gameStatus !== GameStatus.gameOver) {
            turn = turnState;
            if (turn) {
                $($('p.lead')[1]).removeClass("actualTurn");
                $($('p.lead')[0]).addClass("actualTurn");
               
            } else {
                $($('p.lead')[0]).removeClass("actualTurn");
                $($('p.lead')[1]).addClass("actualTurn");
            }
        }
    }


    that.updateGrid = (player, gridState) => {
        console.log(`................................`);
        console.log('player:', player);
        console.log(gridState);
        grid[player] = gridState;
        drawGrid(player);
        drawShips(player);
    };


    drawGrid = (player) => {
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                if (grid[player].ships[i][j] == "ship") {
                    $(table[player].rows[i].cells[j]).addClass('busy');
                }
            };
        };
    };

    drawShips = (player) => {
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                if (grid[player].shots[i][j] == "2") {
                    $(table[player].rows[i].cells[j]).addClass('sunk');
                } else if (grid[player].shots[i][j] == "1") {
                    $(table[player].rows[i].cells[j]).addClass('miss');
                }
            };
        };
    };








    return that;
})();