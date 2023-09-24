import { changeColor,shortestPathAlgo, noPathResetFlag, ROWS, COLS} from "/Grid/Board.js";

let len = 0;

export function dfsAlgo(x,y,grid,visGrid){
    let directions = [[0,-1],[1,0],[0,1],[-1,0]];
    let st = [];
    st.push([ x, y ]);
    let foundPath = false;
    
    while(st.length !== 0){
        let [x,y] = st[st.length-1];
        st.pop(); 
        changeColor(grid, x, y,len);
        

        if(grid[x][y].classList.contains("end")) {
            foundPath = true;
            shortestPathAlgo(grid,len);
            break;
        }

        visGrid[x][y] = true;

        for(const [dx,dy] of directions) {
            const nx = x+dx;
            const ny = y+dy;
            
            if (nx >= 0 && nx < ROWS && ny >= 0 && ny < COLS && !visGrid[nx][ny] && !grid[nx][ny].classList.contains("wall")) {
                grid[nx][ny].parent = [x, y];
                st.push([nx, ny]);
                len++;
            }
        }
        
    }
    
    if(foundPath === false){
        noPathResetFlag(len);
    }
    len = 0;
}




    
    



