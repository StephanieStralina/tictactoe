/*----- constants -----*/
const players = {
    '1': {img: 'url(../media/Totoro.png)', name: 'Totoro',},
    '-1': {img: 'url(../media/Catbus.png)', name: 'Catbus',},
    '' : {img: 'none', name: 'null'}, 
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const rematchBtn = document.getElementById('rematch');
const boardEls = [...document.querySelectorAll('#board>div')];
const messageEl = document.getElementById('message');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleSelect);
rematchBtn.addEventListener('click', rematch);

/*----- functions -----*/
init();

function init() {
    board = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ]
    turn = 1;
    winner = null;
    render();
}

function handleSelect(evt){
    let clickedEl = boardEls.indexOf(evt.target);
    // Guard for if user misses div
    if (clickedEl === -1) return;
    // Guard for occupied space
    if (board[clickedEl] === 1 || board[clickedEl] === -1) return;
    // Guard for clicking after game ends
    if (board[clickedEl] === '' && winner === null) {
        board[clickedEl] = turn;
        winner = checkWinner();
        turn *= -1;
        render();
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        const [num1, num2, num3] = combo;
        if (board[num1] !== '' && board[num1] === board[num2] && board[num1] === board[num3]) {
            return turn;
        } 
    }
    if (board.every(num => num !== '')) {
        return 'Tie';
    } else {
    return null;
    }
}

function render() {
    renderBoard();
    renderControls();
    renderMessage();
}

function renderBoard() {
    board.forEach(function(element, elIdx){
        const selCel = document.getElementById(`${elIdx}`);
        selCel.style.backgroundImage = `${players[element].img}`;
    });
};

function renderControls() {
    rematchBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function renderMessage() {
    if (winner === null) {
        messageEl.innerHTML = `${players[turn].name}</span>'s Turn`;
    } else if (winner === 'Tie') {
        messageEl.innerText = "Awww rats! You tied!";
    } else {
        messageEl.innerHTML = `<span style="color: #E2AD00">${players[winner].name} Wins!</span>`;
    }
}

function rematch(){
    board.forEach(function(element, elIdx){
        const selCel = document.getElementById(`${elIdx}`);
        selCel.style.backgroundImage = 'none';
    });
    init();
}
