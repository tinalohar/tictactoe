var socket;
var player = "ellipse" // Rect / Ellipse
var movesLeft
var gameEnabled = false;
var positionsTaken;
var winScenarios;

function setup() {
	textFont('Helvetica');
	socket = io("http://localhost:3000")
	createCanvas(600, 600)
	background(51)
	noFill()
	stroke(255)
	newGame(0)
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


function draw() {
	board()
}

function newGame(time) {
	gameEnabled = false;
	setTimeout(() => {
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

		movesLeft = 9;
		gameEnabled = true;

	}, time)
}

function mousePressed() {
	if(gameEnabled) {
		noFill()
		const centerItemValue = 100;

		if(mouseX > width || mouseX < 0) {
			return
		} else if(mouseY > height || mouseY < 0) {
			return
		} else if(mouseX < width/3 && mouseY < height/3)  {
			drawObject({x: width/3-centerItemValue, y: height/3-centerItemValue, player: player, position: "A"})
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3) {
			drawObject({x: width/3*2-centerItemValue, y: height/3-centerItemValue, player: player, position: "B"})
		} else if(mouseX > width/3*2 && mouseY < height/3) {
			drawObject({x: width-centerItemValue, y: height/3-centerItemValue, player: player, position: "C"})
		} else if(mouseX < width/3 && mouseY > height/3 && mouseY < height/3*2) {
			drawObject({x: width/3-centerItemValue, y: height/3*2-centerItemValue, player: player, position: "D"}) 
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
			drawObject({x: width/3*2-centerItemValue, y: height/3*2-centerItemValue, player: player, position: "E"})
		} else if(mouseX > width/3*2 && mouseY < height/3*2 && mouseY > height/3) {
			drawObject({x: width-centerItemValue, y: height/3*2-centerItemValue, player: player, position: "F"})
		} else if(mouseX < width/3 && mouseY > height/3*2) {
			drawObject({x: width/3-centerItemValue, y: height-centerItemValue, player: player, position: "G"}) 
		} else if(mouseX > width/3 && mouseX < width/3*2 && mouseY > height/3*2) {
			drawObject({x: width/3*2-centerItemValue, y: height-centerItemValue, player: player, position: "H"}) 
		} else if(mouseX > width/3*2 && mouseY > height/3*2) {
			drawObject({x: width-centerItemValue, y: height-centerItemValue, player: player, position: "I"})  
		}
	}
}


function drawObject(config) {
	if(!positionsTaken.includes(config.position)) {
			switch (config.player) {
				case "ellipse":
					updateArrays(config)
					drawCircle(config)
					positionsTaken.push(config.position)
					break;
				case "cross":
					updateArrays(config)
					drawCross(config)
					positionsTaken.push(config.position)
					break;
			}
	}

	
	var winner = hasWon()
	if(winner) {
		newGame(3000)
	} else if(movesLeft <= 0) {
		newGame(3000)		
	}

}





function hasWon() {
	for(arr in winScenarios) {
		if(winScenarios[arr].filter((value) => {
		    return value === "ellipse"
		}).length >= 3) { return "Ellipse has won"}

		if(winScenarios[arr].filter((value) => {
			return value === "cross"
		}).length >= 3) { return "Cross has won"}
	}
}




function drawCross(config) {
	line(config.x+50, config.y+50, config.x-50, config.y-50)
	line(config.x-50, config.y+50, config.x+50, config.y-50)
	movesLeft--;
	player = "ellipse"
}

function drawCircle(config) {
	ellipse(config.x, config.y, 100, 100)
	movesLeft--;
	player = "cross"
}
