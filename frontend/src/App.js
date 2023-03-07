import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Petfinder from './pages/Petfinder';
import DogSwiper from './container/MainContainer';
import SignInForm from './component/SigninForm';
import SignupForm from './component/SignupForm';
import PreferenceForm from './component/PreferenceForm';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignupForm userData={userData} setUserData={setUserData} />} />
        <Route path="/preferences" element={<PreferenceForm userData={userData} setUserData={setUserData} />} />
        <Route path="/swiper" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
