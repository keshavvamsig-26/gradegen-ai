import { useState } from 'react';
import { storage } from '../lib/firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `gradegen_uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      () => setStatus('Uploading...'),
      (err) => setStatus('Error: ' + err.message),
      () => setStatus('Upload complete')
    );
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{status}</p>
    </div>
  );
}
