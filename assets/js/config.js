import { welcomeScreen, metaInformation } from "./components";
import { Room, Game, gameConfig } from "./classes";
import { newGame } from "./main";
import { httpConfig, serverUrl } from "./http.config";


export function updateMetaInformation(config) {
	gameConfig.playerNickname = config.nickname;
	metaInformation.waitingForPlayers = config.waitingForPlayers;
	metaInformation.player = {
		name: config.nickname,
		player: config.player
	}

	welcomeScreen.gameActive = true;
	metaInformation.gameActive = true;
}

export function serverAccess(config) {
	httpConfig.body = JSON.stringify(config.data)
	fetch(`${serverUrl}${config.url}`, httpConfig).then(response => response.json()).then(data => {
		   if(!data.success) {
			   welcomeScreen.errorMessage = data.message;
			   setTimeout(() => {
				   welcomeScreen.errorMessage = undefined;
			   }, 5000)
		   } else {
			   gameConfig.room = new Room(data.room)


			   if(config.newgame) {
				   updateMetaInformation({nickname: data.room.player1, player: "circle", waitingForPlayers: true})
				   gameConfig.network.onRoomUpdate(gameConfig.room.roomname)

			   } else {
				   updateMetaInformation({nickname: data.room.player2, player: "cross", waitingForPlayers: false})
			   }
				  
			   gameConfig.game = new Game(true, data.room.player1)
			   removeBackground()
			   newGame()
		   }
	 })
}


function removeBackground() {
	var target = document.getElementsByTagName("body");
	target[0].style.background = "none";
}
