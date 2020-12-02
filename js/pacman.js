'use strict'
const PACMAN = '😬';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
    }
    if (nextCell === CHERRY) {
        updateScore(10);
    }
    if (nextCell === SUPER_FOOD) {
        if(gPacman.isSuper) return;
        updateScore(1);
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;
        }, 5000);

    }
    else if (nextCell === GHOST) {
        if(gPacman.isSuper){
            
        }
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  
    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;


    if(nextCell === FOOD && isAllFoodCollected()){
        gameWin();
    }
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}