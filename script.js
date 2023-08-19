const gameLoop = (()=> {
    //call gameboard to build
       
    let turn = 0; 
    const boardArr = [];
    const fields = document.querySelectorAll(".square");
    const fieldNodeList = [0,0,0,0,0,0,0,0,0];
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
            DisplayManager.UpdatePlayerChoice(dataIndex,boardArr[dataIndex]);
            //check # turns and call checkwin
            if(turn > 4 ){ 
                CheckWin.assessArr(boardArr, turn);
            }
        }   
        else if(boardArr[dataIndex] !== undefined){
            console.log("repeat was detected, returning now.");
            return boardArr;
        }
    }
    
    fields.forEach(element =>{
        element.addEventListener("click", (e)=> {
            //send event information to map to what square was pressed
            const dataIndex = Number(e.currentTarget.getAttribute("data-index"));
            fieldNodeList.splice(dataIndex, 0, e.currentTarget);
            mapBoardChoice(dataIndex);
        })
    })
    const mapBoardChoice = (dataIndex) => {
        if(dataIndex === null){
            return;
        }
        updateBoardArr(dataIndex);
    }
    const returnNodeList = () => {
        return fieldNodeList;
    }

    return{returnNodeList}
})();

const CheckWin = (()=> {

    let xCount = 0; 
    let oCount = 0; 
    const x = 'x';
    const o =  'o';
    const maxTurns = 8;
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
                    DisplayManager.displayWinner("Player 1 wins!");
                    winner = true;
                    return;
                }
                else if(oCount === 3){
                    //xwins send method to trigger win
                    console.log("o wins");
                    //update display for owin
                    DisplayManager.displayWinner("Player 2 wins!");
                    winner = true;
                    return;
                }
            }
            //use winning patterns to check the location of the boardArr and note if there are repeating 0s or xs 
            
        }
        if(!winner && turn > maxTurns){
            //trigger tie
            DisplayManager.displayWinner("It was a tie!");
            //update display
        }
        else{
            console.log("keep playing");
        }
    }

    return{assessArr: assessArr}
})();

const DisplayManager = (()=>{
    const winText = document.querySelector(".winText");
    const restartBtn = document.querySelector("button");
    const nodeList = gameLoop.returnNodeList();
    restartBtn.addEventListener("click", ()=>{
        window.location.reload();
    })
    const UpdatePlayerChoice = (dataIndex, string) =>{
        // console.log(nodeList[dataIndex]);
        const span = nodeList[dataIndex].querySelector('span');
        if(span){
            span.textContent = string;
        }
        else {
            console.log("no <span> element found");
        }
    }
    const displayWinner = (string) => {
        winText.textContent = string; 
    }
    return{UpdatePlayerChoice, displayWinner}
})();