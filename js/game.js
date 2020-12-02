'use strict'
const WALL = '🟦'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = '🍕';
const CHERRY = '🍒';


var gBoard;
var gCherryInterval = 0;
var gGame = {
    score: 0,
    isOn: false
};



function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.score = 0;
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 15000, gBoard);
    closeModal()
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            else if (i === 1 && (j === 1 || j === 8)
                || i === 8 && (j === 1 || j === 8)) {
                board[i][j] = SUPER_FOOD;
            }
        }
    }
    return board;
}


function gameWin() {
    var elModal = document.querySelector('.modal')
    elModal.innerText = 'YOU WON';
    openModal();
    gGame.isOn = false;
}



function isAllFoodCollected() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
                if (gBoard[i][j] === FOOD) {
                    return false;
                }
            }
    }
    return true;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    var elModal = document.querySelector('.modal')
    elModal.innerText = 'GAME OVER';
    openModal();
}

function addCherry() {
    var emptyCells = findEmptyCells();
    var randCell = emptyCells[getRandomInt(0, emptyCells.length)]
    gBoard[randCell.i][randCell.j] = CHERRY;
    renderCell(randCell, CHERRY);
}

function findEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j];
            var emptyCell = { i: i, j: j };
            if (currCell === EMPTY || currCell === FOOD) {
                emptyCells.push(emptyCell);
            }
        }
    }
    return emptyCells;
}


function openModal() {
    var elmodal = document.querySelector('.modal');
    elmodal.style.display = 'block';
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

