const board = document.getElementById('board')
const cells = document.querySelectorAll('[data-cell]')
const messageBox = document.getElementById('messageBox')
const messageButton = document.getElementById('messageButton')
const message = document.getElementById('message')

let o_turn 
const x_Class = 'x'
const o_Class = 'o'
const winning_possibility = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]
 

messageButton.addEventListener('click', startGame)

startGame()

function startGame(){
    messageBox.classList.remove('show')
    o_turn = false
    sethover()
    cells.forEach((cell) => {
        cell.classList.remove(o_Class)
        cell.classList.remove(x_Class)
        cell.addEventListener('click', clickCell, {once: true})
    })
}





function clickCell(e) {
    const cell = e.target
    const currentClass = o_turn ? o_Class : x_Class

    //adding mark
   cell.classList.add(currentClass)

    //check winning
    if(isWin(currentClass)){
        messageBox.classList.add('show')
        message.innerText = `${currentClass} is the winner`

    //check drowing
    }else if(isDraw()){
        messageBox.classList.add('show')
        message.innerText = 'Draw!'
    }

    //change turn
    o_turn = !o_turn

    //set hover
    sethover()
  
}

function sethover(){
    board.classList.remove(o_Class)
    board.classList.remove(x_Class)
    if(o_turn){
        board.classList.add(o_Class)
    }else{
        board.classList.add(x_Class)
    }
    
}

function isWin(currentClass){
    return winning_possibility.some(aPossibility => {
        return aPossibility.every(index =>{
            return cells[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
   return [...cells].every(cell => {
       return cell.classList.contains(x_Class) || cell.classList.contains(o_Class)
       
   })
}