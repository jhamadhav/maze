const dfsSolver = async () => {
    let stack = []
    let index = player.y * colLen + player.x
    stack.push(cells[index])

    while (stack.length > 0) {

        await delay(100)
        let pt = stack[stack.length - 1]

        if (food.x == pt.x && food.y == pt.y) return


        index = pt.y * colLen + pt.x
        cells[index].travelVisited = true
        cells[index].fillColor()

        let tempIndex
        if (cells[index].border.top == false) {
            tempIndex = (pt.y - 1) * colLen + pt.x
            if (cells[tempIndex].travelVisited == false) {
                stack.push(cells[tempIndex])
                continue
            }
        }
        if (cells[index].border.bottom == false) {
            tempIndex = (pt.y + 1) * colLen + pt.x

            if (cells[tempIndex].travelVisited == false) {
                stack.push(cells[tempIndex])
                continue
            }
        }

        if (cells[index].border.left == false) {
            tempIndex = pt.y * colLen + pt.x - 1

            if (cells[tempIndex].travelVisited == false) {
                stack.push(cells[tempIndex])
                continue
            }
        }
        if (cells[index].border.right == false) {
            tempIndex = pt.y * colLen + pt.x + 1

            if (cells[tempIndex].travelVisited == false) {
                stack.push(cells[tempIndex])
                continue
            }
        }
        cells[index].removeClass("travel")
        stack.pop()
    }
}

const bfsSolver = async () => {
    let q = []
    let index = player.y * colLen + player.x
    q.push(cells[index])

    while (q.length > 0) {

        await delay(100)
        let pt = q[0]

        if (food.x == pt.x && food.y == pt.y) return


        index = pt.y * colLen + pt.x

        let tempIndex
        if (cells[index].border.top == false) {
            tempIndex = (pt.y - 1) * colLen + pt.x
            if (cells[tempIndex].travelVisited == false) {
                q.push(cells[tempIndex])
            }
        }
        if (cells[index].border.bottom == false) {
            tempIndex = (pt.y + 1) * colLen + pt.x

            if (cells[tempIndex].travelVisited == false) {
                q.push(cells[tempIndex])

            }
        }

        if (cells[index].border.left == false) {
            tempIndex = pt.y * colLen + pt.x - 1

            if (cells[tempIndex].travelVisited == false) {
                q.push(cells[tempIndex])
            }
        }
        if (cells[index].border.right == false) {
            tempIndex = pt.y * colLen + pt.x + 1

            if (cells[tempIndex].travelVisited == false) {
                q.push(cells[tempIndex])
            }
        }

        for (let i = 0; i < q.length; ++i) {
            let tempIndex = q[i].y * colLen + q[i].x
            cells[tempIndex].travelVisited = true
            cells[tempIndex].fillColor()
        }

        q.shift()
    }
}

// heuristic here is the manhattan distance between cell and food
const hfn = (e) => {
    return Math.abs(e.x - food.x) + Math.abs(e.y - food.y)
}
const aStarSolver = async () => {
    let q = []
    let index = player.y * colLen + player.x
    q.push([hfn(cells[index]), cells[index]])

    while (q.length > 0) {

        await delay(100)
        let pt = q[0][1]

        if (food.x == pt.x && food.y == pt.y) return


        index = pt.y * colLen + pt.x

        let tempIndex
        if (cells[index].border.top == false) {
            tempIndex = (pt.y - 1) * colLen + pt.x
            if (cells[tempIndex].travelVisited == false) {
                q.push([hfn(cells[tempIndex]) + 1, cells[tempIndex]])
            }
        }
        if (cells[index].border.bottom == false) {
            tempIndex = (pt.y + 1) * colLen + pt.x

            if (cells[tempIndex].travelVisited == false) {
                q.push([hfn(cells[tempIndex]) + 1, cells[tempIndex]])
            }
        }

        if (cells[index].border.left == false) {
            tempIndex = pt.y * colLen + pt.x - 1

            if (cells[tempIndex].travelVisited == false) {
                q.push([hfn(cells[tempIndex]) + 1, cells[tempIndex]])

            }
        }
        if (cells[index].border.right == false) {
            tempIndex = pt.y * colLen + pt.x + 1

            if (cells[tempIndex].travelVisited == false) {
                q.push([hfn(cells[tempIndex]) + 1, cells[tempIndex]])
            }
        }

        for (let i = 0; i < q.length; ++i) {
            let tempIndex = q[i][1].y * colLen + q[i][1].x
            cells[tempIndex].travelVisited = true
            cells[tempIndex].fillColor()
        }
        q.shift()
        q.sort()
    }
}
