const express = require("express")

module.exports = (io) => {
	let router = express.Router()

	var games = []
	var activeGames = []

	router.get('/', (req, res) => {
		res.sendFile("index.html")
	})

	io.on('connection', (socket) => {
		socket.on('update', (data) => {
			socket.broadcast.emit(`update-${data.roomname}`, {
				next: data.next,
				objects: data.objects
			})
		})

		socket.on('winner', (data) => {
			socket.broadcast.emit(`winner-${data.roomname}`, {
				message: data.message
			})
		})
	})

	router.post('/new-game', (req, res) => {
		console.log("New Game:", req.body)
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

		res.json({
			success: true, 
			room: room
		})

	})

	router.post('/join-game', (req, res) => {
		console.log("Join Game:", req.body)
		var room = games.filter(i => i.roomname === req.body.roomname)[0]
		room.player2 = req.body.nickname;

		io.emit(`room-update-${req.body.roomname}`, room)
		res.json({success: true, room: room})
	})

	
	return router;
}