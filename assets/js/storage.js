class Storage {
    constructor() {
        this.localStorage = window.localStorage;
    }

    setItem(item, data) {
        this.localStorage.setItem(item, JSON.stringify(data))
    }

    getItem(item) {
        return JSON.parse(this.localStorage.getItem(item))
    }

    removeItem(item) {
        this.localStorage.removeItem(item)
    }

}

class Game {
    constructor(showBoard, playerTurn) {
        this.positionsTaken    = []; // map each position so it is not used twice
        this.movesLeft         = 9; // Moves left before game is either won or tied
        this.showBoard         = showBoard; // Render board?
        this.playerTurn        = playerTurn; // Who is currently allowed to make a move?
        this.gameEnabled       = false; // Have both players joined the game?
        this.disableKeys       = false; // Disable keys if player is not allowed to move
        this.objects           = {lines: [],ellipses: []}; // All the previous moves
        this.winScenarios      = {
            x1: [],x2: [],x3: [], // left to right
            y1: [],y2: [],y3: [],   // top to bottom
            d1: [],d2: [],  // diagonal ( top:left -> bottom:right and  top:right -> bottom:left)
        };
    }

    drawObjects() {
        this.objects.lines.forEach((i) => { // the cross player object
            line(i.line1.x1, i.line1.y1, i.line1.x2, i.line1.y2)
            line(i.line2.x1, i.line2.y1, i.line2.x2, i.line2.y2)
        })

        this.objects.ellipses.forEach((i) => { // the circle player object
            ellipse(i.circle.x1, i.circle.y1, i.circle.d1, i.circle.d2)
        })
    }

    updateGame(update) {
		this.playerTurn	    = update.next; // change the player who is allowed to move
		this.objects        = update.objects; // display the new move
		this.movesLeft      = update.movesLeft; // reduce the moves left until win or tie
        this.positionsTaken = update.positionsTaken; // update the moves that have been taken
        this.disableKeys    = false; // enable keys again
    }
}

class Board {
    constructor() {
        var height = 600; // height of the game board
        var width = 600; // width of the game board
        this.lines  = { // all the lines that make up the game board
            y1: {xStart: width/3, yStart: 0, xEnd: width/3, yEnd: height},
            y2: {xStart: width/3*2, yStart: 0, xEnd: width/3*2, yEnd: height},
            x1: {xStart: 0, yStart: height/3, xEnd: width, yEnd: height/3},
            x2: {xStart: 0, yStart: height/3*2, xEnd: width, yEnd: height/3*2}
        }
    }

    drawBoard() { // render the board 
        for(let key in this.lines) {
            var object = this.lines[key]
            line(object.xStart, object.yStart, object.xEnd, object.yEnd)
        }
    }
}
