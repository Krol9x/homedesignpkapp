import React, { useState } from 'react';

const UserProfileForm = ({ handlePictureChange, handleDescriptionChange, handleProfileUpdate }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState('');

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    handlePictureChange(file);
  };

  const handleDescriptionUpdate = (event) => {
    const value = event.target.value;
    setDescription(value);
    handleDescriptionChange(value);
  };

  return (
    <form onSubmit={handleProfileUpdate}>
      <div>
        <label htmlFor="profilePicture">Zdjęcie profilowe</label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handlePictureUpload}
        />
        {profilePicture && (
          <img src={URL.createObjectURL(profilePicture)} alt="Profile" style={{ width: '200px' }} />
        )}
      </div>
      <div>
        
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionUpdate}
        />
      </div>
      <button type="submit">Zapisz</button>
    </form>
  );
};

export default UserProfileForm;
