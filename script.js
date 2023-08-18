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
    const boardArr = [0,1,2,3,4,5,6,7,8];
    
    const board = document.querySelector(".board")

    
    

})();

const gameLoop = (()=> {
    //call gameboard to build
        //will need something here to connect the other object methods to this. 
    //store square event listeners
    const fields = document.querySelectorAll(".square");
    fields.forEach(element =>{
        element.addEventListener("click", (e)=> {
            //send event information to map to what square was pressed
            const dataIndex = Number(e.currentTarget.getAttribute("data-index"));
            mapBoardChoice(dataIndex);
            //check whos turn it is and mark choice
            //add player choice to array
            //add player turn 
            //count number of turns 
            //after three turns call module to check winner passing through info
            //store button and call for game reset
        })
    })
    const mapBoardChoice = (dataIndex) => {
        if(dataIndex === null){
            return;
        }

        //send to add the choice to array
        console.log(dataIndex);
        
    }
})();