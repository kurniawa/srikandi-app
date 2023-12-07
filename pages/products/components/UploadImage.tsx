'use client'
import {useState} from 'react'            
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { app } from '@/firebase.config';

const UploadImage = () => {
    const [imageFile, setImageFile] = useState<File>();
    const [downloadURL, setDownloadURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progressUpload, setProgressUpload] = useState<string | number>(0);

    const handleSelectFile = (files:FileList|null) => {
        console.log(files);
        if (files && files[0].size <= 2000000) {
            setImageFile(files[0])
            console.log(files[0]);
        } else {
            throw new Error("File is too large!");
            
        }
    }

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (imageFile) {
            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${imageFile.name}`);

            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgressUpload(progress);
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log('File available at', url);
                setDownloadURL(url)
                });
            }
            );
        } else {
            console.log('File not found!');
        }
        setIsLoading(false);
    }

    const handleRemoveImage = () => {
        setImageFile(undefined);
    }
    return ( 
        <div>
            <input type="file" name="image" id="image" onChange={files => handleSelectFile(files.target.files)} />
            <div>
                {imageFile && 
                <div className='p-2 border rounded flex gap-3'>
                    <span>{imageFile.name}</span>--<span>{Math.round((imageFile.size / 1024) * 100) / 100} KB</span>
                    <span className='text-red-500 hover:cursor-pointer' onClick={handleRemoveImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                }
            </div>
            {/* Preview Image */}
            <div>
                {
                imageFile &&
                <div>
                    <Image src={URL.createObjectURL(imageFile)} alt={imageFile.name} width={500} height={500} className='w-96' />
                </div> 
                }
            </div>
            {/* End - Preview Image */}
            <div className='mt-5'>
                <button className='btn btn-success text-white' onClick={e => handleUpload(e)} disabled={isLoading}>
                    Upload
                    {isLoading && <span className='loading loading-spinner'></span>}
                </button>
                <div className='mt-2'>
                    <progress className="progress w-56" value={progressUpload} max="100"></progress>
                </div>
            </div>
            <div className="mt-5">
                {
                downloadURL && 
                <div className='mt-2'>
                    <p>{downloadURL}</p>
                    <div className='mt-2'>
                        <Image src={downloadURL} width={500} height={500} alt={downloadURL} className='w-28' />
                    </div>
                </div>
                }
            </div>
        </div>
    );
}
 
export default UploadImage;