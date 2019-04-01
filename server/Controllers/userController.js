module.exports = {
    UserLocation: (req, res) => {
        const db = req.app.get("db")
        console.log(req.body.currentLocation)
        console.log(req.body.user_id)
        db.User_location([req.body.currentLocation.lat,req.body.currentLocation.lng,req.body.user_id]).then(UserGeo => {
            console.log("db post",UserGeo)
            res.status(200).json(UserGeo)
        // }).catch(error => {
        //     console.log("ERROR!! " + error)
        //   })
    })
}
}