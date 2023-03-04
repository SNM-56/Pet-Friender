import React, { useEffect, useState } from 'react';

// we should probably stash these in a dotenv file.
const idKey = 'Td80x9tGqOQnNnlwX3oKu9hjvYBqbYZnuzGwijbPd4iEmsb7EH';
const secret = 'SdDvmwwjpY4zjKYCpmGtwqGznXQu5JxY4ro8jOfK';

function App() {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', idKey);
      params.append('client_secret', secret);
      const petFinderRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: params
      });
      setAuthToken(await petFinderRes.json());
    };
    fetchAccessToken();
  }, []);

  console.log('petFinder auth Token: LAST TIME ', authToken);
  // we'll need to pass down our token using the createContext hook
  return <p>{JSON.stringify(authToken)}</p>;
}

export default App;
