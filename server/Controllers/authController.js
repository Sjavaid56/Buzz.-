const axios = require("axios")

module.exports = {
  login: (req, res) => {
    const db = req.app.get("")


    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/`
    };

    function tradeCodeForAccessToken() {
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }

    function tradeAccessTokenForUserInfo(accessTokenResponse) {
      const accessToken = accessTokenResponse.data.access_token;
      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`);
    }

    function storeUserInfoInDataBase(userInfoResponse) {
      const userData = userInfoResponse.data;
      console.log('userData', userData)


      return req.app.get('db').find_user_by_auth0_id(userData.sub).then(users => {
        if (users.length) {
          console.log("FOUND USER TO LOG IN:", users)
          const user = users[0];
          if(user.admin === true){
            req.app.get("db").getAdminPostData(user.admin_of).then(allAdminPostData =>{
              console.log("ADMIN DATA: ", allAdminPostData)
              req.session.adminPostData = allAdminPostData
              console.log("ADMIN SESSION VARIABLE: ", req.session.adminData)
              req.session.user = user;
            }).then(() =>{
              res.status(200).redirect('/adminDashboard')
            })
            
            
          }
          else if(user.admin === false){
            req.session.user = user;
            res.redirect('https://thebuzzchat.com/dashboard');
          }
          
        } 
        else {
          const createData = [userData.sub, userData.email, userData.name, userData.picture];
          return req.app.get('db').create_user(createData).then(newUsers => {
            const user = newUsers[0];
            req.session.user = user
            res.redirect('https://thebuzzchat.com/tutorial');
          })
        }
      })
    }
    tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoInDataBase)
      .catch(err => console.log(err))
  },
  getUserData(req, res) {
    console.log("Sending", req.session.user);
    res.status(200).json(req.session.user);
  },
  getAdminData(req,res){
    console.log('SESSION:' , req.session)
    console.log("Sending admin data:", req.session.adminPostData)
    res.status(200).json(req.session.adminPostData)
  }
}


