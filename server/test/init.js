const massive = require('massive');

require('dotenv').config();

let dbPromise;

module.exports = {
    initDb() {
        dbPromise = dbPromise || massive('postgres://uytvgyojlekckj:5358ffcdbda0e642ed03cbbcb7ec556b425c23e9fbbac1cc0cedbe83da0bdb64@ec2-50-17-246-114.compute-1.amazonaws.com:5432/d90vu80fhe3bir?ssl=true');
        return dbPromise;
    }
}