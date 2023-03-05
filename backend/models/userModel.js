/* eslint-disable no-unused-vars */
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: `postgres://fizxmgog:OGEYeJGBLpmp90rgSiJfh825on0nXDLc@mahmud.db.elephantsql.com/fizxmgog`
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
  INSERT INTO users (name, email, location, preference)
  VALUES ('testUser', 'test@123.com', '90032', '${jsonData}')
`;

// pool.query(insertTest, async (err, results) => {
//   if (err) {
//     return console.error(err);
//   }
//   return;
// });

pool.query('SELECT * FROM users', (err, results) => {
  if (err) {
    return console.error('ERROR IN SELECT ALL FROM USERS', err);
  }
  // console.log('RESULT ROWS', results.rows);
  return;
});

// pool.end();

module.exports = pool;
