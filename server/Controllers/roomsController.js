module.exports = {
    getRoomData: (req, res) => {
        const db = req.app.get("db")
        const { id } = req.params
        db.getPostsinRoom(id).then(roomData => {
            console.log("Sending data")
            res.status(200).json(roomData)
        })
    },
    getComments: (req, res) => {
        const db = req.app.get("db")
        const { id } = req.params
        db.getCommentsforRoom(id).then(comments => {
            res.status(200).json(comments)
        })
    },
    newPost: (req, res) => {
        const db = req.app.get("db")
        const { poster_username, poster_pic, post_content, post_img, upvotes, downvotes, drinks_given, room_id } = req.body
        console.log(req.body)
        db.newPost([poster_username, poster_pic, post_content, post_img, upvotes, downvotes, drinks_given, room_id]).then(allPosts => {
            res.status(200).json(allPosts)
        })
    },
    getRooms: (req, res) => {
        const db = req.app.get('db')

        db.get_rooms().then(rooms => {
            res.status(200).json(rooms)
        })
    }
}