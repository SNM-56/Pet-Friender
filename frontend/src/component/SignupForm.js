import React from 'react';

function SignupForm() {
  // Set up user info
  return (
    <div className="signupForm">
      <h1>Sign-up</h1>
      <div>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="text" name="name" required />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="text" name="email" required />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="psw">Password</label>
        </div>
        <div>
          <input type="text" name="password" />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="location">Location</label>
        </div>
        <div>
          <input type="text" name="location" />
        </div>
      </div>
      <button type="submit">Next</button>
    </div>
  );
}

export default SignupForm;
