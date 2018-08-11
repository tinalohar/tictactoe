

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

	 fetch(`${serverUrl}${config.url}`, httpConfig)
        .then(response => response.json()) // parses response to JSON
        .then(data => {
        	if(data.success) {
    			room = data.room;

    			if(config.url === "/new-game") {
					playerNickname = data.room.player1;
					metaInformation.player = {
						name: playerNickname,
						player: "circle"
					}

					metaInformation.waitingForPlayers = `waiting for: `
    			} else {
					playerNickname = data.room.player2;
					metaInformation.player = {
						name: playerNickname,
						player: "cross"
					}
					metaInformation.waitingForPlayers = undefined;
       			}

				socket.on(`room-update-${room.roomname}`, (data) => {
					room = data;
					metaInformation.waitingForPlayers = undefined;
				})

				metaInformation.currentlyMoving = room.player1;
				game = new Game(true, data.room.player1)
        		welcomeScreen.gameActive = true;
				metaInformation.gameActive = true;
				newGame()
        		
        	} else {
				welcomeScreen.errorMessage = data.message;
				setTimeout(() => {
					welcomeScreen.errorMessage = undefined;
				}, 5000)
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
		joinGameRoomname: "",
		errorMessage: undefined
	},
	methods: {
		startGame: function(nickname, roomname) {
			this.newGameNickname = "";
			this.newGameRoomname = "";
			serverAccess({url: "/new-game", data: {nickname: nickname, roomname: roomname}})
		},
		joinGame: function(nickname, roomname) {
			this.joinGameNickname = "";
			this.joinGameRoomname = "";
			serverAccess({url: "/join-game", data: {nickname: nickname, roomname: roomname}})
		},
		setState: function(state) {
			this.state = state;
		}
	},
	template: `
		<div class="inner-container" v-if="!gameActive">

			<div class="header">
				<button @click="setState('new-game')">New Game</button>
				<button @click="setState('join-game')">Join Game</button>
			</div>

			<div class="new-game" v-if="state === 'new-game' ">
				<h2>Start New Game</h2>
				<span v-if="errorMessage" id="errorMessageInfo">{{errorMessage}}</span>
				<div class="form">
					<div class="form-group">
						<label>Nickname</label>
						<input type="text" placeholder="Your nickname" v-model="newGameNickname" v-on:keyup.13="startGame(newGameNickname, newGameRoomname)" />
					</div>

					<div class="form-group">
						<label>Room Name</label>
						<input type="text" placeholder="Name of room" v-model="newGameRoomname" v-on:keyup.13="startGame(newGameNickname, newGameRoomname)" />
					</div>

					<div class="form-group">
						<button @click="startGame(newGameNickname, newGameRoomname)">Start Game</button>
					</div>
				</div>

			</div>
			
			<div class="join-game" v-if="state === 'join-game' ">
				<h2>Join An Existing Game</h2>
				<span v-if="errorMessage" id="errorMessageInfo">{{errorMessage}}</span>

				<div class="form">

					<div class="form-group">
						<label>Nickname</label>
						<input type="text" placeholder="Your nickname" v-model="joinGameNickname" v-on:keyup.13="joinGame(joinGameNickname, joinGameRoomname)"/>
					</div>

					<div class="form-group">
						<label>Room Name</label>
						<input type="text" placeholder="Name of room" v-model="joinGameRoomname" v-on:keyup.13="joinGame(joinGameNickname, joinGameRoomname)"/>
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
		player: {
			name: "",
			player: ""
		},
		hasWon: undefined,
		gameActive: false,
		waitingForPlayers: undefined
	},
	methods: {
		leaveGame: function() {},
	},
	template: `
		<div class="meta-info-header" v-if="gameActive">
			<span v-if="player.player === 'circle'">you are: <i class="fa fa-circle-thin" aria-hidden="true"></i></span>
			<span v-if="player.player === 'cross'">you are: <i class="fa fa-times" aria-hidden="true"></i></span>

			<span id="winText" v-if="hasWon">{{hasWon}}</span>
			<span v-if="waitingForPlayers">{{waitingForPlayers}} <i class="fa fa-times" aria-hidden="true"></i></span>
			<span>
				<a id="leaveGameTag" href="/">Leave Game <i class="fa fa-sign-out" aria-hidden="true"></i></a>
			</span>
		</div>
	`
})
