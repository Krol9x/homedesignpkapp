import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { projectFirestore, projectStorage } from './firebase';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false); // added state variable
    const [uploadComplete, setUploadComplete] = useState(false); // added state variable

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
            setUploadComplete(false); // reset upload status
        } else {
            setFile(null);
            setError('Wybierz poprawny typ pliku (png/jpg)');
        }
    }
    const uploadFile = async (file) => {
        if (uploading || uploadComplete) return;
        setUploading(true);
      
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');
      
        try {
          const snapshot = await storageRef.put(file);
          const url = await snapshot.ref.getDownloadURL();
          const createdAt = new Date();
          const docRef = await collectionRef.add({ url, createdAt });
          console.log('Dodano dokument o ID:', docRef.id); // dodaj ten console.log
          setFile(null);
          setUploadComplete(true);
        } catch (err) {
          setError(err);
        } finally {
          setUploading(false);
        }
      }

    return (
        <div className='addimage'>
            <form>
                <label htmlFor="file-input" className="upload-button"></label>
                <input type="file" id="file-input" onChange={changeHandler}/>
                <div className="output">
                    { error && <div className="error"> {error}</div> }
                    { file && <div>{ file.name }</div> }
                   
                    { file && <ProgressBar file={file} uploadFile={uploadFile} setFile={setFile} /> }
                    { uploadComplete && <div className="success">Plik został pomyślnie przesłany!</div> }
                </div>
            </form>
        </div>
    );
}

export default UploadForm;
