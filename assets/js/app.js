var network;

var room;
var playerNickname;
var listeningForUpdates = false;

var game;

function setup() {
	textFont('Helvetica');
	network = new Network(serverUrl)
}

function draw() {

	if(game && game.showBoard) {
		game.board.draw()
			if(game.objects) {
				game.drawObjects()
			}
			
			var winner = hasWon()
			if(game.movesLeft === 0 && !winner) {
				metaInformation.hasWon = "Game Tied"
				game.disableKeys = true;
				newGame()
				network.winnerUpdate({roomname: room.roomname, message: winner})
			}

			if(winner) {
				metaInformation.hasWon = winner;
				game.disableKeys = true;
				newGame()
				network.winnerUpdate({roomname: room.roomname, message: winner})
			}

	}
}


function newGame() {
	if(!network.isListening) {
		network.onGameUpdate(room.roomname)
		network.onGameWinner(room.roomname)
		network.isListening = true;
	}

	game.gameEnabled = false;
	var sketch_holder = document.getElementById("sketch-holder")
	sketch_holder.style.display = "block";
	var canvas = createCanvas(600, 600)
	canvas.parent('sketch-holder');

	background(51)
	noFill()
	stroke(255)
	
	game = new Game(true, room.player1) // Parameters ( showBoard, startingPlayer )
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
			createObject({x: width/3-centerItemValue, y: height/3-centerItemValue, player: playerNickname, position: "A"})
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3) {
			createObject({x: width/3*2-centerItemValue, y: height/3-centerItemValue, player: playerNickname, position: "B"})
		} else if(mouseX > width/3*2 && mouseY < height/3) {
			createObject({x: width-centerItemValue, y: height/3-centerItemValue, player: playerNickname, position: "C"})
		} else if(mouseX < width/3 && mouseY > height/3 && mouseY < height/3*2) {
			createObject({x: width/3-centerItemValue, y: height/3*2-centerItemValue, player: playerNickname, position: "D"}) 
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
			createObject({x: width/3*2-centerItemValue, y: height/3*2-centerItemValue, player: playerNickname, position: "E"})
		} else if(mouseX > width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
			createObject({x: width-centerItemValue, y: height/3*2-centerItemValue, player: playerNickname, position: "F"})
		} else if(mouseX < width/3 && mouseY > height/3*2) {
			createObject({x: width/3-centerItemValue, y: height-centerItemValue, player: playerNickname, position: "G"}) 
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY > height/3*2) {
			createObject({x: width/3*2-centerItemValue, y: height-centerItemValue, player: playerNickname, position: "H"}) 
		} else if(mouseX > width/3*2 && mouseY > height/3*2) {
			createObject({x: width-centerItemValue, y: height-centerItemValue, player: playerNickname, position: "I"})  
		}
	}
}


function createObject(config) {
	if(!game.positionsTaken.includes(config.position)) {
		game.disableKeys = true;

			switch (playerNickname) {

				case room.player1:
					game.positionsTaken.push(config.position)
					game.arrays.update(config)

					let circle = new Circle({
						circle: {x1: config.x, y1: config.y, d1: 100, d2: 100}
					})
				
					game.objects.ellipses.push(circle)
					game.movesLeft--;
					sendUpdate(room.player2)
					player = room.player2

					return;
	
				case room.player2:
					game.positionsTaken.push(config.position)
					game.arrays.update(config)
					
					let cross = new Cross({
						line1: {x1: config.x+50, y1: config.y+50, x2: config.x-50, y2: config.y-50 },
						line2: {x1: config.x-50, y1: config.y+50, x2: config.x+50, y2: config.y-50 }
					})
				
					game.objects.lines.push(cross)
					game.movesLeft--;
					sendUpdate(room.player1)
					player = room.player2

					return;
			}
	}
}





function hasWon() {
	for(arr in game.arrays.winScenarios) {
		if(game.arrays.winScenarios[arr].filter((value) => {
		    return value === room.player1
		}).length >= 3) { return "Circle Has Won!"}

		if(game.arrays.winScenarios[arr].filter((value) => {
			return value === room.player2
		}).length >= 3) { return "Cross Has Won!"}
	}
}



function sendUpdate(next) {
	network.gameUpdate({
		roomname: room.roomname,
		next: next,
		objects: game.objects,
		movesLeft: game.movesLeft,
		positionsTaken: game.positionsTaken
	})
}
