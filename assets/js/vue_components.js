

function serverAccess(config) {
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
	    referrer: "no-referrer", // no-referrer, *client
	    body: JSON.stringify(config.data)
	}

	 fetch(config.url, httpConfig)
        .then(response => response.json()) // parses response to JSON
        .then(data => {
        	if(data.success) {

        		//console.log(data)


        		
    			room = data.room;
    			playerTurn = data.room.player1;

    			if(config.url === "/new-game") {
    				playerNickname = data.room.player1;
    			} else {
    				playerNickname = data.room.player2;
       			}

				socket.on(`room-update-${room.roomname}`, (data) => {
					//console.log("Room Update:", data)
					room = data;
				})

				metaInformation.player = playerNickname;
				metaInformation.currentlyMoving = room.player1;
        		showBoard = true;
        		newGame(0)
        		welcomeScreen.gameActive = true;
        		metaInformation.gameActive = true;
        		
        	}
	  })
}



var welcomeScreen = new Vue({
	el: "#welcomeScreen",
	data: {
		state: "new-game",
		gameActive: false,
		newGameNickname: "",
		newGameRoomname: "",
		joinGameNickname: "",
		joinGameRoomname: ""
	},
	methods: {
		startGame: function(nickname, roomname) {
			serverAccess({url: "/new-game", data: {nickname: nickname, roomname: roomname}})
		},
		joinGame: function(nickname, roomname) {
			serverAccess({url: "/join-game", data: {nickname: nickname, roomname: roomname}})
		},
		setState: function(state) {
			this.state = state;
		}
	},
	template: `
		<div class="container" v-if="!gameActive">
			<div class="header">
				<button @click="setState('new-game')">New Game</button>
				<button @click="setState('join-game')">Join Game</button>
			</div>

			<div class="new-game" v-if="state === 'new-game' ">
				<h2>New Game</h2>

				<div class="form">
					<div class="form-group">
						<label>Nickname</label>
						<input type="text" placeholder="Your nickname" v-model="newGameNickname" />
					</div>

					<div class="form-group">
						<label>Room Name</label>
						<input type="text" placeholder="Name of room" v-model="newGameRoomname" />
					</div>

					<div class="form-group">
						<button @click="startGame(newGameNickname, newGameRoomname)">Start Game</button>
					</div>
				</div>

			</div>
			
			<div class="join-game" v-if="state === 'join-game' ">
				<h2>Join Game</h2>

				<div class="form">

					<div class="form-group">
						<label>Nickname</label>
						<input type="text" placeholder="Your nickname" v-model="joinGameNickname" />
					</div>

					<div class="form-group">
						<label>Room Name</label>
						<input type="text" placeholder="Name of room" v-model="joinGameRoomname" />
					</div>

					<div class="form-group">
						<button @click="joinGame(joinGameNickname, joinGameRoomname)">Join Game</button>
					</div>
				</div>

			</div>

		</div>
		
	`
})

var metaInformation = new Vue({
	el: "#metaInfo",
	data: {
		player: "",
		hasWon: undefined,
		gameActive: false
	},
	template: `
		<div class="meta-info-header" v-if="gameActive">
			<span>You are: {{player}}</span>
			<span v-if="hasWon">{{hasWon}}</span>
		</div>
	`
})

// <span>Currently moving: {{currentlyMoving}}</span>