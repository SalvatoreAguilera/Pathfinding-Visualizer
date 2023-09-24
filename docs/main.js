import {BFS} from "/Algorithms/BFS.js"
import {Dijkstra} from "/Algorithms/Dijkstra's.js"
import {dfsAlgo} from "/Algorithms/DFS.js"
import {Grid,visGrid,clearAlgo,flag,ROWS,COLS} from "/Grid/Board.js"
import {Asearch} from "/Algorithms/Asearch.js";
import { dropMenu } from "/GridEvents/Events.js";
import {startX,startY} from "/GridEvents/DragAndDrop.js"


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


