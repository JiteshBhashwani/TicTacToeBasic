let currentPlayer = 'X' 
let moves = 0;
let dat = [[1,2,3],[4,5,6],[7,8,9]];
let click = new Audio();
click.src = "audio/click.mp3";
let resetOpen = new Audio;
resetOpen.src = "audio/reset-option-closee.mp3"
let resetClose = new Audio;
resetClose.src = "audio/reset-option-close.mp3"

const mark = (index) => {
    let x = Math.floor(index/3);
    let y = index%3;
    dat[x][y] = currentPlayer;
}
const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
        if (dat[i][0] === currentPlayer && dat[i][1] === currentPlayer && dat[i][2] === currentPlayer) {
            return currentPlayer;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (dat[0][i] === currentPlayer && dat[1][i] === currentPlayer && dat[2][i] === currentPlayer) {
            return currentPlayer;
        }
    }
    // Check diagonals
    if (dat[0][0] === currentPlayer && dat[1][1] === currentPlayer && dat[2][2] === currentPlayer) {
        return currentPlayer;
    }
    if (dat[0][2] === currentPlayer && dat[1][1] === currentPlayer && dat[2][0] === currentPlayer) {
        return currentPlayer;
    }
    return null;
}
const gameOver = (x) => {
    const overflow = document.querySelector("#gameover-dialogue-overflow");
    document.querySelector("#result").innerHTML = x;
    overflow.style.visibility = "visible";
}

let buttons = document.getElementsByClassName('grid');
Array.from(buttons).forEach((element,index)=>{
    element.onclick = () => {
        click.play();
        mark(index);
        console.log(dat);        
        element.firstElementChild.innerHTML = currentPlayer;
        let result = checkWinner();
        if(result) {
            setTimeout(()=>gameOver(currentPlayer),100);
            return;
        }
        element.onclick = null;
        moves++;
        if(moves==9) gameOver('TIE');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
})

let restart = document.getElementById('restart');
let restartPopupOverlay = document.getElementById('restart-dialogue-overflow');
restart.onclick = () => {
    resetOpen.play();
    restartPopupOverlay.style.visibility = 'visible';
}

let closeRestartOverlay = document.getElementById('restart-dialogue-close-button');
closeRestartOverlay.onclick = () => {
    resetClose.play();
    restartPopupOverlay.style.visibility = 'hidden';
}

let restartConfirmButton = document.getElementById('restart-confirm-button');
restartConfirmButton.onclick = () => {
    location.reload();
}

let newGameBtn = document.querySelector("#newgame-btn");
newGameBtn.addEventListener("click",()=>{location.reload()})