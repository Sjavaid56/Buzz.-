module.exports = {
    //logout user
    logoutUser: (req, res) => {
        req.session.destroy()
        res.status(200).end()
    }
}