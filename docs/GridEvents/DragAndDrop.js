import { setFlag,ROWS,COLS,Grid } from "/Grid/Board.js";



let isDragging = false;
let [startX,startY] = [0,0];
function allowDrop(ev) {
  ev.preventDefault();

  if (!isDragging) {
    ev.dataTransfer.dropEffect = "none";
  }
  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  const droppedElement = document.getElementById(data);

  if (droppedElement.id === "startImg") {
    ev.target.appendChild(droppedElement);
    removeClass(Grid, "start");
    addClass(ev.target, "start");
    getCordinates(Grid, "start");
  } 
  if (droppedElement.id === "endImg") {
    ev.target.appendChild(droppedElement);
    removeClass(Grid, "end");
    addClass(ev.target, "end");
  }
  setFlag(false);
}

export function dragSource(){
  
  getCordinates(Grid,"start");
  let start = document.getElementById("startImg")
  start.draggable = true;
  start.addEventListener("mousedown", () => {
    setFlag(true)
  });
  start.addEventListener("dragstart", (ev) => {
    isDragging = true;
    ev.dataTransfer.setData("text", ev.target.id);
  });
  

  let cells = document.getElementsByClassName("cell");
    const arrayCells = Array.from(cells);
    arrayCells.forEach(cell => {
        cell.addEventListener("drop",(e) => {
            drop(e);
            getCordinates(Grid,"start");
            isDragging = false;
        });
        cell.addEventListener("dragover",(e) => {
          allowDrop(e);
        });
        
    });
  
}

export function dragEnd(){
  
  isDragging = true;
  let end = document.getElementById("endImg")
  end.draggable = true;

  end.addEventListener("mousedown", () => {
    setFlag(true)
  });
  end.addEventListener("dragstart", (ev) => {
    isDragging = true;
    ev.dataTransfer.setData("text", ev.target.id);
  });


let cells = document.getElementsByClassName("cell");
  const arrayCells = Array.from(cells);
  arrayCells.forEach(cell => {
      cell.addEventListener("drop",(e) => {
          drop(e);
          isDragging = false;
      });
      cell.addEventListener("dragover",allowDrop);
      
  }); 
}

function removeClass(grid,data){
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(grid[i][j].classList.contains(data)){
                grid[i][j].classList.remove(data);
            }
        }
    }
}

function addClass(cell,data){
    cell.classList.add(data);
}

function getCordinates(grid,data){
    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(grid[i][j].classList.contains(data)){
                [startX,startY] = [i,j];
            }
        }
    }
    
}


export {startX,startY, removeClass, isDragging};