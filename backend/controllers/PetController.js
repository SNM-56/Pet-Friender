// need to import schema
const petController = {};

// TODO (Chris/Alex): Modify to use environment variables to store idKey and secret
//alex's key/secret
// const idKey = 'Td80x9tGqOQnNnlwX3oKu9hjvYBqbYZnuzGwijbPd4iEmsb7EH';
// const secret = 'SdDvmwwjpY4zjKYCpmGtwqGznXQu5JxY4ro8jOfK';

//tricia's keys
// const idKey = 'ETP9nJrnccMT9nAYIQpa8zxOKgrIJUyIMFsJNjXWIfg9jpAwd9'
// const secret = '0a8locc2QKcZd8gj9gfCfHz4ZzZoGIsJlyqZd45p'

// chris' key/secret
// const idKey = 'NkAKvJ91IkpakFYHnV8HYcgyqeOdFcYQvnWOlKrhptNrn4kFz8';
// const secret = 'pmNPLwJqpIR6rxDpl49qY1VjVg5zvRug8Kza60WW';

// jamie's key/secret
// const idKey = 'EGPxXXOai1WgDyLsFOWSQXpVHrX7JQ3SDxvBkAwdfl1NzTC60l'
// const secret = 'M1rtNVQmo9G5SrmqR73hxXXbclcpjgT8odPyskCB'

//jason's key/secret
const idKey = 'Fl7qnYb3k3vMNCW08WCqEDKRo4LKG8mfJh3SnjVg8tLoL2gVEE';
const secret = 'hrVXJ4xUJobzvFnC9VqmbQaZksc9HYPCHv9zWWTz';

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
    res.locals.body = req.body;
    res.locals.authToken = await petFinderRes.json();
    return next();
  } catch (e) {
    return next('Error in petController.getAuthToken', e);
  }
};

// gets pet data from PetFinder API and stores in res.locals.pets
petController.getAllPets = async (req, res, next) => {
  try {
    const url = `https://api.petfinder.com/v2/animals&limit=100`;
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
    return next('Error in petController.getAllPets', e);
  }
};

// gets dog data from PetFinder API and stores in res.locals.dogs
petController.getAllDogs = async (req, res, next) => {
  try {
    const url = `https://api.petfinder.com/v2/animals?type=Dog&limit=100`;
    const accessTokenObject = res.locals.authToken;
    const petResults = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessTokenObject.access_token}`
      }
    });
    const json = await petResults.json();
    res.locals.dogs = json.animals;
    return next();
  } catch (e) {
    return next('Error in petController.getAllDogs', e);
  }
};

// gets pet data from PetFinder API based on user preferences and stores in res.locals.preferences (based on species and zip code proximity)
petController.getPreferences = async (req, res, next) => {
  /*
    Incoming res.locals.userData from dbController.getUserData looks like this:
    {
      location: '90032',
      preference: { 
        species: 'Dog', 
        age: 'Young', 
        gender: 'Male', 
        size: 'Medium' 
      }
    }
  */
  try {
    const { location, preference } = res.locals.userData;
    const type = preference.species;
    // type filter by cat/dog and location filters by zip code
    const url = `https://api.petfinder.com/v2/animals?type=${type}&location=${location}&limit=100`;
    const accessTokenObject = res.locals.authToken;
    const petResults = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessTokenObject.access_token}`
      }
    });
    const json = await petResults.json();
    res.locals.preferences = json.animals;
    return next();
  } catch (e) {
    return next('Error in petController.getPreferences', e);
  }
};

module.exports = petController;
