const serverUrl = "http://localhost:3000"

var httpConfig = {
	method: "POST", // *GET, POST, PUT, DELETE, etc.
	mode: "cors", // no-cors, cors, *same-origin
	headers: {
			'Accept': 'application/json',
			  'Content-Type': 'application/json'
	},
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "same-origin", // include, same-origin, *omit
	redirect: "follow", // manual, *follow, error
	referrer: "no-referrer" // no-referrer, *client
}


function updateMetaInformation(config) {
	playerNickname = config.nickname;
	metaInformation.waitingForPlayers = config.waitingForPlayers;
	metaInformation.player = {
		name: config.nickname,
		player: config.player
	}

	welcomeScreen.gameActive = true;
	metaInformation.gameActive = true;
}

function serverAccess(config) {
	httpConfig.body = JSON.stringify(config.data)
	fetch(`${serverUrl}${config.url}`, httpConfig).then(response => response.json()).then(data => {
		   if(!data.success) {
			   welcomeScreen.errorMessage = data.message;
			   setTimeout(() => {
				   welcomeScreen.errorMessage = undefined;
			   }, 5000)
		   } else {
			   room = data.room;
			   if(config.newgame) {
				   updateMetaInformation({nickname: data.room.player1, player: "circle", waitingForPlayers: true})
				   network.onRoomUpdate(room.roomname)

			   } else {
				   updateMetaInformation({nickname: data.room.player2, player: "cross", waitingForPlayers: false})
			   }
				  
			   game = new Game(true, data.room.player1)
			   newGame()
		   }
	 })
}
