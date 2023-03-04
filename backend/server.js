// const express = require('express');
// const path = require('path');
const port = 3000;
// import express from 'express';
// import path from 'path';
// import petController from './PetController.js';
const path = require('path');
const express = require('express');
const petController = require('./PetController');
// require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../dist')));

// get All Pets
app.get('/api/pets', petController.getAuthToken, petController.getAllPets, (req, res) => {
  res.status(200).send(res.locals.pets);
});

// get Auth token from petFinder
// app.get('/api', petController.getAuthToken, (req, res) => {
//   res.status(200).send(res.locals.authToken);
// });

// error handler
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
