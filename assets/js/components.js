import { serverAccess } from "./config"; 
import welcomeTemplate  from "./templates/welcomeScreen.template";
import metaTemplate  from "./templates/metaInformation.template"


export var welcomeScreen = new Vue({ // components.js
		el: "#welcomeScreen",
		data: {
			state: "new-game",
			gameActive: false,
			newGameNickname: "",
			newGameRoomname: "",
			joinGameNickname: "",
			joinGameRoomname: "",
			errorMessage: undefined,
			isActive: false,
			containerActive: true
		},
		methods: {
			startGame: function(nickname, roomname) {
				this.newGameNickname = "";
				this.newGameRoomname = "";
				serverAccess({url: "/new-game", newgame: true, data: {nickname: nickname, roomname: roomname}})
			},
			joinGame: function(nickname, roomname) {
				this.joinGameNickname = "";
				this.joinGameRoomname = "";
				serverAccess({url: "/join-game", newgame: false, data: {nickname: nickname, roomname: roomname}})
			},
			setState: function(state) {
				this.isActive = state;
			}
		},
		template: welcomeTemplate()
	})

export var metaInformation = new Vue({
		el: "#metaInfo",
		data: {
			player: {
				name: "",
				player: ""
			},
			hasWon: undefined,
			gameActive: false,
			waitingForPlayers: true
		},
		methods: {
			leaveGame: function() {},
		},
		template: metaTemplate()
	})



