import {
	welcomeScreen,
	metaInformation
} from "./components";

import { 
    updateMetaInformation, 
    serverAccess 
} from "./config"; 

import {
	newGame,
	createObject,
	sendUpdate
} from "./main";

export var gameConfig = {}

import { serverUrl } from "./http.config";

var s = function( sketch ) {
    sketch.setup = function() {
        sketch.textFont('Helvetica');
        gameConfig.network = new Network(serverUrl)
    };
  
    sketch.draw = function() {
    	if(gameConfig.game && gameConfig.game.showBoard) {
            gameConfig.game.board.draw()
            gameConfig.game.drawObjects()
            gameConfig.game.gameOver()
        }
    };

    sketch.mousePressed = function() {
        if(gameConfig.game && gameConfig.game.gameEnabled && gameConfig.game.playerTurn === gameConfig.playerNickname && !gameConfig.game.disableKeys && gameConfig.room.player1 && gameConfig.room.player2) {
            sketch.noFill()
            const centerItemValue = 100; // Position the objects in the center of the square
            var mouseX = sketch.mouseX;
            var mouseY = sketch.mouseY;
            var width = sketch.width;
            var height = sketch.height;

            if(mouseX > width || mouseX < 0) { // make sure that the mouse is on the board
                return
            } else if(mouseY > height || mouseY < 0) {
                return
            } else if(mouseX < width/3 && mouseY < height/3)  {
                createObject({x: width/3-centerItemValue, y: height/3-centerItemValue, player: gameConfig.playerNickname, position: "A"})
            } else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3) {
                createObject({x: width/3*2-centerItemValue, y: height/3-centerItemValue, player: gameConfig.playerNickname, position: "B"})
            } else if(mouseX > width/3*2 && mouseY < height/3) {
                createObject({x: width-centerItemValue, y: height/3-centerItemValue, player: gameConfig.playerNickname, position: "C"})
            } else if(mouseX < width/3 && mouseY > height/3 && mouseY < height/3*2) {
                createObject({x: width/3-centerItemValue, y: height/3*2-centerItemValue, player: gameConfig.playerNickname, position: "D"}) 
            } else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
                createObject({x: width/3*2-centerItemValue, y: height/3*2-centerItemValue, player: gameConfig.playerNickname, position: "E"})
            } else if(mouseX > width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
                createObject({x: width-centerItemValue, y: height/3*2-centerItemValue, player: gameConfig.playerNickname, position: "F"})
            } else if(mouseX < width/3 && mouseY > height/3*2) {
                createObject({x: width/3-centerItemValue, y: height-centerItemValue, player: gameConfig.playerNickname, position: "G"}) 
            } else if(mouseX > width/3 && mouseX < width/3*2 && mouseY > height/3*2) {
                createObject({x: width/3*2-centerItemValue, y: height-centerItemValue, player: gameConfig.playerNickname, position: "H"}) 
            } else if(mouseX > width/3*2 && mouseY > height/3*2) {
                createObject({x: width-centerItemValue, y: height-centerItemValue, player: gameConfig.playerNickname, position: "I"})  
            }
        }
    }
  };
  
export var instance_p5 = new p5(s);




export class Storage {     // classes.js
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

export class Cross {
	constructor(pattern) {
		this.line1 = pattern.line1;
		this.line2 = pattern.line2;
	} 
}

export class Circle {
	constructor(pattern) {
		this.circle = pattern.circle;
	}
}

export class Room {
    constructor(config) {
        this.player1   = config.player1;  // Player who creates the room
        this.player2   = config.player2;  // Player who joins the room
        this.roomname  = config.roomname; // room name for socket 
    }

    update(config) {
        this.player1  = config.player1;
        this.player2  = config.player2;
        this.roomname = config.roomname; 
    }
}

export class Game {
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
            instance_p5.line(i.line1.x1, i.line1.y1, i.line1.x2, i.line1.y2)
            instance_p5.line(i.line2.x1, i.line2.y1, i.line2.x2, i.line2.y2)
        })

        this.objects.ellipses.forEach((i) => { // the circle player object
            instance_p5.ellipse(i.circle.x1, i.circle.y1, i.circle.d1, i.circle.d2)
        })
    }

    updateGame(update) {
		this.playerTurn	    = update.next; // change the player who is allowed to move
		this.objects        = update.objects; // display the new move
		this.movesLeft      = update.movesLeft; // reduce the moves left until win or tie
        this.positionsTaken = update.positionsTaken; // update the moves that have been taken
        this.disableKeys    = false; // enable keys again
    }

    hasWon() {
        for(let arr in this.arrays.winScenarios) {
            if(this.arrays.winScenarios[arr].filter((value) => {
                return value === gameConfig.room.player1
            }).length >= 3) { return "Circle Has Won!"}
    
            if(this.arrays.winScenarios[arr].filter((value) => {
                return value === gameConfig.room.player2
            }).length >= 3) { return "Cross Has Won!"}
        }
    }

    gameOver() {
        if(this.movesLeft === 0 && !this.hasWon()) {
            metaInformation.hasWon = "Game Tied"
            this.disableKeys = true;
            gameConfig.network.winnerUpdate({roomname: gameConfig.room.roomname, message: "Game Tied"})
            newGame()
        }
    
        if(this.hasWon()) {
            metaInformation.hasWon = this.hasWon();
            this.disableKeys = true;
            gameConfig.network.winnerUpdate({roomname: gameConfig.room.roomname, message: this.hasWon()})
            newGame()
        }
    }
}

export class Board {
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
            instance_p5.line(object.xStart, object.yStart, object.xEnd, object.yEnd)
        }
    }
}

export class Arrays {
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

export class Network {
    constructor(serverUrl) {
        this.serverUrl = serverUrl;
        this.socket = io(this.serverUrl)
        this.isListening = false;
    } 


    onGameUpdate(roomname) {
        this.socket.on(`update-${roomname}`, (data) => {
            gameConfig.game.updateGame(data) // Update game
        })
    }

    onGameWinner(roomname) {
        this.socket.on(`winner-${roomname}`, (data) => {
			gameConfig.game.disableKeys = true;
			metaInformation.hasWon = data.message;
			newGame() // Start a new game
        })
    }

    onRoomUpdate(roomname) {
        this.socket.on(`room-update-${roomname}`, (data) => {
            gameConfig.room.update(data)
            metaInformation.waitingForPlayers = false
        })
    }

    gameUpdate(data) {
        this.socket.emit('update', data)
    }

    winnerUpdate(data) {
        this.socket.emit(`winner`, data)
    }
}

