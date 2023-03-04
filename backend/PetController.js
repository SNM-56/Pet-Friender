// need to import schema
const petController = {};

const idKey = 'Td80x9tGqOQnNnlwX3oKu9hjvYBqbYZnuzGwijbPd4iEmsb7EH';
const secret = 'SdDvmwwjpY4zjKYCpmGtwqGznXQu5JxY4ro8jOfK';

//fetch auth token from
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

//return all pets that meet preferences
petController.getAllPets = async (req, res, next) => {
  try {
    const url = `https://api.petfinder.com/v2/animals`;
    const oAuthToken = res.locals.authToken;
    console.log('oAthToken', oAuthToken);
    const results = await fetch(url, {
      Authorization: `Bearer ${oAuthToken.access_token}`
    });
    res.locals.pets = await results.json();
    return next();
  } catch (e) {
    return next({
      log: 'Error in petController.getPets',
      status: 400,
      message: { err: `in petController.getPets: ${e}` }
    });
  }
};

// get auth token >>
// get all of the pets >>
//**later** filter based on location
//**later** filter pets based on preferences >>

module.exports = petController;
