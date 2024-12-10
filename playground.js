const rl = require('readline-sync');
module.exports = class Playground
{
    constructor(){};
    showField = () => {
        let output = "";
        for(let i = 0; i < this.field.length;++i){
            for(let j = 0; j < this.field[i].length;++j){
                output += this.field[i][j]
                if(j <= 1) 
                    {
                        output += "⏐"
                    }
            }
            if(i <= 1) 
            {
                output +='\n'
                output += "-----";
                output +='\n'
            }
        }
        console.log(output);
    } 
    checkFullField = () => {
        let full = true;
        for(let i = 0; i < this.field.length;++i){
            for(let j = 0; j < this.field[i].length;++j){
                if(this.field[i][j] == " ")
                {
                    
                    full = false;
                    return full;
                }
            }
        }
        return full;
    }
    isGameWon = (playerList) => {
        let isWon = false;
        let playerListChars = [playerList[0].getPlayerChar(), playerList[1].getPlayerChar()];
        const checkFunctionsAvailable = [
        //Player 1 Checks
        [
            //rowOneCheckP1
            function(field){return ((field[0][0] === playerListChars[0] && field[0][1] === playerListChars[0] && field[0][2] === playerListChars[0]))},
            //rowTwoCheckP1
            function(field){return ((field[1][0] === playerListChars[0] && field[1][1] === playerListChars[0] && field[1][2] === playerListChars[0]))},
            //rowThreeCheckP1
            function(field){return ((field[2][0] === playerListChars[0] && field[2][1] === playerListChars[0] && field[2][2] === playerListChars[0]))},
            //colOneCheckP1
            function(field){return (field[0][0] === playerListChars[0] && field[1][0] === playerListChars[0] && field[2][0] === playerListChars[0])},
            //colTwoCheckP1
            function(field){return (field[0][1] === playerListChars[0] && field[1][1] === playerListChars[0] && field[2][1] === playerListChars[0])},
            //colThreeCheckP1
            function(field){return (field[0][2] === playerListChars[0] && field[1][2] === playerListChars[0] && field[2][2] === playerListChars[0])},
            //leftToRightCheckP1
            function(field){return (field[0][0] === playerListChars[0] && field[1][1] === playerListChars[0] && field[2][2] === playerListChars[0])},
            //rightToLeftCheckP1
            function(field){return (field[0][2] === playerListChars[0] && field[1][1] === playerListChars[0] && field[2][0] === playerListChars[0])},
        ],
        //Player 2 Checks
        [
            //rowOneCheckP2
            function(field){return ((field[0][0] === playerListChars[1] && field[0][1] === playerListChars[1] && field[0][2] === playerListChars[1]))},
            //rowTwoCheckP2
            function(field){return ((field[1][0] === playerListChars[1] && field[1][1] === playerListChars[1] && field[1][2] === playerListChars[1]))},
            //rowThreeCheckP2
            function(field){return ((field[2][0] === playerListChars[1] && field[2][1] === playerListChars[1] && field[2][2] === playerListChars[1]))},
            //colOneCheckP2
            function(field){return (field[0][0] === playerListChars[1] && field[1][0] === playerListChars[1] && field[2][0] === playerListChars[1])},
            //colTwoCheckP2
            function(field){return (field[0][1] === playerListChars[1] && field[1][1] === playerListChars[1] && field[2][1] === playerListChars[1])},
            //colThreeCheckP2
            function(field){return (field[0][2] === playerListChars[1] && field[1][2] === playerListChars[1] && field[2][2] === playerListChars[1])},
            //leftToRightCheckP2
            function(field){return (field[0][0] === playerListChars[1] && field[1][1] === playerListChars[1] && field[2][2] === playerListChars[1])},
            //rightToLeftCheckP2
            function(field){return (field[0][2] === playerListChars[1] && field[1][1] === playerListChars[1] && field[2][0] === playerListChars[1])}]
        ]
        //specify which checks to use
        const checkFunctionArr = []
        const maxPlayers = 2
        for(let currentPlayer = 0; currentPlayer < maxPlayers; ++currentPlayer)
        {
            if(this.field[0][0] === playerListChars[currentPlayer]) 
            {
                checkFunctionArr.push(checkFunctionsAvailable[currentPlayer][0], checkFunctionsAvailable[currentPlayer][3], checkFunctionsAvailable[currentPlayer][6])
            }
            if(this.field[1][1] === playerListChars[currentPlayer])
            {
                checkFunctionArr.push(checkFunctionsAvailable[currentPlayer][1], checkFunctionsAvailable[currentPlayer][4], checkFunctionsAvailable[currentPlayer][7])
            }
            if(this.field[2][2] === playerListChars[currentPlayer])
            {
                checkFunctionArr.push(checkFunctionsAvailable[currentPlayer][2], checkFunctionsAvailable[currentPlayer][5])
            }
        }
        for(let currentFunction = 0; currentFunction < checkFunctionArr.length; ++currentFunction)
        {
            if(checkFunctionArr[currentFunction](this.field))
            {
                isWon = true;
            }
        }
        return isWon;
    }
    addInPlace = (value) => {
        let isSuccess = "failed";
        let inValidInput = true;
        let row = 0;
        let column = 0; 
        let didLoop = false;
        while(inValidInput) {
            if(didLoop) console.log("Wrong input, try again.")
            //get row input
            row = Number.parseInt(rl.question('Enter your row (1-3)')) - 1;
            if(Number.isNaN(row) || (row < 0 || row > 2))
            {
                didLoop = true;
                continue;
            }
            
            
            //get column input
            column = Number(rl.question('Enter your column (1-3)')) - 1;
            if(Number.isNaN(column) || (column < 0 || column > 2))
            {
                didLoop = true;
                continue;
            }
            
            //can carelessly just approve Inputs since we checked all of them and repeat loop if something is wrong.
            inValidInput = false;
        }
        
        if(this.field[row][column] === " ")
            {
                this.field[row][column] = value;
                isSuccess = "success";
            }
            else 
            {
                console.log("Field is already used");
                isSuccess = "failed";
            }
        return isSuccess;
    }
    getfieldData = () => {
        return this.field;
    }
    field = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
}