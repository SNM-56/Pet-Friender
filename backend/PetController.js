// need to import schema
const petController = {};

const idKey = 'Td80x9tGqOQnNnlwX3oKu9hjvYBqbYZnuzGwijbPd4iEmsb7EH';
const secret = 'SdDvmwwjpY4zjKYCpmGtwqGznXQu5JxY4ro8jOfK';

// gets auth token from petFinder API
petController.getAuthToken = async (req, res, next) => {
  try {
    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');
    params.append('client_id', idKey);
    params.append('client_secret', secret);

    const petFinderRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: params
    });

    res.locals.authToken = await petFinderRes.json();

    return next();
  } catch (e) {
    return next({
      log: 'Error in petController.getAuthToken',
      status: 400,
      message: { err: `in petController.getAuthToken: ${e}` }
    });
  }
};

// gets pet data from PetFinder API and stores in res.locals.pets
petController.getAllPets = async (req, res, next) => {
  try {
    const url = `https://api.petfinder.com/v2/animals`;
    const accessTokenObject = res.locals.authToken;
    const petResults = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessTokenObject.access_token}`
      }
    });
    const json = await petResults.json();
    res.locals.pets = json.animals;
    return next();
  } catch (e) {
    return next({
      log: 'Error in petController.getPets',
      status: 400,
      message: { err: `in petController.getAllPets: ${e}` }
    });
  }
};

// gets dog data from PetFinder API and stores in res.locals.dogs
petController.getAllDogs = async (req, res, next) => {
  try {
    const url = `https://api.petfinder.com/v2/animals?type=Dog`;
    const accessTokenObject = res.locals.authToken;
    const petResults = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessTokenObject.access_token}`
      }
    });
    const json = await petResults.json();
    // console.log('GET DOGS', await json);
    res.locals.dogs = json.animals;
    return next();
  } catch (e) {
    return next({
      log: 'Error in petController.getPets',
      status: 400,
      message: { err: `in petController.getPets: ${e}` }
    });
  }
};

// gets all cat data from PetFinder API and stores in res.locals.cats
petController.getAllCats = async (req, res, next) => {
  try {
    const url = `https://api.petfinder.com/v2/animals?type=Cat`;
    const accessTokenObject = res.locals.authToken;
    const petResults = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessTokenObject.access_token}`
      }
    });
    const json = await petResults.json();
    res.locals.cats = json.animals;
    return next();
  } catch (e) {
    return next({
      log: 'Error in petController.getPets',
      status: 400,
      message: { err: `in petController.getAllCats: ${e}` }
    });
  }
};

module.exports = petController;
