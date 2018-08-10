var socket;
var player = "ellipse" // Rect / Ellipse
var movesLeft;	
var gameEnabled = false;
var positionsTaken;
var winScenarios;
var showBoard = false;

var objects;
var room;
var playerTurn;
var playerNickname;
var lines = [];
var ellipses = [];
var disableKeys = true;
var listeningForUpdates = false;


const serverUrl = "http://d6a36906.ngrok.io"

function setup() {
	textFont('Helvetica');
	socket = io(serverUrl)
}

function draw() {
	if(showBoard) {
		board()

		lines.forEach((i) => {
			line(i.line1.x1, i.line1.y1, i.line1.x2, i.line1.y2)
			line(i.line2.x1, i.line2.y1, i.line2.x2, i.line2.y2)
		})

		ellipses.forEach((i) => {
			ellipse(i.circle.x1, i.circle.y1, i.circle.d1, i.circle.d2)
		})


			var winner = hasWon()
			if(winner) {
				metaInformation.hasWon = winner;
				disableKeys = true;
				newGame(3000)
				socket.emit(`winner`, {roomname: room.roomname, message: winner})
			}

			if(movesLeft === 0) {
				metaInformation.hasWon = "Game Tied"
				disableKeys = true;
				newGame(3000)
				socket.emit(`winner`, {roomname: room.roomname, message: "Game Tied"})
			}
	}
}




function board() {
	const lines = {
		y1: {xStart: width/3, yStart: 0, xEnd: width/3, yEnd: height},
		y2: {xStart: width/3*2, yStart: 0, xEnd: width/3*2, yEnd: height},
		x1: {xStart: 0, yStart: height/3, xEnd: width, yEnd: height/3},
		x2: {xStart: 0, yStart: height/3*2, xEnd: width, yEnd: height/3*2}
	}

	for(let key in lines) {
		var object = lines[key]
		line(object.xStart, object.yStart, object.xEnd, object.yEnd)
	}
}


function listenForUpdates() {
	socket.on(`update-${room.roomname}`, (data) => {
		playerTurn = data.next;
		disableKeys = false;
		objects = data.objects;
		movesLeft = data.movesLeft;
		lines = objects.lines;
		ellipses = objects.ellipses;
		positionsTaken = data.positionsTaken;
	})

	socket.on(`winner-${room.roomname}`, (data) => {
			disableKeys = true;
			newGame(3000)
			metaInformation.hasWon = data.message;
	})

	listeningForUpdates = true;
}
function newGame(time) {
	if(!listeningForUpdates) {
		listenForUpdates()
	}

	gameEnabled = false;
	setTimeout(() => {
		createCanvas(600, 600)
		background(51)
		noFill()
		stroke(255)

		background(51)
		positionsTaken = []
	    winScenarios = {
			x1: [],
			x2: [],
			x3: [],
			y1: [],
			y2: [],
			y3: [],
			d1: [],
			d2: [],
		}

		objects = {
			lines: [],
			ellipses: []
		}
		lines = []
		ellipses = []


		movesLeft = 9;
		gameEnabled = true;
		disableKeys = false;
		
		setTimeout(() => {
			metaInformation.hasWon = undefined;
		}, 3000);

	}, 0)
}



function mousePressed() {
	if(gameEnabled && playerTurn === playerNickname && !disableKeys && room.player1 && room.player2) {
		noFill()
		const centerItemValue = 100;

		if(mouseX > width || mouseX < 0) {
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
	if(!positionsTaken.includes(config.position)) {
		disableKeys = true;

			switch (playerNickname) {
				case room.player1:
					positionsTaken.push(config.position)
					updateArrays(config)
					drawCircle(config, positionsTaken)
					break;
				case room.player2:
					positionsTaken.push(config.position)
					updateArrays(config)
					drawCross(config, positionsTaken)
					break;
			}
	}
}





function hasWon() {
	for(arr in winScenarios) {
		if(winScenarios[arr].filter((value) => {
		    return value === room.player1
		}).length >= 3) { return "Circle Has Won!"}

		if(winScenarios[arr].filter((value) => {
			return value === room.player2
		}).length >= 3) { return "Cross Has Won!"}
	}
}


function drawCross(config, positionsTaken) {
	let cross = {
		line1: {x1: config.x+50, y1: config.y+50, x2: config.x-50, y2: config.y-50 },
		line2: {x1: config.x-50, y1: config.y+50, x2: config.x+50, y2: config.y-50 }
	}
	lines.push(cross)
	objects.lines.push(cross)
	movesLeft--;
	sendUpdate(room.player1, {
		objects: objects,
		movesLeft: movesLeft,
		positionsTaken: positionsTaken
	})
	player = room.player2
}

function drawCircle(config, positionsTaken) {
	let circle = {
		circle: {x1: config.x, y1: config.y, d1: 100, d2: 100}
	}
	ellipses.push(circle)
	objects.ellipses.push(circle)
	movesLeft--;
	sendUpdate(room.player2, {
		objects: objects,
		movesLeft: movesLeft,
		positionsTaken, positionsTaken
	})
	player = room.player2
}


function sendUpdate(next, meta) {
	socket.emit('update', {
		roomname: room.roomname,
		next: next,
		objects: meta.objects,
		movesLeft: meta.movesLeft,
		positionsTaken: meta.positionsTaken
	})
}