const Player = require("./Player.js");
const Playground = require("./playground.js");

class referee 
{
    /**
     * 
     * @param {object} playfield Object of Playfield
     * @param {object} p1 First Player
     * @param {object} p2 Second Player
     */
    constructor(playground, player1, player2){
        this.playfield = playground;
        this.playerList[0] = player1;
        this.playerList[1] = player2;
    }

    /**
     * Checks if Game is Over, if Field is full or someone won.
     * @returns {boolean} 
     */
    checkIfGameEnd = () => {

        let gameOver = false;
        if (this.playfield.checkFullField()) gameOver = true;
        else if(this.playfield.isGameWon(this.playerList)) gameOver = true;
        
        return gameOver;
    }
    /**
     * Main Game Loop
     */
    gameLoop = () => {
        // 0 is Player 1 "X" and 1 is Player 2 "O"
        let activePlayer = 0;
        while(this.gameNotOver)
        {
            //round is starting
            this.playfield.showField();
            while(true){
                if(this.playfield.addInPlace(this.playerList[activePlayer].getPlayerChar()) === "success") break;
            }
            // round is over
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            // Reverse Result since we ask for opposite Statements.
            this.gameNotOver = !this.checkIfGameEnd()
        }
        // show Field in the End, so Players can look where they did end
        this.playfield.showField();
        console.log('wpwp');
}
    gameNotOver = true;
    playfield = {};
    playerList = []
}

const playfield = new Playground();
const player1 = new Player('X');
const player2 = new Player('O');
const game = new referee(playfield, player1, player2);
game.gameLoop();
//delete Game from Memory
delete playfield;
delete player1;
delete player2;
delete game;