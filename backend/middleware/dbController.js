const pool = require('../models/userModel');

const dbController = {};

// queries the database for user data based on id and stores in res.locals.userData
dbController.getUserData = async (req, res, next) => {
  try {
    // TODO (Chris/Alex): Modify SELECT in db query as needed by frontend team, currently returns location and preference based on user id from res.locals.body (which is  set in petController.getAuthToken)
    await pool.query(`SELECT location, preference FROM users WHERE id = ${res.locals.body.id};`, (err, result) => {
      if (err) {
        return next('Error getting user data in dbController.getUserData', err);
      } else {
        res.locals.userData = result.rows[0];
        console.log('res.locals.userData', res.locals.userData);
        return next();
      }
    });
  } catch (error) {
    return next('Error getting user data in dbController.getUserData', error);
  }
};

module.exports = dbController;
