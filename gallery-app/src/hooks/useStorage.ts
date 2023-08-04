import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from 'react';
import { db, storage } from "../firebase/config"
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth";

const useStorage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  // const [url, setUrl] = useState<string | null>(null);
  const { user } = useAuth();

  const startUpload = (file: File) => {
    if (!file) {
      return;
    }
    const fileId = uuidv4();
    const formatFile = file.type.split('/')[1];
    console.log(file);
    console.log(user?.email)

    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        // setUrl(downloadURL);
        setProgress(progress);
        // store data into firestore 
        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createdAt: new Date(),
          userEmail: user?.email
        });
      });
  }


  return {
    progress, error, startUpload
  }
};

export default useStorage;