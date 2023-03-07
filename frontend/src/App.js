import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Petfinder from './pages/Petfinder';
<<<<<<< HEAD
import MainContainer from './container/MainContainer';
import Home from './pages/Home';
=======
import DogSwiper from './container/MainContainer';
import SignInForm from './component/SigninForm';
import SignupForm from './component/SignupForm';
import PreferenceForm from './component/PreferenceForm';
>>>>>>> chris/auth

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="App">
<<<<<<< HEAD
      <Home />
=======
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignupForm userData={userData} setUserData={setUserData} />} />
        <Route path="/preferences" element={<PreferenceForm userData={userData} setUserData={setUserData} />} />
        <Route path="/swiper" element={<DogSwiper />} />
      </Routes>
>>>>>>> chris/auth
    </div>
  );
}

export default App;
