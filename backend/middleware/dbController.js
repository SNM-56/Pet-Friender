const pool = require('../models/userModel');

const dbController = {};

dbController.getUserData = async (req, res, next) => {
  // we need the id of the person who is logged in
  // preferences (cat, dog), probably { "type": "Dog" } or something like that, ask front end team lol
  // location -> zip code as a string
  try {
    // const { id, preferences, location } = req.body;
    // await pool.query('SELECT * from users', (err, result) => {
    //   if (err) {
    //     return next('Error getting user data in dbController.getUserData', err);
    //   } else {
    //     res.locals.body = result.rows[0];
    //     console.log('res.locals.body', res.locals.body);
    //     return next();
    //   }
    // });
    console.log('you all know', res.locals.body.id);
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
