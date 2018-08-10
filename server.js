const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")


const app = express()

const http = require("http").Server(app)
const io = require('socket.io')(http);

app.use(express.static(path.join("assets")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", require("./routes/index")(io))

http.listen(3000, () => {
	console.log("Server started on port 3000...")
})