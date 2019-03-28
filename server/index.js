//Require Packages
const express = require("express")
const bodyParser = require("body-parser")
const massive = require("massive")
const session = require("express-session")
const roomsController = require("./Controllers/roomsController")
require("dotenv").config()

//Build server
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

//app provisions
app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) );
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false
}))

//Connect to Database
massive(
    process.env.CONNECTION_STRING
).then(db => {
    console.log("Connected to Database")
    app.set("db",db)
}).catch(error =>{console.log(error)})

//Endpoints for rooms
app.get("/getPosts/:id", roomsController.getRoomData)
app.get("/getComments/:id", roomsController.getComments)
app.post("/newPost", roomsController.newPost)

//Server listen
const port = process.env.PORT
server.listen(port, ()=> console.log(`Server listening on port ${port}`));
