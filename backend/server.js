const express = require('express');
const petController = require('./controllers/PetController');
const dbController = require('./middleware/dbController');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  '/api/preferences/',
  petController.getAuthToken,
  dbController.getUserData,
  petController.getPreferences,
  (req, res) => {
    res.status(200).send(res.locals.preferences);
  }
);

app.get('/api/all', petController.getAuthToken, petController.getAllPets, (req, res) => {
  res.status(200).send(res.locals.pets);
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`listening on port: ${port}`));
