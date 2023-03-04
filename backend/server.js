// server static files
const idKey = 'Td80x9tGqOQnNnlwX3oKu9hjvYBqbYZnuzGwijbPd4iEmsb7EH';
const secret = 'SdDvmwwjpY4zjKYCpmGtwqGznXQu5JxY4ro8jOfK';
let token;

const fetchAccessToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', idKey);
  params.append('client_secret', secret);
  const petFinderRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: params
  });
  token = await petFinderRes.json();
};

fetchAccessToken();

console.log('petFinder auth Token: LAST TIME ', token);
