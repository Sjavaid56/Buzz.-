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
      console.log("USER INFO RESPONSE",userInfoResponse)


      return req.app.get('db').find_user_by_auth0_id(userData.sub).then(users => {
        console.log("Got user Information: ", users)
        if (users.length) {
          const user = users[0];
          req.session.user = user;
          res.redirect('/dashboard');
        } else {

          const createData = [userData.sub, userData.email, userData.name, userData.picture];
          return req.app.get('db').create_user(createData).then(newUsers => {
            const user = newUsers[0];
            req.session.user = user
            res.redirect('/tutorial');
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
  }
}


