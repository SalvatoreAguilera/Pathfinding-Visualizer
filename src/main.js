import {BFS} from "./algorithms/bfs.js"
import {Dijkstra} from "./algorithms/dijkstras.js"
import {dfsAlgo} from "./algorithms/dfs.js"
import {Grid,visGrid,clearAlgo,flag} from "./board/board.js"
import {Asearch} from "./algorithms/asearch.js";
import { dropMenu } from "./events/events.js";
import {startX,startY} from "./events/draganddrop.js"


function Start(){
    clearAlgo();
    
    if(data === 'DFS'){
        dfsAlgo(startX,startY,Grid,visGrid);        
    }

    else if(data === 'BFS'){
        BFS(Grid,visGrid,startX,startY);
    }

    else if(data === 'DA'){
        Dijkstra(Grid,visGrid,0,startX,startY);
    }
    else if(data === 'AS'){
        Asearch(0,Grid,startX,startY);
    }
}

document.querySelector('.dropdown-arrow').addEventListener('click', dropMenu);

var data = "";
document.addEventListener('DOMContentLoaded', () => {
    
    var selected  = document.querySelectorAll('#dropdown-menu li')
    selected.forEach(item => {
        item.addEventListener('click', () =>{
            data = item.getAttribute('data-algo');
        });
    });
    
    let StartButton = document.getElementById("StartButton");
    
    StartButton.addEventListener('click',() => {
        if(flag === false){
            Start();           
        }
    });
    
});


