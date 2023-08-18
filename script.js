const Player = (team) => {
    const turns = 0; 
    const returnTurns = () => {
        return turns;
    }
    const getTeam = () => {
        if (team === "x"){
            return 1;
        }
        else if (team === "o"){
            return 0;
        }
    }

    return {Player, getTeam, returnTurns};
    
}

//maybe the players should exist inside of the module for gameloop
// const player1 = Player(prompt("Player 1, what player you rooting for?"));
// const player2 = Player(prompt("What player you rooting for, Player 2?"));

// console.log(player1.getTeam());
// console.log(player2.getTeam());

const gameboard = (()=> {
    
    
    const board = document.querySelector(".board")

    
    

})();


const gameLoop = (()=> {
    //call gameboard to build
       
    let turn = 0; 
    const boardArr = [];
    const fields = document.querySelectorAll(".square");
    const updateBoardArr = (dataIndex)=>{
    let repeat = false;
    //check for duplicate clicks

        if(turn < 9 && boardArr[dataIndex] === undefined){ 
            //generate the pair of position and player for each turn (index) in boardArr
            repeat = false;
            if(turn%2 === 0){
                boardArr[dataIndex] = 'x';
            }
            else{
                boardArr[dataIndex] = 'o';
            }
            
           
            turn++;
            //call to change display
            //check # turns and call checkwin
            if(turn > 4 ){ 
                CheckWin.assessArr(boardArr, turn);
            }
        }   
        else if(boardArr[dataIndex] !== undefined){
            console.log("repeat was detected, returning now.");
            return boardArr;
        }
        
        console.log(boardArr);
    }
    
    fields.forEach(element =>{
        element.addEventListener("click", (e)=> {
            //send event information to map to what square was pressed
            const dataIndex = Number(e.currentTarget.getAttribute("data-index"));
            console.log(`data index is: ${dataIndex}`);
            mapBoardChoice(dataIndex);
            //check whos turn it is and mark choice
            //add player choice to array
            //add player turn 
            
        })
    })
    const mapBoardChoice = (dataIndex) => {
        if(dataIndex === null){
            return;
        }
        updateBoardArr(dataIndex);
        
        
    }

    
})();

const CheckWin = (()=> {

    let xCount = 0; 
    let oCount = 0; 
    const x = 'x';
    const o =  'o';
    let winner = false;
    const winningPatterns = [
        [0,1,2], 
        [0,3,6], 
        [0,4,8], 
        [1,4,7], 
        [2,4,6], 
        [2,5,8], 
        [3,4,5], 
        [6,7,8]
    ]; 
    const assessArr = (boardArr, turn)=> {
        for(let r = 0; r < winningPatterns.length; r++)
        {
            for(let c = 0, oCount = 0, xCount = 0; c < 3; c++)
            {
                let patternLocation = winningPatterns[r][c];
                if( boardArr[patternLocation] === x){
                    xCount++;
                }
                else if(boardArr[patternLocation] === o){
                    oCount++; 
                }
            
                if(xCount === 3){
                    console.log("x wins");
                    //xwins send method to trigger win
                    //update display
                    winner = true;
                    return;
                }
                else if(oCount === 3){
                    //xwins send method to trigger win
                    console.log("o wins");
                    //update display for owin
                    winner = true;
                    return;
                }
            }
            
            //use winning patterns to check the location of the boardArr and note if there are repeating 0s or xs 
            
        }
        if(!winner && turn > 7){
            console.log("There was a tie!");
            //trigger tie
            //update display
        }
        else{
            console.log("keep playing");
        }
    }

    return{assessArr: assessArr}
})();