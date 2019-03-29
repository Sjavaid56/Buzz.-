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
    },
    // postBusiness:(req,res) => {
    //         const db = req.app.get("db")
    //         console.log( "postBusniess", req.body)
    //         req.body.forEach(element => {
    //            db.Crete_business([element.Name, element.Type, element.Lat, element.Lng])       
    //     })  
    // },    
    getBusiness:(req,res) => {
        const db = req.app.get('db')
        console.log('get bdata')
       db.get_business().then(Busniess => {
           res.status(200).json(Busniess)
       } )
    }
 }