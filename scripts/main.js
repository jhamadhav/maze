let rowLen, colLen
let cellSize = 40 // should be same as in scss

let cells = []

let player = {}, food = {}

//player mode flag
let playerMode = 0

const init = async () => {

    player = {
        x: 0,
        y: 0
    }

    determineSize()
    initGrid()

    // make all buttons disabled
    btnToggle(0)

    await generateMaze()

    // able all buttons
    btnToggle(1)

    placeFood()
}

const determineSize = () => {
    w = document.getElementsByClassName("maze-wrapper")[0].clientWidth
    h = window.innerHeight

    console.log(`width: ${w}, height: ${h}`)

    rowLen = Math.floor(h / cellSize)
    rowLen -= 2

    colLen = Math.floor(w / cellSize)
    colLen -= 2

    console.log(`row: ${rowLen}, column: ${colLen}`)
}

const initGrid = () => {
    // delete all prev cells
    clearGrid()

    // add food loc
    food = {
        x: rand(1, colLen - 1),
        y: rand(1, rowLen - 1)
    }

    for (let j = 0; j < rowLen; ++j) {
        let rowDiv = document.createElement("div")
        rowDiv.classList = "row"

        for (let i = 0; i < colLen; ++i) {
            let cell = document.createElement("div")
            cell.classList = "cell"
            cell.style.width = cellSize
            cell.style.height = cellSize

            let newCell = new Cell(i, j, cell)

            cells.push(newCell)

            rowDiv.appendChild(cell)
        }

        document.getElementById("maze-container").appendChild(rowDiv)
    }

    //add border to border cells 😝
    for (let j = 0; j < rowLen; ++j) {
        for (let i = 0; i < colLen; ++i) {
            let index = j * colLen + i
            if (i - 1 < 0) {
                document.getElementsByClassName("cell")[index].style.borderLeft = "2px solid black"
            }

            if (i + 1 >= colLen) {
                document.getElementsByClassName("cell")[index].style.borderRight = "2px solid black"
            }
        }
    }
}

const clearGrid = () => {
    // delete all prev cells
    cells = []
    document.getElementById("maze-container").innerHTML = ""
}

// event listeners
window.addEventListener("load", init)
window.addEventListener("resize", init)
document.getElementById("generate").addEventListener("click", init)

//blur maze
const blurMaze = () => {
    document.getElementsByClassName("container")[0].style.filter = "blur(4px)"
}

//player mode
document.getElementById("player").addEventListener("click", () => {

    //make instruction button pop
    document.getElementById("keyInstruct").style.display = "flex"
    blurMaze()

    // change watermark text
    document.getElementById("inp").innerText = "player"

    // make menu disappear
    document.getElementsByClassName("navbar")[0].style.display = "none"

    // make go to algo btn visible
    document.getElementById("algobtn-menu").style.display = "block"

    // player mode flag on
    playerMode = 1
})

// hide info screen
const hideInfo = () => {
    let elem = document.getElementsByClassName("infoScreen")
    for (let i = 0; i < elem.length; ++i) {
        elem[i].style.display = "none"
    }
    document.getElementsByClassName("container")[0].style.filter = "blur(0)"
}

//algo mode
const algoMode = () => {

    // menu visible
    document.getElementsByClassName("navbar")[0].style.display = "flex"

    // prev algo btn gone
    document.getElementById("algobtn-menu").style.display = "none"

    // player mode off
    playerMode = 0

    // change watermark
    document.getElementById("inp").innerText = "solver"

    hideInfo()
}

// event listener for all algo goto btn
let algobtns = document.getElementsByClassName("algobtn")
for (let i = 0; i < algobtns.length; ++i) {
    algobtns[i].addEventListener("click", algoMode)
}

// play again mode
document.getElementById("play-again").addEventListener("click", () => {
    init()
    hideInfo()
})


//player won screen
const hasPlayerWon = () => {
    if (player.x == food.x && player.y == food.y) {

        blurMaze()
        document.getElementById("playerWon").style.display = "flex"
    }
}

// mouse control
window.onkeydown = (e) => {
    if (playerMode == 0) return

    // key combos
    if (e.keyCode == 38 && player.y - 1 >= 0) {
        //up
        let index = player.y * colLen + player.x

        if (cells[index].border.top) return

        cells[index].removePlayer()

        player.y -= 1;
    } else if (e.keyCode == 40 && player.y + 1 < rowLen) {
        //down
        let index = player.y * colLen + player.x

        if (cells[index].border.bottom) return

        cells[index].removePlayer()

        player.y += 1;

    } else if (e.keyCode == 37 && player.x - 1 >= 0) {
        //left
        let index = player.y * colLen + player.x

        if (cells[index].border.left) return

        cells[index].removePlayer()

        player.x -= 1;
    } else if (e.keyCode == 39 && player.x + 1 < colLen) {
        //right
        let index = player.y * colLen + player.x

        if (cells[index].border.right) return

        cells[index].removePlayer()

        player.x += 1;
    }

    index = player.y * colLen + player.x
    cells[index].status = "player"
    cells[index].fillColor()

    hasPlayerWon()
    return
}