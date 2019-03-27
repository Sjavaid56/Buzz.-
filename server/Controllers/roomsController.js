module.exports ={
    getRoomData:(req,res) =>{
        const db = req.app.get("db")
        const {id} = req.params
        db.getPostsinRoom(id).then(roomData =>{
            res.status(200).json(roomData)
        })
    },
    getComments:(req,res) =>{
        const db = req.app.get("db")
        const {id} = req.params
        db.getCommentsforRoom(id).then(comments =>{
            res.status(200).json(comments)
        })
    }
}