//import Pawn object
import { Pawn } from "./pawn.js"
//Initializing Game Board with and IIFE function

(function boardInitialize() {

    let board = document.querySelector('.grid-container')
    for (let i = 1; i <= 25; i++) {
        let block = document.createElement('div')
        if (i == 13) {
            block.setAttribute('class', `grid-item winblock _${i}`)
            block.setAttribute('id', i)
            block.innerHTML = ''
        } else if (i == 3 || i == 23 || i == 11 || i == 15) {
            block.setAttribute('class', `grid-item startblock _${i}`)
            block.setAttribute('id', i)
            block.innerHTML = '♜'
        }
        else {
            block.setAttribute('class', `grid-item _${i}`)
            block.setAttribute('id', i)
            // block.innerHTML = i
        }

        board.appendChild(block)
    }

    //default color of the starting pawns
    let startblockplayer1 = document.getElementById('3')
    startblockplayer1.style.color = 'red'
    startblockplayer1.style.background = 'repeating-radial-gradient(black, red 150px)'
    let startblockplayer2 = document.getElementById('11')
    startblockplayer2.style.color = 'blue'
    startblockplayer2.style.background = 'repeating-radial-gradient(black, blue 150px)'
    let startblockplayer3 = document.getElementById('23')
    startblockplayer3.style.color = 'chartreuse'
    startblockplayer3.style.background = 'repeating-radial-gradient(black, chartreuse 150px)'
    let startblockplayer4 = document.getElementById('15')
    startblockplayer4.style.color = 'yellow'
    startblockplayer4.style.background = 'repeating-radial-gradient(black, yellow 150px)'

})()

//creating pawn instances
let pawn1 = new Pawn(1)
let pawn2 = new Pawn(2)
let pawn3 = new Pawn(3)
let pawn4 = new Pawn(4)

//retreiving dice button
let dice = document.querySelector('.dice')
let number = document.querySelector('.number')

// creating a board matrix array let board_occupance = Array.from({ length: 25 }, (v) => 0)
const board_occupance = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];




//onlick function for every dice click 
dice.addEventListener('click', () => {
    //generating a random number for a dice value
    // let randomnum = Math.floor(Math.random() * 8 + 1)
    let randomnum = diceRolledFunct()
    changeKoda(randomnum)
    // moveplayer(dine(), randomnum)
})



//main move logic function
function moveplayer(pawn, randomnum) {
    //if pawn is at start 
    if (pawn.atstart) {
        number.innerHTML = randomnum
        //retreiving the start and the next postion for the pawn
        let startblock = document.getElementById(pawn.path[0])
        let sblock = document.getElementById(pawn.path[randomnum])


        //if the next postion is not occupied

        if (board_occupance[Number(sblock.id) - 1] !== pawn.player) {
            kill(board_occupance[Number(sblock.id) - 1])
        }
        board_occupance[Number(sblock.id) - 1] = pawn.player
        board_occupance[pawn.path[0] - 1] = 0
        sblock.innerHTML = '♜'
        sblock.style.color = pawn.color
        pawn.prev_positon = pawn.path[pawn.count]
        pawn.count = pawn.count + randomnum
        pawn.position = Number(sblock.id)
        startblock.innerHTML = ''
        pawn.atstart = false
        console.log(pawn);
        console.log(board_occupance);

        return

    }
    number.innerHTML = randomnum
    //retreiving the previous and the next postion for the pawn
    let sblock = document.getElementById(pawn.path[pawn.count + randomnum])
    let prevblock = document.getElementById(pawn.path[pawn.count])

    //if the next postion is not occupied
    if (board_occupance[Number(sblock.id) - 1] !== pawn.player) {
        kill(board_occupance[Number(sblock.id) - 1])
    }
    board_occupance[Number(sblock.id) - 1] = pawn.player
    board_occupance[Number(prevblock.id) - 1] = 0
    prevblock.innerHTML = ''
    sblock.innerHTML = '♜'
    sblock.style.color = pawn.color
    pawn.prev_positon = pawn.path[pawn.count]
    pawn.position = Number(sblock.id)
    pawn.count = pawn.count + randomnum
    console.log(pawn);
    console.log(board_occupance);

}


//implemnt dine logic
let count = 1
let dineText = document.querySelector('.dine')
dineText.innerHTML = 'Player 1 Turn'

function dine() {
    switch (count) {
        case 1:
            count = 2
            dineText.innerHTML = 'Player 2 Turn'
            return pawn1
        case 2:
            count = 3
            dineText.innerHTML = 'Player 3 Turn'
            return pawn2
        case 3:
            count = 4
            dineText.innerHTML = 'Player 4 Turn'
            return pawn3
        case 4:
            count = 1
            dineText.innerHTML = 'Player 1 Turn'
            return pawn4
    }
}


