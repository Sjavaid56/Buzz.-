const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', proxy({target: 'https://thebuzzchat.com'}));
    app.use('/auth', proxy({target: 'https://thebuzzchat.com'}));
};