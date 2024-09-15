//import Pawn object
import { Pawn } from "./pawn.js"
//Initializing Game Board with and IIFE function

(function boardInitialize() {

    let board = document.querySelector('.grid-container')
    for (let i = 1; i <= 25; i++) {
        let block = document.createElement('div')
        if (i == 13) {
            block.setAttribute('class', 'grid-item winblock')
            block.setAttribute('id', i)
            block.innerHTML = ''
        } else if (i == 3 || i == 23 || i == 11 || i == 15) {
            block.setAttribute('class', 'grid-item startblock')
            block.setAttribute('id', i)
            block.innerHTML = '♜'
        }
        else {
            block.setAttribute('class', 'grid-item')
            block.setAttribute('id', i)
            block.innerHTML = i
        }

        board.appendChild(block)
    }

    //default color of the starting pawns
    document.getElementById('3').style.color = 'red'
    document.getElementById('23').style.color = 'blue'
    document.getElementById('11').style.color = 'purple'
    document.getElementById('15').style.color = 'brown'

})()

//creating pawn instances
let pawn1 = new Pawn(1)
let pawn2 = new Pawn(2)
let pawn3 = new Pawn(3)
let pawn4 = new Pawn(4)

//retreiving dice button
let dice = document.querySelector('.dice')


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
    let randomnum = Math.floor(Math.random() * 8 + 1)
    moveplayer(dine(), randomnum)
})


//main move logic function
function moveplayer(pawn, randomnum) {
    //if pawn is at start 
    if (pawn.atstart) {
        console.log(randomnum);
        //retreiving the start and the next postion for the pawn
        let startblock = document.getElementById(pawn.path[0])
        let sblock = document.getElementById(pawn.path[randomnum])


        //if the next postion is not occupied
        if (board_occupance[Number(sblock.id) - 1] == 0) {
            board_occupance[Number(sblock.id) - 1] = 1
            sblock.innerHTML = '♜'
            sblock.style.color = pawn.color
            pawn.prev_positon = pawn.path[pawn.count]
            pawn.count = pawn.count + randomnum
            pawn.position = Number(sblock.id)
            startblock.innerHTML = ''
            pawn.atstart = false
            console.log(pawn);
            console.log(board_occupance);



        }
        //if the next position is occupied
        else {
            //do something
        }
        return

    }
    console.log(randomnum);

    //retreiving the previous and the next postion for the pawn
    let sblock = document.getElementById(pawn.path[pawn.count + randomnum])
    let prevblock = document.getElementById(pawn.path[pawn.count])

    //if the next postion is not occupied
    if (board_occupance[Number(sblock.id) - 1] == 0) {
        board_occupance[Number(sblock.id) - 1] = 1
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
    //if the next postion is occupied
    else {
        //do something
    }
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