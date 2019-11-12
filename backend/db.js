const Pool = require('pg').Pool
const pool = new Pool({
    user: 'juliet',
    host: 'localhost',
    database: 'teamwork',
    password: 'asdf',
    port: 5433,
})


module.exports = pool