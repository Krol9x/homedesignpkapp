import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg, handleDelete, selectedDocId, handlePrev, handleNext }) => {
  const [animationDirection, setAnimationDirection] = useState(0);
  const [isFirstImage, setIsFirstImage] = useState(true);

  const handleHide = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const handleClose = () => {
    setSelectedImg(null);
  };

  const handleDeleteClick = () => {
    handleDelete(selectedDocId);
  };

  const handlePrevClick = () => {
    setAnimationDirection(1);
    setIsFirstImage(false);
    handlePrev();
  };

  const handleNextClick = () => {
    setAnimationDirection(-1);
    setIsFirstImage(false);
    handleNext();
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleHide}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {selectedImg && (
        <motion.img
          key={selectedImg} // Uniquely identify the image for animation
          src={selectedImg}
          alt="enlarged pic"
          initial={{ 
            x: isFirstImage ? 0 : (animationDirection === 1 ? '-100%' : '100%'), 
            y: isFirstImage ? '-100%' : 0
          }}
          animate={{ x: 0, y: 0 }}
          exit={{ 
            x: isFirstImage ? 0 : (animationDirection === 1 ? '100%' : '-100%'),
            y: isFirstImage ? '-100%' : 0
          }}
          transition={{ type: 'tween' }}
        />
      )}
      <motion.button
        className="next-btn"
        onClick={handleNextClick}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'tween' }}
      >
        {'⇌'}
      </motion.button>
      <motion.button
        className="prev-btn"
        onClick={handlePrevClick}
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '-100%' }}
        transition={{ type: 'tween' }}
      >
        {'⇋'}
      </motion.button>
      <button className="close-btn" onClick={handleClose}>
        Zamknij
      </button>
    </motion.div>
  );
};

export default Modal;