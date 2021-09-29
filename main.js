const X_CLASS = "x";
const O_CLASS = "o";
let xTurn = true;
const cellData = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const result =document.getElementById("result");
const winning_msg =document.getElementById("winning-msg");
const loader =document.querySelector('.loader');
const playerBox = document.querySelector('.players');
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

setTimeout(()=>
{
  loader.style.display="none",
  board.classList.add('show'),
  startGame()
},3000);


function startGame() {
    cellData.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click",handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  });
  boardHoverClass();
  result.classList.remove('show');
}

function handleclick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  if(xTurn){
     playerBox.classList.add('active');
  }
  else{
    playerBox.classList.remove('active');
  }
  placeMark(cell, currentClass);
  if (checkWin(currentClass)){
    winning_msg.innerHTML = xTurn?'X Wins!':'O Wins!';
    result.classList.add('show');
  }
  else if(isdraw()){
    winning_msg.innerHTML = 'Draw !';
    result.classList.add('show');
  }
  else{
    swapTurns();
    boardHoverClass();
  }
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  xTurn = !xTurn;
}
function boardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellData[index].classList.contains(currentClass)
        })
    })
}

function isdraw(){
    return [...cellData].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      })
}

arr =[1,2,3];
var x =[...arr,4,5,6];