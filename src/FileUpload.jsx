import React, { useState, useEffect } from 'react'
import { storage, db } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {doc, setDoc, collection, getDocs} from 'firebase/firestore'
import './App.css'

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }
    
    useEffect(() => {
        loadAllImages();
    }, [])

    const loadAllImages = async() => {
        const querySnapshot = await getDocs(collection(db, 'images'));
        let currImages = []
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            currImages = [...currImages, doc.data().imageUrl]
        })
        setImages(currImages)
    }

    const handleUpload = () => {
        if (file == '') {
            alert('Please add the file !')
        }

        const storageRef = ref(storage, `images/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadProgress(progress)
        },
        (error) => {
            console.log(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                console.log('Download Url:', downloadUrl)
                const imageStoreRef = doc(db, 'images', file.name)
                setDoc(imageStoreRef, {
                    imageUrl: downloadUrl,

                })
            })
        }
        )
    }

  return (
    <div className='mainCont'>
        <input type='file' accept='/image/*' onChange={handleChange}></input>
            <button onClick={handleUpload}>
                Upload to Firebase
            </button>
        <div className='images-collection'>
        {
            images && images.map((imageUrl) => {
                return (
                    <div className="image-container">
                        <img src={imageUrl} />
                    </div>

                )
            })
        }
        </div>
    </div>

  )
}

export default FileUpload