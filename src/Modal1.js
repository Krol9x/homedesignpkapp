import React from 'react';
import { motion } from 'framer-motion';

const Modal1 = ({ selectedImg, setSelectedImg, handleDelete, selectedDocId, handlePrev, handleNext }) => {
  const handleHide = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const handleClose = () => {
    setSelectedImg(null);
  };

  const handleDeleteClick = () => {
    handleDelete(selectedDocId, selectedImg);
  };

  

  return (
    <motion.div
      className="backdrop"
      onClick={handleHide}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: '-120vh' }}
        animate={{ y: 0 }}
      />
      
        <button className="prev-btn" onClick={handlePrev}>
          {'⇋'}
        </button>
        <button className="delete-btn" onClick={handleDeleteClick}>
          Usuń
        </button>
        <button className="next-btn" onClick={handleNext}>
          {'⇌'}
        </button>
        <button className="close-btn" onClick={handleClose}>
          Zamknij
        </button>
      
    </motion.div>
  );
};

export default Modal1;