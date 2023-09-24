import { changeColor,shortestPathAlgo,noPathResetFlag} from "../board/board.js";
let len = 0;


export function BFS(grid,visGrid,rows,cols){
    let foundPath = false;
    let directions = [[0,1],[-1,0],[0,-1],[1,0]];
    let q = [];
    q.push([rows,cols]);
    visGrid[rows][cols] = true;
    
    rows = grid.length;
    cols = grid[0].length;
    
    while(q.length !==0){
        
        const [x,y] = q.shift();

        if(grid[x][y].classList.contains("end")) {
            foundPath = true;
            shortestPathAlgo(grid,len);
            break;
        }
        
        for(const [dx,dy] of directions) {
            const nx = x+dx;
            const ny = y+dy;
            
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visGrid[nx][ny] && !grid[nx][ny].classList.contains("wall")) {
                q.push([nx, ny]);
                visGrid[nx][ny] = true;
                grid[nx][ny].parent = [x, y];
                len++;
                changeColor(grid, nx, ny,len);
            }
        }
        
    }
    if(foundPath === false){
        noPathResetFlag(len);
    }
    len =0;
    
}
      


