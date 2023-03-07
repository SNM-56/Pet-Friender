const pool = require('../models/userModel');

const dbController = {};

// queries the database for user data based on id and stores in res.locals.userData
dbController.getUserData = async (req, res, next) => {
  try {
    // TODO (Chris/Alex): Modify SELECT in db query as needed by frontend team, currently returns location and preference based on user id from res.locals.body (which is  set in petController.getAuthToken)
    console.log('REQ BODY IN DBCONTROLLER.GETUSERDATA', req.body);
    console.log('RES LOCALS BODY IN DBCONTROLLER.GETUSERDATA', res.locals.body);
    const result = await pool.query(`SELECT location, preference FROM users WHERE id = ${res.locals.body.id};`);
    res.locals.userData = result.rows[0];
    return next();
  } catch (error) {
    return next('Error getting user data in dbController.getUserData', error);
  }
};

dbController.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('BODY EMAIL:', email, 'BODY PASSWORD: ', password);
    const dbPassword = await pool.query(`SELECT password FROM users WHERE email = '${email}'`);
    console.log('DB PASSWORD in dbController.signIn', dbPassword.rows[0]);
    if (password === dbPassword.rows[0].password) {
      res.locals.isSignedIn = true;
    } else {
      res.locals.isSignedIn = false;
    }
    return next();
  } catch (error) {
    return next('Error in dbController.signIn', error);
  }
};

dbController.endPool = async (req, res, next) => {
  try {
    pool.end();
    return next();
  } catch (error) {
    return next('Error ending pool in dbController.endPool', error);
  }
};

dbController.checkValid = async (req, res, next) => {
  try {
    const { email } = req.body;
    res.locals.body = req.body;

    // const queryAll = 'SELECT * FROM users';
    // const queryEmail = `SELECT email FROM users WHERE EXISTS (SELECT email FROM users WHERE email = '${email}' LIMIT 1);`;
    const queryEmail = `SELECT * FROM users WHERE email = '${email}';`;

    const result = await pool.query(queryEmail);

    if (result.rows.length === 0) {
      console.log('NEW USER Req.Body in checkValid: ', req.body);
      return next();
    } else return next(`Error in dbControoller.checkValid: email ${email} already exists`);
  } catch (error) {
    return next('Error in dbController.checkValid', error);
  }
};

dbController.createUser = async (req, res, next) => {
  try {
    const { name, email, password, location, preference } = res.locals.body;
    const userPreferences = JSON.stringify(preference);
    const insertTest = `
      INSERT INTO users (name, email, password, location, preference)
      VALUES ('${name}', '${email}', ${password}, '${location}', '${userPreferences}');
    `;

    const result = await pool.query(insertTest);
    res.locals.user = result.rows;
    return next();
  } catch (error) {
    return next('Error in dbController.createUser', error);
  }
};

module.exports = dbController;
