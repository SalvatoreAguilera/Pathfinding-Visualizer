import { changeColor,shortestPathAlgo,noPathResetFlag,ROWS,COLS } from "/Grid/Board.js";

export function Dijkstra(grid,visGrid,source,corX,corY){
    let directions = [[0,1],[1,0],[0,-1],[-1,0]]
    let Q = [];
    let prev = [];
    let len = 0;
    let foundPath = false;
    getGrid(Q);
    source = Q.findIndex(element => element.x === corX && element.y === corY);
    Q[source].distance = 0;
    
    while(Q.length !== 0){
        len++
        sortNodes(Q);
        let currCell = Q.shift();

        if(currCell.distance === Infinity) {
            break;
        }

        visGrid[currCell.x][currCell.y] = true;
        changeColor(grid, currCell.x, currCell.y,len);
        

        if(grid[currCell.x][currCell.y].classList.contains('end')){ 
            shortestPathAlgo(grid,len);
            break;
        }
        
        for(const [i,j] of directions){
            const nx = currCell.x + i;
            const ny = currCell.y + j;
            
            if(nx >= 0 && nx < ROWS && ny >= 0 && ny < COLS && !visGrid[nx][ny] && !grid[nx][ny].classList.contains("wall")){
                for(let i = 0; i < Q.length; i++){
                        if(Q[i].x == nx && Q[i].y == ny){
                            Q[i].distance = currCell.distance + 1;
                            
                        }
                }
                grid[nx][ny].parent = [currCell.x, currCell.y]
                
            }
        }
    }
    if(foundPath === false){
        noPathResetFlag(len);
    }
    
    
}



function sortNodes(Q){
    Q.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getGrid(queue){
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            queue.push({x:i,y:j,distance:Infinity,prev:undefined});
        }
    }
}

