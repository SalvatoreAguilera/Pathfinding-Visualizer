import { clearAlgo,flag,Grid,clearBoard,clearWalls,makeGrid } from "../board/board.js";
import { maze } from "../algorithms/maze.js"
import { dragSource,dragEnd } from "./draganddrop.js";



document.addEventListener("DOMContentLoaded",makeGrid);
document.getElementById("ClearBoard").addEventListener("click", clearBoard);


export function dropMenu() {
  document.getElementById('dropdown-menu').classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-arrow')) {
      var dropdowns = document.getElementsByClassName("dropdown");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

document.getElementById("clear-path").addEventListener("click", () => {
  if(flag === false){
      clearAlgo();
  }
});

document.getElementById("Maze").addEventListener("click", () => {
  if(flag === false){
      clearWalls();
      clearAlgo();
      maze(Grid);
  }
});

document.getElementById("clear-wall").addEventListener("click", () => {
  if(flag === false){
      clearWalls();
  }
});


