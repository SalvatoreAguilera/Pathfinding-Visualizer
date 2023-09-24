import {startX,startY, isDragging, dragEnd, dragSource} from "../events/draganddrop.js"

let Grid = [];  //Grid array
let visGrid = []; //visited grid 2D array
let flag = false; //flag for aniamtions to check when its running

let COLS=67;
let ROWS=30;

const screenWidth  = window.screen.width;
const screenHeight = window.screen.height


if (screenWidth < 1400){
    COLS = 48; //67
    ROWS = 24  //30
}else{
    COLS = 67;
    ROWS = 30;
}

function makeGrid(){
    let container = document.getElementById("container");
    let grid = [];
    let visitedGrid = [];
    for(let i=0;i<ROWS;i++){
        let row = document.createElement("div");
        row.className = "row row" + i+1;
        row.id = "row" + (i+1);
        grid[i] = [];
        visitedGrid[i] = [];
        for(let j=0;j<COLS;j++){
            let cell = document.createElement("div");
            cell.className = "cell cell" + ((i*ROWS)+(j+1));
            cell.id = "cell" + ((i*ROWS)+(j+1));   
            row.appendChild(cell);
            grid[i][j] = cell;
            visitedGrid[i][j] = false;            
        }
        container.appendChild(row);
    }
    
    grid[ROWS/2][COLS-35].classList.add("start");
    grid[ROWS/2][COLS-15].classList.add("end");
    

    Grid = grid;
    visGrid = visitedGrid;
    addWalls();   
    addImages();
    dragEnd();
    dragSource();
}


function addImages(){
    let start = document.getElementsByClassName("start")[0];
    let end = document.getElementsByClassName("end")[0];

    let img = document.createElement("img");
    img.src = "/images/greenImage.png";
    img.style.width = "19px";
    img.style.height =  "19px";
    img.id = "startImg";
    start.append(img);

    let img2 = document.createElement("img");
    img2.src = "/images/redimage.png";
    img2.style.width = "20px";
    img2.style.height =  "20px";
    img2.id = "endImg";
    end.append(img2)
}


function addWalls(){ 
    let draw = false;
    let wallRemoveFlag = false;
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(!Grid[i][j].classList.contains("end") || !Grid[i][j].classList.contains("start") || isDragging === false){
            Grid[i][j].addEventListener("mouseover", e=> {
                if(flag === false && wallRemoveFlag === true){
                    removeWalls(Grid,i,j);
                } 
                if(!draw) return;
                if(flag === false && !Grid[i][j].classList.contains("end") && !Grid[i][j].classList.contains("start") && e.button === 0){
                    Grid[i][j].classList.add("wall");
                    Grid[i][j].style.backgroundImage = "linear-gradient(black, black)"; 
                    Grid[i][j].style["-webkit-background-size"] = "100% 100%";
                }
            });
            Grid[i][j].addEventListener("mousedown", e=> {
                if(flag === false && !Grid[i][j].classList.contains("end") && !Grid[i][j].classList.contains("start") && e.button === 0){
                    Grid[i][j].classList.add("wall");
                    Grid[i][j].style.backgroundImage = "linear-gradient(black, black)"; 
                    Grid[i][j].style["-webkit-background-size"] = "100% 100%";
                    flag = false;    
                }
                if(e.button === 2 && flag === false){
                    removeWalls(Grid,i,j);                   
                } 
            });
            Grid[i][j].addEventListener("contextmenu", e => {
                e.preventDefault();
            });
            }
    
        }
    }
    

    window.addEventListener("mousedown", e =>{
        if(flag === false && e.button === 0){
            draw = true;
        }
        if(flag === false && e.button === 2){
            wallRemoveFlag = true;
        }
    
    });
    
    window.addEventListener("mouseup",() => {
        if(flag === false){
            draw = false;
            wallRemoveFlag = false; 
        }
        
    });
}

function removeWalls(Grid,x,y){
    if(Grid[x][y].classList.contains('wall') || Grid[x][y].style.backgroundImage.includes("linear-gradient(lightblue, lightblue)") || Grid[x][y].style.backgroundImage.includes("linear-gradient(red, red)")){
        Grid[x][y].classList.remove("wall");
        Grid[x][y].style.backgroundSize = "0% 0%";
    }
}


function setFlag(animating){        //setter for the flag
    flag = animating;
}

function setVistoFalse(visGrid){    //reset visited array to false
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            visGrid[i][j] = false;
        }
    }
}

function noPathResetFlag(len){      //if no path thus will reset the flag and visited cell array to false
    setTimeout(() =>{
        setFlag(false);
        setVistoFalse(visGrid);
    },len*14)
}

function clearBoard(){
    if(flag === false){
        let container = document.getElementById("container");
        container.innerHTML = '';
        makeGrid();
    }
}

function clearAlgo(){
    let cells = document.getElementsByClassName("cell");
    const arrayCells = Array.from(cells);
    arrayCells.forEach(cell => {
        if(cell.style.backgroundImage.includes("linear-gradient(lightblue, lightblue)")){
            cell.style.backgroundSize = "0% 0%";
        }
        if(cell.style.backgroundImage.includes("linear-gradient(red, red)")){
            cell.style.backgroundSize = "0% 0%";
        }
    })
    
} 

function clearWalls(){
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(Grid[i][j].style.backgroundImage.includes("linear-gradient(black, black)")){
                Grid[i][j].style.backgroundSize = "0% 0%";
                Grid[i][j].classList.remove("wall");
            }
        }
    }
}

function changeColor(grid,x,y,len) {
    setTimeout (() => {
        if(!grid[x][y].classList.contains("start") && !grid[x][y].classList.contains("end")){
            grid[x][y].style.backgroundImage = "linear-gradient(lightblue, lightblue)"; 
            grid[x][y].style["-webkit-background-size"] = "100% 100%";
            flag = true;
        }
    },(len*14));
}

function shortestPathAlgo(grid,len) {
    let shortestPath = [];
    let [endX,endY] = [ROWS - 1, COLS - 1];
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(grid[i][j].classList.contains("end")){
                [endX,endY] = [i,j];
            }
        }
    }

    let currentCell = [endX, endY];
  
    while (currentCell[0] !== startX || currentCell[1] !== startY) {
        shortestPath.push(currentCell);
        const [a, b] = currentCell;
        currentCell = grid[a][b].parent; 
    }
    shortestPath.push([startX, startY]);
    shortestPath.reverse();
    let [i,j] = shortestPath[shortestPath.length-1];
    
    flag = true;
    for(const [x,y] of shortestPath){
        setTimeout(e=>{
            if(!grid[x][y].classList.contains("start")){
                grid[x][y].style.backgroundImage = "linear-gradient(red,red)";
                grid[x][y].style["-webkit-background-size"] = "100% 100%";
            }
            if(x === i && y === j){            //this will reset the flag when it finds the shortes path 
                flag = false;
                setVistoFalse(visGrid);        //reset the visited array to false
            } 
        },(len)*15);                           //timer must be more than the one in ColorChange()
        len++;
    }
    
}



export {Grid,visGrid,makeGrid,clearBoard,clearAlgo,changeColor,shortestPathAlgo,flag,setFlag,noPathResetFlag,clearWalls,ROWS,COLS}
