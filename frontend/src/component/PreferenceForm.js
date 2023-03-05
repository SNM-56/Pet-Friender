import React from 'react';

function PreferenceForm({ setUserData }) {
  return (
    <div className="preferenceForm">
      <h1>Preferences</h1>
      <div>
        <select name="species" id="species">
          <option value="species">Preferred Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
      </div>
      <div>
        <select name="age" id="age">
          <option value="age">Preferred Age</option>
          <option value="Young">Young</option>
          <option value="Old">Old</option>
        </select>
      </div>
      <div>
        <select name="gender" id="gender">
          <option value="gender">Preferred Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <select name="size" id="size">
          <option value="size">Preferred Size</option>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="medium">Small</option>
        </select>
      </div>
      <button className="submitButton" type="submit">
        Next
      </button>
    </div>
  );
}

export default PreferenceForm;
