const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', proxy({target: 'https://localhost:4000'}));
    app.use('/auth', proxy({target: 'https://localhost:4000'}));
};