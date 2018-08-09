var socket;
var player = "ellipse" // Rect / Ellipse
var playerObjects = []
var movesLeft = 9;
var gameEnabled = true;
var alreadyTaken;
var positionsTaken;
var winScenarios;

function setup() {
	textFont('Helvetica');
	socket = io("http://localhost:3000")
	createCanvas(600, 600)
	background(51)
	noFill()
	stroke(255)
	newGame()
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

function newGame() {
	background(51)
	alreadyTaken = []
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

	gameEnabled = true;
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

function updateArrays(config) {
	switch (config.position) {
		case "A":
			winScenarios.x1.push(config.player);
			winScenarios.y1.push(config.player);
			winScenarios.d1.push(config.player);
			break;
		case "B":
			winScenarios.x2.push(config.player);
			winScenarios.y1.push(config.player);
			break;
		case "C":
			winScenarios.x3.push(config.player);
			winScenarios.y1.push(config.player);
			winScenarios.d2.push(config.player);
			break;
		case "D":
			winScenarios.x1.push(config.player);
			winScenarios.y2.push(config.player);
			break;
		case "E":
			winScenarios.x2.push(config.player);
			winScenarios.y2.push(config.player);
			winScenarios.d1.push(config.player);
			winScenarios.d2.push(config.player);
			break;
		case "F":
			winScenarios.x3.push(config.player);
			winScenarios.y2.push(config.player);
			break;
		case "G":
			winScenarios.x1.push(config.player);
			winScenarios.y3.push(config.player);
			winScenarios.d2.push(config.player);
			break;
		case "H":
			winScenarios.x2.push(config.player);
			winScenarios.y3.push(config.player);
			break;
		case "I":
			winScenarios.x3.push(config.player);
			winScenarios.y3.push(config.player);
			winScenarios.d1.push(config.player);
			break;	
	}


}

function drawObject(config) {
	if(!positionsTaken.includes(config.position)) {
			updateArrays(config)
			switch (config.player) {
				case "ellipse":
					drawCircle(config)
					break;
				case "cross":
					drawCross(config)
					break;
			}


	}

	positionsTaken.push(config.position)
	alreadyTaken.push({
		position: config.position, 
		player: config.player
	})
	var winner = hasWon()
	if(winner != undefined || movesLeft <= 0) {
		if(winner) {
			textShow = winner;
		} else {
			textShow = "Game tied"
		}
		fill(0, 0, 255);
		textSize(62);
		text(textShow, 0+20, height/2)
		gameEnabled = false;
		setTimeout(() => {
			newGame()
		}, 3000)		
	}
}





function hasWon() {
	for(arr in winScenarios) {
		let check = winScenarios[arr]
			
			var ellipseTimes = check.filter(function(value){
			    return value === "ellipse"
			}).length   

			var crossTimes = check.filter(function(value) {
				return value === "cross"
			}).length


			 if(crossTimes >= 3) {
				return "Cross has won"
			} 

			if(ellipseTimes >= 3) {
				return "Ellipse has won"
			} 		
	}
}




function drawCross(config) {
	
	line(config.x+50, config.y+50, config.x-50, config.y-50)
	line(config.x-50, config.y+50, config.x+50, config.y-50)
	/*
	playerObjects.push({
		player: "cross",
		line1: {x1: config.x+50,y1: config.y+50,x2: config.x-50,y2: config.y-50	},
		line2: {x1: config.x-50,y1: config.y+50,x2: config.x+50,y2: config.y-50}
	})
	*/

	movesLeft--;
	player = "ellipse"
}

function drawCircle(config) {
	
	ellipse(config.x, config.y, 100, 100)

/*
	playerObjects.push({
		player: "ellipse",
		ellipse: {x: config.x, y: config.y, d: 100}
	})
*/
	movesLeft--;
	player = "cross"
}


/*
			line(obj.line2.x1, obj.line2.y1, obj.line2.x2, obj.line2.y2)

*/