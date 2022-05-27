function Cell(elem) {
    this.domElem = elem

    this.genVisited = false
    this.travelVisited = false

    this.status = null // food, player or cell

    this.border = {
        top: true,
        bottom: true,
        left: true,
        right: true
    }

    this.releaseWall = (dir) => {
        if (dir == "u") {
            this.border.top = false

            this.domElem.style.borderTopColor = "transparent"
            return
        }
        if (dir == "d") {
            this.border.bottom = false

            this.domElem.style.borderBottomColor = "transparent"
            return
        }
        if (dir == "l") {
            this.border.left = false

            this.domElem.style.borderLeftColor = "transparent"
            return
        }
        if (dir == "r") {
            this.border.right = false

            this.domElem.style.borderRightColor = "transparent"
            return
        }
    }

    this.fillColor = () => {

        if (this.status == "food") {
            this.domElem.classList.add("food")
        }
        if (this.status == "player") {
            this.domElem.classList.add("player")
        }
    }

}