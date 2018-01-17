var GameStatus = {
    inProgress: 1,
    gameOver: 2
}


var Game = (function () {
    var that = {};
    var gameStatus, turn = false;

    var table = $('.battlefield-table');


    /**
     * Fire shot on mouse click event (if it's user's turn).
     */
    for (var i = 0; i <= 9; i++) {
        for (var j = 0; j <= 9; j++) {
            table[1].rows[i].cells[j].onclick = (e) => {
                if(turn){
                    var field = e.target;
                    var shot={
                        x:field.dataset.x,
                        y:field.dataset.y
                    }
                    
                    // field.classList.remove('empty');
                    // field.classList.add('busy');
                    
                    sendShot(shot);
                }      
            };
        };
    };



    // updateTable = (table) => {
    //     for (var i = 0; i <= 9; i++) {
    //         for (var j = 0; j <= 9; j++) {
    //             if ($(table[i][j].field).hasClass('busy')) {
    //                 table[i][j].status = "busy";
    //             } else if ($(table[i][j].field).hasClass('empty')) {
    //                 table[i][j].status = "empty";
    //             }
    //         };
    //     };
    // };
    //..............................................
    that.initGame = () => {
        gameStatus = GameStatus.inProgress;
        generateShips();
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


    that.updateGrid = () => {

    }


    generateShips = () => {
        // table1[0][1].field.classList.add('busy');
        // table1[0][2].field.classList.add('busy');
        // table1[0][3].field.classList.add('busy');

        // table1[2][4].field.classList.add('busy');
        // table1[2][5].field.classList.add('busy');
        // table1[2][6].field.classList.add('busy');

        // table1[4][2].field.classList.add('busy');
        // table1[4][3].field.classList.add('busy');
        // table1[4][4].field.classList.add('busy');
        // table1[4][5].field.classList.add('busy');

        // table1[6][6].field.classList.add('busy');
        // table1[6][7].field.classList.add('busy');
        // table1[6][8].field.classList.add('busy');
        // table1[6][9].field.classList.add('busy');

        // ...........

    }

    return that;
})();