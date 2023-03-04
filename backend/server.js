const express = require('express');
const petController = require('./PetController');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gets all pet data from petFinder API
app.get('/api/cats', petController.getAuthToken, petController.getAllCats, (req, res) => {
  res.status(200).send(res.locals.cats);
});

app.get('/api/dogs', petController.getAuthToken, petController.getAllDogs, (req, res) => {
  res.status(200).send(res.locals.dogs);
});

app.get('/api/all', petController.getAuthToken, petController.getAllPets, (req, res) => {
  res.status(200).send(res.locals.pets);
});

// global error handler
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
