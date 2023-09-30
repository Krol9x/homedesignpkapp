import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './css/info.css';
const UserProfileDisplay = () => {
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const firestore = firebase.firestore();
    const usersCollectionRef = firestore.collection('users').doc('user');

    const unsubscribe = usersCollectionRef.onSnapshot((doc) => {
      const userData = doc.data();
      setDescription(userData.description);

      if (userData.profilePicture) {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        storageRef
          .child(userData.profilePicture)
          .getDownloadURL()
          .then((url) => {
            setProfilePictureURL(url);
          })
          .catch((error) => {
            console.log('Error retrieving profile picture URL:', error);
          });
      } else {
        setProfilePictureURL(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
    <div className='LeftInfo'>
      {profilePictureURL ? (
        <img key={Date.now()} src={profilePictureURL} alt="Profile"/>
      ) : (
        <p></p>
      )}
    </div>
    <div className='RightInfo'>
    
      <p>{description}</p>
    </div>
    </div>
  );
};

export default UserProfileDisplay;
