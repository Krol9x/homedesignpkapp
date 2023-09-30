import React, { useState } from 'react';
import useFirestore, { deleteFromFirebase } from './useFirestore';
import { motion } from 'framer-motion';
import Modal from './Modal';

const ImageGrid = () => {
  const { docs, deleteDoc } = useFirestore('images');

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [numImages, setNumImages] = useState(6); // added state variable for number of images to display

  const handleDelete = (id) => {
    deleteFromFirebase(id)
      .then(() => {
        setSelectedImg(null);
      })
      .catch((error) => {
        console.log('Error deleting document: ', error);
      });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevImage = docs[currentIndex - 1];
      setSelectedImg(prevImage.url);
      setSelectedDocId(prevImage.id);
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      const lastImage = docs[docs.length - 1];
      setSelectedImg(lastImage.url);
      setSelectedDocId(lastImage.id);
      setCurrentIndex(docs.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < docs.length - 1) {
      const nextImage = docs[currentIndex + 1];
      setSelectedImg(nextImage.url);
      setSelectedDocId(nextImage.id);
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === docs.length - 1) {
      const firstImage = docs[0];
      setSelectedImg(firstImage.url);
      setSelectedDocId(firstImage.id);
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <div className="img-grid">
        {docs.slice(0, numImages).map((doc, index) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setSelectedImg(doc.url);
              setSelectedDocId(doc.id);
              setCurrentIndex(index);
            }}
          >
            <div className="img-container">
              <motion.img
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div class="load-more-container" >
        {docs.length > numImages && (
          <button className="load-more" onClick={() => setNumImages(numImages + 6)}>Pokaż więcej</button>
        )}
      </div>
      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          selectedDocId={selectedDocId}
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentIndex={currentIndex}
          totalImages={docs.length}
        />
      )}
    </>
  );
};

export default ImageGrid;
