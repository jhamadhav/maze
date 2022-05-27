
let rowLen, colLen
let cellSize = 40 // should be same as in scss

let cells = []

let player = {
    x: 0,
    y: 0
}
let food = {}

const init = () => {
    determineSize()
    initGrid()
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
        x: rand(1, colLen),
        y: rand(1, rowLen)
    }

    for (let j = 0; j < rowLen; ++j) {
        let rowDiv = document.createElement("div")
        rowDiv.classList = "row"

        for (let i = 0; i < colLen; ++i) {
            let cell = document.createElement("div")
            cell.classList = "cell"
            cell.style.width = cellSize
            cell.style.height = cellSize

            let newCell = new Cell(cell)

            if (food.x == i && food.y == j) {
                newCell.status = "food"
                newCell.fillColor()
            }

            if (i == 0 && j == 0) {
                newCell.status = "player"
                newCell.fillColor()

            }

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
    cells = []
    // delete all prev cells
    document.getElementById("maze-container").innerHTML = ""
}

const rand = (min = 0, max = 1) => {
    return Math.floor((Math.random() * (max - min)) + min)
}

// event listeners
window.addEventListener("load", init)
window.addEventListener("resize", init)
document.getElementById("generate").addEventListener("click", init)