const { Pool } = require('pg');

const pool = new Pool({
  connectionString: `postgres://fizxmgog:OGEYeJGBLpmp90rgSiJfh825on0nXDLc@mahmud.db.elephantsql.com/fizxmgog`,
});

// testing the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, results) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    return;
  });
});

// create user table
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
  return;
});

// insert test data
const jsonData = JSON.stringify({ species: 'Dog', age: 'Young', gender: 'Male', size: 'Medium' });

const insertTest = `
  INSERT INTO users (name, email, preference)
  VALUES ('testUser', 'test@123.com', '${jsonData}')
`;

pool.query(insertTest, (err, results) => {
  if (err) {
    return console.error(err);
  }
  return;
});


pool.end();
