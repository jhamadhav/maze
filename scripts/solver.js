const dfsSolver = async () => {
    let stack = []
    let index = player.y * colLen + player.x
    stack.push(cells[index])

    let count = 1000;
    while (stack.length > 0 && count--) {

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