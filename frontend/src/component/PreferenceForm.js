import React from 'react';

function PreferenceForm({ userData, setUserData, preferenceClicked, setPreferenceClicked }) {
  const onHandleClick = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userPreferences = {
      ...userData,
      preferences: {
        type: formData.get('species'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        size: formData.get('size')
      }
    };
    setUserData(userPreferences);
    setPreferenceClicked(true);
  };

  console.log(userData);

  return (
    <div className="preferenceForm">
      <h1>Preferences</h1>
      <form onSubmit={onHandleClick}>
        <div>
          <label htmlFor="species">Preferred Species</label>
          <select name="species" id="species" defaultValue="-">
            <option disabled>-</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Either">No Preference</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">Preferred Age</label>
          <select name="age" id="age" defaultValue="-">
            <option disabled>-</option>
            <option value="Young">Young</option>
            <option value="Old">Old</option>
            <option value="Either">No Preference</option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">Preferred Gender</label>
          <select name="gender" id="gender" defaultValue="-">
            <option disabled>-</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Either">No Preference</option>
          </select>
        </div>
        <div>
          <label htmlFor="size">Preferred Size</label>
          <select name="size" id="size" defaultValue="-">
            <option disabled>-</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Either">No Preference</option>
          </select>
        </div>
        <button className="submitButton" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}

export default PreferenceForm;
