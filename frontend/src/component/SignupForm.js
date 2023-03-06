import React, { useState } from 'react';

function SignupForm({ setUserData, userData, setSignUpClicked }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const onInput = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      name,
      email,
      password,
      location,
      preference: {
        type: '',
        age: '',
        gender: '',
        size: ''
      }
    };
    setUserData(newUserData);
    setSignUpClicked(true);
  };

  // Set up user info
  return (
    <div>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h1>Sign-up</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input onInput={(e) => onInput(e, setName)} type="text" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input onInput={(e) => onInput(e, setEmail)} type="text" name="email" required />
        </div>
        <div>
          <label htmlFor="psw">Password</label>
          <input onInput={(e) => onInput(e, setPassword)} type="password" name="password" />
        </div>
        <div>
          <label htmlFor="zipcode">Zip Code</label>
          <input onInput={(e) => onInput(e, setLocation)} type="text" name="location" />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupForm;
