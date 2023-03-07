import React, { useState, useEffect } from 'react';
import SignupForm from './SignupForm';
import DogSwiper from '../container/MainContainer';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = useNavigate();

  const fetchSignIn = async (userEmail, userPassword) => {
    try {
      const result = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, password: userPassword })
      });
      console.log('RESPONSE IN FETCH', result);
      const data = await result.json();
      setIsSignedIn(data);
      console.log('sign in data: ', data);
    } catch (error) {
      console.log('Error in SignInForm', error);
    }
  };

  const onInput = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('USER EMAIL: ', userEmail);
    console.log('USER PASSWORD: ', userPassword);
    e.preventDefault();
    fetchSignIn(userEmail, userPassword);
    // we need to actually check before setting state here
    if (isSignedIn) {
      navigate('/swiper');
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="signinForm">
      <form onSubmit={handleSubmit}>
        <h1>Sign-in?</h1>
        <div>
          <label htmlFor="name">Email</label>
          <input onInput={(e) => onInput(e, setUserEmail)} type="text" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input onInput={(e) => onInput(e, setUserPassword)} type="text" name="email" required />
        </div>
        <button type="submit">Sign-in</button>
        <a onClick={handleSignUpClick}>Sign-up</a>
      </form>
    </div>
  );
};

export default SignInForm;
