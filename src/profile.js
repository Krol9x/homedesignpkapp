import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import UserProfileForm from './UserForm';
import UserProfileDisplay from './UserDisplay';
import './css/profile.css';


const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentProfilePictureURL, setCurrentProfilePictureURL] = useState(null);

  // Initialize Firebase
  const firebaseConfig = {
    // Twój konfiguracja Firebase
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const firestore = firebase.firestore();
    const usersCollectionRef = firestore.collection('users');

    const unsubscribe = usersCollectionRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const user = doc.data();
        setCurrentDescription(user.description);

        if (user.profilePicture) {
          const storage = firebase.storage();
          const storageRef = storage.ref();
          storageRef
            .child(user.profilePicture)
            .getDownloadURL()
            .then((url) => {
              setCurrentProfilePictureURL(url);
            })
            .catch((error) => {
              console.log('Error retrieving profile picture URL:', error);
            });
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handlePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    const storage = firebase.storage();
    const storageRef = storage.ref();
    const profilePictureRef = storageRef.child('profilePictures/profile.jpg');

    if (profilePicture) {
      try {
        await profilePictureRef.delete();
      } catch (error) {
        console.log('Error deleting old profile picture:', error);
      }

      try {
        const fileSnapshot = await profilePictureRef.put(profilePicture);
        const downloadUrl = await fileSnapshot.ref.getDownloadURL();
        setCurrentProfilePictureURL(downloadUrl); // Ustaw aktualny URL zdjęcia profilowego
      } catch (error) {
        console.log('Error uploading profile picture:', error);
      }
    }

    const firestore = firebase.firestore();
    const usersCollectionRef = firestore.collection('users');

    try {
      await usersCollectionRef.doc('user').set({
        description,
        profilePicture: profilePicture ? profilePictureRef.fullPath : null,
      });
      console.log('Profile data updated successfully');
    } catch (error) {
      console.log('Error updating profile data:', error);
    }

    setProfilePicture(null); // Wyczyść stan profilePicture
    setDescription('');
  };

  return (
    
    <div className='Profile'>
      
      <UserProfileForm
        handlePictureChange={handlePictureChange}
        handleDescriptionChange={handleDescriptionChange}
        handleProfileUpdate={handleProfileUpdate}
      />
      
      <div className='Profile2'>
      <UserProfileDisplay
        profilePictureURL={currentProfilePictureURL}
        description={currentDescription}
      />
      </div>
    </div>
  );
};

export default UserProfile;