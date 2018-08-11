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

class Cross {
	constructor(pattern) {
		this.line1 = pattern.line1;
		this.line2 = pattern.line2;
	} 
}

class Circle {
	constructor(pattern) {
		this.circle = pattern.circle;
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
        this.arrays            = new Arrays();
        this.board             = new Board();
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
            y1: {xStart: width/3,   yStart: 0,          xEnd: width/3,   yEnd: height},
            y2: {xStart: width/3*2, yStart: 0,          xEnd: width/3*2, yEnd: height},
            x1: {xStart: 0,         yStart: height/3,   xEnd: width,     yEnd: height/3},
            x2: {xStart: 0,         yStart: height/3*2, xEnd: width,     yEnd: height/3*2}
        }
    }

    draw() { // render the board 
        for(let key in this.lines) {
            var object = this.lines[key]
            line(object.xStart, object.yStart, object.xEnd, object.yEnd)
        }
    }
}

class Arrays {

    constructor() {
        this.player            = "";
        this.winScenarios      = {
            x1: [],x2: [],x3: [],   // left to right
            y1: [],y2: [],y3: [],   // top to bottom
            d1: [],d2: [],          // diagonal ( top:left -> bottom:right and  top:right -> bottom:left)
        };
    }

    finalize(arrays) { // Accepts an array of arrays
        arrays.forEach((i) => {
            i.push(this.player)
        })
    }

    update(config) {
        this.player = config.player;
        let a       = this.winScenarios; // a stands for array

        switch (config.position) { // position on the board 
            case "A": return this.finalize([a.x1, a.y1, a.d1]);
            case "B": return this.finalize([a.x2, a.y1]);
            case "C": return this.finalize([a.x3, a.y1, a.d2]);
            case "D": return this.finalize([a.x1, a.y2]);
            case "E": return this.finalize([a.x2, a.y2, a.d1, a.d2]); // Rows affected by player move 
            case "F": return this.finalize([a.x3, a.y2]);             // Array with letter ending starting in top left corner  
            case "G": return this.finalize([a.x1, a.y3, a.d2]);       // X = LEFT -> RIGHT
            case "H": return this.finalize([a.x2, a.y3]);             // Y = TOP -> BOTTOM
            case "I": return this.finalize([a.x3, a.y3, a.d1]);       // D = DIAGONAL
            default:  return this.finalize([]);
        }
    }
    
    
}