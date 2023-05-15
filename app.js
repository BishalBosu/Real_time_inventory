require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const path = require("path")
const fs = require("fs")
const compression = require("compression")

const io = require("socket.io")(3000, {
	cors: { origin: ["http://localhost:3009"] },
})

const bodyParser = require("body-parser")
const sequelize = require("./utils/database")

//imported models
const Item = require("./models/item")

//imported routes
const inventoryRoutes = require("./routes/inventory")

const app = express()

//socket event handling
//socket.io connection handling
io.on("connection", (socket) => {
	socket.on("new-data-added", (data) => {
		socket.broadcast.emit("add-to-your-list", data)
	})

	socket.on("edited-data", (data) => {
		socket.broadcast.emit("replace-to-your-list", data)
	})

	socket.on("delete-item", (groupid) => {
		socket.broadcast.emit("delete-from-your-list", groupid)
	})
})

//making the public file availavail to client side.
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json({ extended: false }))

//for morgan
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "access.log"),
	{ flags: "a" }
)

//passing the middle wares
app.use(compression())
app.use(morgan("combined", { stream: accessLogStream }))

//putting  a filter
app.use("/inventory", inventoryRoutes)

app.use((req, res, next) => {
	res.redirect("/html/index.html")
})

//sync with sequelize enries
sequelize
	.sync()
	.then((result) => {
		//either run on PORT variable if not availavail 3006
		app.listen(process.env.PORT || 3009)
	})
	.catch((err) => console.log("DbErroRRR: ", err))
