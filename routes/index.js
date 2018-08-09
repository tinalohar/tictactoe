const express = require("express")

module.exports = (io) => {
	let router = express.Router()

	router.get('/', (req, res) => {
		res.sendFile("index.html")
	})

	io.on('connection', (socket) => {
		console.log("Connection")
	})
	
	return router;
}