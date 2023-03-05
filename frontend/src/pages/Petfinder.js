import React, { useEffect, useState } from 'react';

// components to be passed down
import MainContainer from '../container/MainContainer';
import SignupForm from '../component/SignupForm';
import PreferenceForm from '../component/PreferenceForm';

const Petfinder = () => {
  // will have 3 things name&description, image , buttons

  const [userData, setUserData] = useState({});
  const [signUpClicked, setSignUpClicked] = useState(false);

  // Determine the table to display between search result and my recipe
  let tableToDisplay;
  if (!signUpClicked) {
    tableToDisplay = <SignupForm userData={userData} setUserData={setUserData} setSignUpClicked={setSignUpClicked} />;
  } else {
    tableToDisplay = <PreferenceForm userData={userData} setUserData={setUserData} />;
  }

  return (
    <div className="petfinder">
      <div className="pets">{tableToDisplay}</div>
      {/* <PreferenceForm setUserData={setUserData} userData={userData} /> */}
    </div>
  );
};

export default Petfinder;
