

const authController = require("./Controllers/authController")

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
app.use(express.static(`${__dirname}/../build`));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

//auth endpoint
app.get("/auth", authController.login)
app.get("/api/user-data", authController.getUserData)

//Connect to Database
massive(
    process.env.CONNECTION_STRING
).then(db => {
    console.log("Connected to Database")
    app.set("db", db)
}).catch(error => { console.log(error) })

//Endpoints for rooms
app.get("/getPosts/:id", roomsController.getRoomData)
app.get("/getComments/:id", roomsController.getComments)
app.post("/newPost", roomsController.newPost)
app.get('/getRooms', roomsController.getRooms)

//Sockets
io.sockets.on('connection', (socket) => {
    const db = app.get("db")
    console.log("User Connected")

    socket.join("Home")

    // io.in("Home").emit("NewPost", {})
    socket.on("NewPost", body => {
        const { poster_username, poster_pic, post_content, post_img, upvotes, downvotes, drinks_given, room_id } = body
        db.newPost([poster_username, poster_pic, post_content, post_img, upvotes, downvotes, drinks_given, room_id]).then(response => {
            console.log("Response after adding message: ", response)
            io.in("Home").emit("Newmessage", response)
        })
    })
    socket.on("NewComment", body => {
        console.log("Got body", body)
        const { comment_message, post_id, commenter_user_name, commenter_img, comment_upvotes, comment_downvotes, room_id } = body
        db.newComment([post_id, commenter_user_name, comment_message, comment_upvotes, comment_downvotes, commenter_img, room_id]).then(allComments => {
            io.in("Home").emit("AllComments", allComments)
        })
    })
    socket.on('JoinedRoom', body => {
        const { room_id, business_name, business_type, latitude, longitude, number_of_users } = body

        socket.join(room_id)

        db.join_user_to_room(room_id).then(room => {
            db.getPostsinRooms(room_id).then(roomData => {
                io.in(room_id).emit('SendRoomData', roomData)
            })
        })
    })
})


//Server listen
const port = process.env.PORT
server.listen(port, () => console.log(`Server listening on port ${port}`));

