import { metaInformation } from "./components";
import { Game, gameConfig, instance_p5, Circle, Cross } from "./classes";


export function newGame() {
	if(!gameConfig.network.isListening) {
		gameConfig.network.onGameUpdate(gameConfig.room.roomname)
		gameConfig.network.onGameWinner(gameConfig.room.roomname)
		gameConfig.network.isListening = true;
	}

	gameConfig.game.gameEnabled = false;
	var sketch_holder = document.getElementById("sketch-holder")
	sketch_holder.style.display = "block";
	instance_p5.createCanvas(600, 600).parent('sketch-holder')
	instance_p5.background(51)
	instance_p5.noFill()
	instance_p5.stroke(255)
	
	gameConfig.game = new Game(true, gameConfig.room.player1) // Parameters ( showBoard, startingPlayer )
	gameConfig.game.gameEnabled = true;

	setTimeout(() => {
		metaInformation.hasWon = undefined;
	}, 3000);


}



export function createObject(config) {
	if(!gameConfig.game.positionsTaken.includes(config.position)) {
		gameConfig.game.disableKeys = true;

			switch (gameConfig.playerNickname) {

				case gameConfig.room.player1:
					gameConfig.game.positionsTaken.push(config.position)
					gameConfig.game.arrays.update(config)
					gameConfig.game.objects.ellipses.push(new Circle(
						{x1: config.x, y1: config.y, d1: 100, d2: 100},
						{fillColor: 255, lifespan: 1}
					))
					gameConfig.game.movesLeft--;
					sendUpdate(gameConfig.room.player2)
					gameConfig.player = gameConfig.room.player2

					return;
	
				case gameConfig.room.player2:
					gameConfig.game.positionsTaken.push(config.position)
					gameConfig.game.arrays.update(config)
					gameConfig.game.objects.lines.push(new Cross(
						{x1: config.x+50, y1: config.y+50, x2: config.x-50, y2: config.y-50 },
						{x1: config.x-50, y1: config.y+50, x2: config.x+50, y2: config.y-50 }
					))
					gameConfig.game.movesLeft--;
					sendUpdate(gameConfig.room.player1)
					gameConfig.player = gameConfig.room.player2

					return;
			}
	}
}

export function sendUpdate(next) {
	gameConfig.network.gameUpdate({
		roomname: gameConfig.room.roomname,
		next: next,
		objects: gameConfig.game.objects,
		movesLeft: gameConfig.game.movesLeft,
		positionsTaken: gameConfig.game.positionsTaken
	})
}


