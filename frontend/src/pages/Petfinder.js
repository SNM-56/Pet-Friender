import React, { useEffect, useState } from 'react';

// components to be passed down
import MainContainer from '../container/MainContainer';

const Petfinder = () => {
  // will have 3 things name&description, image , buttons

  return (
    <div className="petfinder">
      <div className="pets">
        <p>Take a look at the pets!</p>
        <MainContainer />
      </div>
    </div>
  );
};

export default Petfinder;
