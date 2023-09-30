import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './css/home1.css';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid1';
import Modal from './Modal1';
import UserProfile from './profile';
import SummaryForm from './SummaryForm2';
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  document.body.style.overflow = 'hidden';

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login")
      }
    });
  }, [navigate])

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {

    });
  }

  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <div className="Home">
      <button onClick={handleLogout} className='logoutButton'>
        Logout
      </button>
      <div className="title">
        <h2>Zarządzaj Portfolio:</h2>
      </div>
      <UploadForm />
      
      <ImageGrid selectedImg={selectedImg} setSelectedImg={setSelectedImg} user={user} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
   
      <UserProfile />
      
      <SummaryForm />
      <div className="title">
      <h2>Oferta w budowie...</h2>
      </div>
      <div className="title">
      <h2>Baner w budowie...</h2>
      </div>
    </div>
  )
}

export default Home;