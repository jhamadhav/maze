
let rowLen, colLen
let cellSize = 40 // should be same as in scss

let cells = []

let player = {
    x: 0,
    y: 0
}
let food = {}

const init = async () => {
    determineSize()
    initGrid()
    await generateMaze()

    placeFood()
}

const placeFood = () => {
    for (let j = 0; j < rowLen; ++j) {
        for (let i = 0; i < colLen; ++i) {
            let index = j * rowLen + i
            if (food.x == i && food.y == j) {
                cells[index].status = "food"
                cells[index].fillColor()
            }

            if (i == 0 && j == 0) {
                cells[index].status = "player"
                cells[index].fillColor()
            }
        }
    }

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
    cells = []
    // delete all prev cells
    document.getElementById("maze-container").innerHTML = ""
}

const rand = (min = 0, max = 1) => {
    return Math.floor((Math.random() * (max - min)) + min)
}

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const generateMaze = async () => {
    let stack = []
    stack.push(cells[0])

    // let count = 1000
    while (stack.length > 0) {

        let pt = stack[stack.length - 1]

        //choose a wall and release it
        let index = pt.y * colLen + pt.x

        cells[index].status = "gen"
        cells[index].fillColor()

        await delay(10)

        cells[index].status = null
        cells[index].removeGen()

        let arr = []
        while (arr.length < 4) {
            let temp = rand(0, 4)
            if (arr.indexOf(temp) == -1) {
                arr.push(temp)
            }
        }

        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] == 0) {
                // for top
                let tempIndex = (pt.y - 1) * colLen + pt.x
                if (pt.y - 1 >= 0 && cells[tempIndex].genVisited == false && pt.border.top) {
                    cells[index].releaseWall("u")
                    cells[tempIndex].releaseWall("d")

                    cells[index].border.top = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])

                    break
                }
            }
            if (arr[i] == 1) {
                // for left
                tempIndex = pt.y * colLen + pt.x - 1
                if (pt.x - 1 >= 0 && cells[tempIndex].genVisited == false && pt.border.left) {
                    cells[index].releaseWall("l")
                    cells[tempIndex].releaseWall("r")

                    cells[index].border.left = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])
                    break
                }
            }
            if (arr[i] == 2) {
                // for bottom
                tempIndex = (pt.y + 1) * colLen + pt.x
                if (pt.y + 1 < rowLen && cells[tempIndex].genVisited == false && pt.border.bottom) {
                    cells[index].releaseWall("d")
                    cells[tempIndex].releaseWall("u")

                    cells[index].border.bottom = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])
                    break
                }
            }
            if (arr[i] == 3) {
                // for right
                tempIndex = pt.y * colLen + pt.x + 1
                if (pt.x + 1 < colLen && cells[tempIndex].genVisited == false && pt.border.right) {
                    cells[index].releaseWall("r")
                    cells[tempIndex].releaseWall("l")

                    cells[index].border.right = false
                    cells[index].genVisited = true
                    cells[tempIndex].genVisited = true

                    stack.push(cells[tempIndex])
                    break
                }
            }
        }

        if (stack[stack.length - 1] == pt) {
            stack.pop()
        }


    }
}


// event listeners
window.addEventListener("load", init)
window.addEventListener("resize", init)
document.getElementById("generate").addEventListener("click", init)