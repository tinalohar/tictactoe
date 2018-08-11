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


function updateArrays(config) {
	let winScenarios = game.winScenarios;

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

				   socket.on(`room-update-${room.roomname}`, (data) => {
					   room = data;
					   metaInformation.waitingForPlayers = false
				   })

			   } else {
				   updateMetaInformation({nickname: data.room.player2, player: "cross", waitingForPlayers: false})
			   }
				  
			   game = new Game(true, data.room.player1)
			   newGame()
		   }
	 })
}
