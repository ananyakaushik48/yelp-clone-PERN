const { Pool } = require('pg');

const pool = new Pool();
// PG knows to look for a .env file which contains all the information we have to feed to pool
module.exports = {
    query: (text, params) => pool.query(text, params),
};