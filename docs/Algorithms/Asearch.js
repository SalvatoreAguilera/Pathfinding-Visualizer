import { changeColor,shortestPathAlgo, noPathResetFlag, ROWS, COLS } from "/Grid/Board.js";

function getHeuristics(currPosition, endPosition){
    let d1 = Math.abs(currPosition.x - endPosition.x);
    let d2 = Math.abs(currPosition.y - endPosition.y);

    return d1+d2;
}

function getGridAsearch(queue){
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            queue.push({x:i,
                        y:j,
                        g: 0,
                        h:0,
                        f:0,
                        p:undefined
            });
        }
    }
}

let [endX,endY] = [0,0]
function getEND(grid){
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(grid[i][j].classList.contains("end")){
                [endX,endY] = [i,j];
                
            }
        }
    }
    
}

export function Asearch(start,grid,corX,corY){
    let directions = [[0,1],[1,0],[0,-1],[-1,0]]
    let open = [];
    let close = [];
    let Nodes = [];
    let len = 0;
    let foundPath= false;
    let end;
    getGridAsearch(Nodes)
    start = Nodes.findIndex(element => element.x === corX && element.y === corY);
    open.push(Nodes[start]);
    getEND(grid);
    end = Nodes.find(element => element.x === endX && element.y === endY);
    while(open.length != 0){
        let lowestIndex = 0;
        len++;
        // get lowest F score node or if F scores are the same get the lowest H score
        for (let i = 0; i < open.length; i++) {
            if (open[i].f < open[lowestIndex].f) {
                lowestIndex = i;
            }
            else if(open[i].f === open[lowestIndex].f) {
                if (open[i].h < open[lowestIndex].h) {
                    lowestIndex = i;
                }
            }
        }
        let currentCell = open[lowestIndex]; //lowest F score cell

        changeColor(grid,currentCell.x,currentCell.y,len);     //animation
        
        if(grid[currentCell.x][currentCell.y].classList.contains("end")){
            foundPath = true;
            shortestPathAlgo(grid,len);
            break;
        }

        open.splice(lowestIndex, 1);
        close.push(currentCell);
        

        for(const [x,y] of directions){
            const nx = currentCell.x + x;
            const ny = currentCell.y + y;

            

            if(nx >= 0 && nx < ROWS && ny >= 0 && ny < COLS && !grid[nx][ny].classList.contains("wall")){                                             
                let neighbor = Nodes.find(element => element.x === nx && element.y === ny);

                if(!close.includes(neighbor)){
                    let scoreG = currentCell.g+1;

                    if(!open.includes(neighbor)){
                        open.push(neighbor);
                    }
                    else if(scoreG >= neighbor.g){
                        continue;
                    }

                    neighbor.g = scoreG;
                    neighbor.h = getHeuristics(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    grid[neighbor.x][neighbor.y].parent = [currentCell.x,currentCell.y]
                }
                
            }
            
        }
        
    }

    if(foundPath === false){
        noPathResetFlag(len);
    }
}


