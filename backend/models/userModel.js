const { Pool } = require('pg');

const pool = new Pool({
  connectionString: `postgres://fizxmgog:OGEYeJGBLpmp90rgSiJfh825on0nXDLc@mahmud.db.elephantsql.com/fizxmgog`,
});

// testing the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('test', result.rows);
  });
});

// create a table
const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR( 50 ) NOT NULL,
  email VARCHAR( 255 ) NOT NULL,
  password VARCHAR (50),
  location VARCHAR( 255 ),
  preference json NOT NULL)`;

pool.query(createUserTable, (err, results) => {
  if (err) {
    return console.error(err);
  }
  console.log(results);
});

pool.end();
