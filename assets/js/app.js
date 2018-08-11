var socket;

var room;
var playerNickname;
var listeningForUpdates = false;

var game;
var board;

function setup() {
	textFont('Helvetica');
	socket = io(serverUrl)
	board = new Board();
	
}

function draw() {

	if(game && game.showBoard) {
		board.drawBoard()
			var winner = hasWon()

			if(game.objects) {
				game.drawObjects()
			}
		
			if(game.movesLeft === 0 && !winner) {
				metaInformation.hasWon = "Game Tied"
				game.disableKeys = true;
				newGame()
				socket.emit(`winner`, {roomname: room.roomname, message: "Game Tied"})
			}

			if(winner) {
				metaInformation.hasWon = winner;
				game.disableKeys = true;
				newGame()
				socket.emit(`winner`, {roomname: room.roomname, message: winner})
			}

	}
}


function listenForUpdates() {
	socket.on(`update-${room.roomname}`, (data) => {
		game.updateGame(data) // Update game
	})

	socket.on(`winner-${room.roomname}`, (data) => {
			game.disableKeys = true;
			metaInformation.hasWon = data.message;

			newGame() // Start a new game
	})

	listeningForUpdates = true;
}
function newGame() {
	if(!listeningForUpdates) {
		listenForUpdates()
	}

	game.gameEnabled = false;
	var sketch_holder = document.getElementById("sketch-holder")
	sketch_holder.style.display = "block";
	var canvas = createCanvas(600, 600)
	canvas.parent('sketch-holder');

	background(51)
	noFill()
	stroke(255)

	background(51)
	
	game = new Game(true, room.player1)
	game.gameEnabled = true;

	setTimeout(() => {
		metaInformation.hasWon = undefined;
	}, 3000);


}



function mousePressed() {
	if(game && game.gameEnabled && game.playerTurn === playerNickname && !game.disableKeys && room.player1 && room.player2) {
		noFill()
		const centerItemValue = 100; // Position the objects in the center of the square

		if(mouseX > width || mouseX < 0) { // make sure that the mouse is on the board
			return
		} else if(mouseY > height || mouseY < 0) {
			return
		} else if(mouseX < width/3 && mouseY < height/3)  {
			drawObject({x: width/3-centerItemValue, y: height/3-centerItemValue, player: playerNickname, position: "A"})
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3) {
			drawObject({x: width/3*2-centerItemValue, y: height/3-centerItemValue, player: playerNickname, position: "B"})
		} else if(mouseX > width/3*2 && mouseY < height/3) {
			drawObject({x: width-centerItemValue, y: height/3-centerItemValue, player: playerNickname, position: "C"})
		} else if(mouseX < width/3 && mouseY > height/3 && mouseY < height/3*2) {
			drawObject({x: width/3-centerItemValue, y: height/3*2-centerItemValue, player: playerNickname, position: "D"}) 
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
			drawObject({x: width/3*2-centerItemValue, y: height/3*2-centerItemValue, player: playerNickname, position: "E"})
		} else if(mouseX > width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
			drawObject({x: width-centerItemValue, y: height/3*2-centerItemValue, player: playerNickname, position: "F"})
		} else if(mouseX < width/3 && mouseY > height/3*2) {
			drawObject({x: width/3-centerItemValue, y: height-centerItemValue, player: playerNickname, position: "G"}) 
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY > height/3*2) {
			drawObject({x: width/3*2-centerItemValue, y: height-centerItemValue, player: playerNickname, position: "H"}) 
		} else if(mouseX > width/3*2 && mouseY > height/3*2) {
			drawObject({x: width-centerItemValue, y: height-centerItemValue, player: playerNickname, position: "I"})  
		}
	}
}


function drawObject(config) {
	if(!game.positionsTaken.includes(config.position)) {
		game.disableKeys = true;

			switch (playerNickname) {
				case room.player1:
					game.positionsTaken.push(config.position)
					updateArrays(config)
					drawCircle(config)
					break;
				case room.player2:
					game.positionsTaken.push(config.position)
					updateArrays(config)
					drawCross(config)
					break;
			}
	}
}





function hasWon() {
	for(arr in game.winScenarios) {
		if(game.winScenarios[arr].filter((value) => {
		    return value === room.player1
		}).length >= 3) { return "Circle Has Won!"}

		if(game.winScenarios[arr].filter((value) => {
			return value === room.player2
		}).length >= 3) { return "Cross Has Won!"}
	}
}


function drawCross(config) {
	let cross = {
		line1: {x1: config.x+50, y1: config.y+50, x2: config.x-50, y2: config.y-50 },
		line2: {x1: config.x-50, y1: config.y+50, x2: config.x+50, y2: config.y-50 }
	}
	game.objects.lines.push(cross)
	game.movesLeft--;
	sendUpdate(room.player1)
	player = room.player2
}

function drawCircle(config) {
	let circle = {
		circle: {x1: config.x, y1: config.y, d1: 100, d2: 100}
	}
	game.objects.ellipses.push(circle)
	game.movesLeft--;
	sendUpdate(room.player2)
	player = room.player2
}


function sendUpdate(next) {
	socket.emit('update', {
		roomname: room.roomname,
		next: next,
		objects: game.objects,
		movesLeft: game.movesLeft,
		positionsTaken: game.positionsTaken
	})
}