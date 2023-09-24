import { ROWS,COLS,setFlag } from "../board/board.js";


export function maze(grid){
    setFlag(true);
    let walls = [];
    let len = 0;
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(grid[i][j].classList.contains("start") || grid[i][j].classList.contains("end")){
                continue;
            }
            if(Math.random() < .33){
                walls.push([i,j])
            }
        }
    }
    walls.sort(() => Math.random() - .5);
    let [i,j] = walls[walls.length-1];
    for(const [x,y] of walls){
        setTimeout(e=>{
            grid[x][y].classList.add("wall");
            grid[x][y].style["-webkit-background-size"] = "100% 100%";
            grid[x][y].style.backgroundImage = "linear-gradient(black,black)";
            if(x === i && y === j){            //this will reset the flag when it finds the shortes path 
                setFlag(false);
            }
        },(len)*4);
        len++;
    }
}
