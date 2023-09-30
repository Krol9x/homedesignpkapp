import { useState, useEffect } from 'react';
import { projectFirestore, projectStorage, timestamp } from './firebase.js'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let canceled = false;

    const checkIfFileExists = async () => {
      try {
        const storageRef = projectStorage.ref(file.name);
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      } catch (err) {
        console.log('File does not exist, uploading...');
        uploadFile();
      }
    };

    const uploadFile = () => {
      // references
      const storageRef = projectStorage.ref(file.name);
      const collectionRef = projectFirestore.collection('images');
      
      storageRef.put(file).on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
      }, async () => {
        if (!canceled) {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          await collectionRef.add({ url, createdAt });
          setUrl(url);
        }
      });
    };

    checkIfFileExists();

    return () => {
      canceled = true;
    };
  }, [file]);

  return { progress, url, error };
};

export default useStorage;