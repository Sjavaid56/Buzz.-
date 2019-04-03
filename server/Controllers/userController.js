module.exports = {
    //logout user
    logoutUser: (req, res) => {
        req.session.destroy()
        res.status(200).end()
    },

    getUsername: (req,res) => {
        const db = req.app.get('db')
        const {user, username} = req.params
        db.update_username([username, user]).then(response => {
            res.status(200).json(repsonse)
        })   

    },
    getDrinksForUser:(req,res) =>{
        const db = req.app.get("db")
        const {id} = req.params
        db.get_drinks_for_user(id).then(response =>{
            res.status(200).json(response)
        })
    },



}