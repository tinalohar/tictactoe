const express = require("express")

module.exports = (io) => {
	let router = express.Router()

	var games = []
	var activeGamesNames = []

	router.get('/', (req, res) => {
		res.sendFile("index.html")
	})

	io.on('connection', (socket) => {
		socket.on('update', (data) => {
			console.log(data)
			socket.broadcast.emit(`update-${data.roomname}`, {
				next: data.next,
				objects: data.objects,
				movesLeft: data.movesLeft
			})
		})

		socket.on('winner', (data) => {
			socket.broadcast.emit(`winner-${data.roomname}`, {
				message: data.message
			})
		})
	})

	router.post('/new-game', (req, res) => {
		if(!req.body.roomname) {
			res.json({success: false, message: "You forgot to enter a room name"})
		} else if(!req.body.nickname) {
			res.json({success: false, message: "You forgot to enter a nickname"})
		} else if(activeGamesNames.includes(req.body.roomname)) {
			res.json({success: false, message: "that room appears to be in use, try another room name"})
		} else {
			var room = {
				roomname: req.body.roomname,
				player1: req.body.nickname,
				player2: "",
				objects: {
					lines: [],
					ellipses: []
				}
			}
			games.push(room)
			activeGamesNames.push(req.body.roomname)
			res.json({
				success: true, 
				room: room
			})
		}
	})

	router.post('/join-game', (req, res) => {
		var room = games.filter(i => i.roomname === req.body.roomname)[0]

		if(!room) {
			res.json({success: false, message: "Hmm, That room does not exist"})
		} else if(!req.body.nickname){
			res.json({success: false, message: "You forgot to pick a username"})
		} else {
			room.player2 = req.body.nickname;
			io.emit(`room-update-${req.body.roomname}`, room)
			res.json({success: true, room: room})
		}
	})

	
	return router;
}