//Impleted Kill Functionality
let kill = (occupiedplayer) => {
    switch (occupiedplayer) {
        case 1:
            reset(pawn1)
            console.log('killed Player:', occupiedplayer);

            break;
        case 2:
            reset(pawn2)
            console.log('killed', occupiedplayer);
            break;
        case 3:
            reset(pawn3)
            console.log('killed', occupiedplayer);
            break;
        case 4:
            reset(pawn4)
            console.log('killed', occupiedplayer);
            break;
        default:
            break;
    }
}

//This function resets the pawns position after it has been killed
function reset(pawn) {
    document.getElementById(pawn.path[0]).innerHTML = '♜'
    document.getElementById(pawn.path[0]).style.color = pawn.color
    pawn.count = 0
    pawn.position = 3
    pawn.prev_positon = null
    pawn.atstart = true
    board_occupance[pawn.path[0] - 1] = pawn.player
}


//function for rolling dice
function diceRolledFunct() {
    let randomGeneratedNo = Math.floor(Math.random() * 11 + 1)
    let randomnumsList = [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 4, 8]
    let randomNum = randomnumsList[randomGeneratedNo]

    console.log(randomnumsList.length);


    // changeKoda(randomNum)

    return randomNum

}

//funciton to change koda(dice) on diceroll event
async function changeKoda(num) {
    console.log(num);

    let allkoda = document.querySelector('.dicerollgridcontainer')
    let koda1 = allkoda.children[0]
    let koda2 = allkoda.children[1]
    let koda3 = allkoda.children[2]
    let koda4 = allkoda.children[3]
    let kodaElements = [koda1, koda2, koda3, koda4];


    await showanimation(kodaElements)

    moveplayer(dine(), num)

    //rendering kodas(dice) according to the number
    if (num === 1) {
        clearPrevkoda(kodaElements);
        appendImages(1, 3, 'front');
        // appendImages(3, 'back');
    } else if (num === 2) {
        clearPrevkoda(kodaElements);
        appendImages(2, 2, 'front');
        // appendImages(2, 'back');
    } else if (num === 3) {
        clearPrevkoda(kodaElements);
        appendImages(3, 1, 'front');
        // appendImages(1, 'back');
    } else if (num === 4) {
        clearPrevkoda(kodaElements);
        appendImages(4, 0, 'front');
    } else if (num === 8) {
        clearPrevkoda(kodaElements);
        appendImages(0, 4, 'back');
    }




    function appendImages(frontnum, backnum, type) {


        // let imgSrc = type === 'front' ? './assets/front.png' : './assets/back.png';
        let frontimg = './assets/front.png'
        let backimg = './assets/back.png'


        for (let i = 0; i < frontnum; i++) {
            console.log('from front');

            let img = document.createElement('img');
            img.setAttribute('class', 'diceItem');
            img.setAttribute('src', frontimg);
            kodaElements[i].appendChild(img);
        }

        for (let i = 3; i >= frontnum; i--) {
            console.log('from back');
            let img = document.createElement('img');
            img.setAttribute('class', 'diceItem');
            img.setAttribute('src', backimg);
            kodaElements[i].appendChild(img);
        }
    }


}


//function to remove prev dice(kodas)
function clearPrevkoda(kodaElements) {
    while (kodaElements[0].firstChild) {
        kodaElements[0].removeChild(kodaElements[0].firstChild);
    }
    while (kodaElements[1].firstChild) {
        kodaElements[1].removeChild(kodaElements[1].firstChild);
    }
    while (kodaElements[2].firstChild) {
        kodaElements[2].removeChild(kodaElements[2].firstChild);
    }
    while (kodaElements[3].firstChild) {
        kodaElements[3].removeChild(kodaElements[3].firstChild);
    }
}



//function to display animation before every turn
function showanimation(kodaElements) {
    return new Promise((resolve) => {
        clearPrevkoda(kodaElements);

        for (let i = 0; i < 4; i++) {
            let img = document.createElement('img');
            img.setAttribute('class', 'diceItem');
            img.setAttribute('src', './assets/front.png');
            kodaElements[i].appendChild(img);
        }

        kodaElements.forEach((element) => element.classList.add('rotate'));

        setTimeout(() => {
            kodaElements.forEach((element) => element.classList.remove('rotate'));
            resolve();
        }, 1000);
    });
}
