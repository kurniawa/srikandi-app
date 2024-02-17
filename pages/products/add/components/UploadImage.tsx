import {Dispatch, SetStateAction, useEffect, useState} from 'react'            
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { db, storage } from '@/firebase.config';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

interface UploadImageProps {
    Product: any,
    photo_index: number,
    JumlahPhoto: number,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setWarningMessage: Dispatch<SetStateAction<string>>,
}

// const UploadImage = ({collection_name, id}:UploadImageProps) => {
const UploadImage = ({Product, photo_index, JumlahPhoto, setErrorMessage, setWarningMessage}:UploadImageProps) => {
    const [imageFile, setImageFile] = useState<File>();
    // const [downloadURL, setDownloadURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progressUpload, setProgressUpload] = useState<string | number>(0);

    // const [RelatedCollection, setRelatedCollection] = useState('');

    // useEffect(() => {
    //     if (collection_name === 'perhiasans') {
    //         setRelatedCollection('perhiasan_photos');
    //     }
    // }, [setRelatedCollection, collection_name]);

    const handleSelectFile = (files:FileList|null) => {
        console.log(files);
        if (files && files[0].size <= 2000000) {
            setImageFile(files[0])
            console.log(files[0]);
        } else {
            throw new Error("File is too large!");
        }
    }

    let generated_filename = '';
    let file_pathname = '';
    let image_url = '';

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (JumlahPhoto >= 5) {
            setErrorMessage('Barang ini sudah memiliki 5 atau lebih foto!');
        } else {
            if (imageFile) {
                generated_filename = Date.now().toString() + '.' + imageFile.name.split('.').pop();
                file_pathname = `images/perhiasan/${generated_filename}`;

                // const storageRef = ref(storage, `images/perhiasan/${imageFile.name}`);
                const storageRef = ref(storage, file_pathname);
    
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
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        image_url = url;
                        // setDownloadURL(url)
                        
                        addImage();
                        // setTimeout(() => {
                        //     addImage();
                        // }, 2000);
                    });
                }
                );
            } else {
                console.log('File not found!');
            }
        }

        setIsLoading(false);
    }

    const handleRemoveImage = () => {
        setImageFile(undefined);
    }

    const addImage = async () => {
        // console.log('slug:', ImageURL);
        let related_collection = 'perhiasan_photos';
        let document_column = 'perhiasan_id';
        if (Product.tipe_barang === 'LM') {
            related_collection = 'perhiasan_lms';
            document_column = 'lm_id';
        }
        // console.log(router.query.slug);
        const q = query(collection(db, related_collection), where(document_column, "==", Product.id));

        if (Product.tipe_barang === 'perhiasan') {
            await setDoc(doc(collection(db, related_collection)), {
                perhiasan_id: Product.id,
                photo_url: image_url,
                photo_pathname: file_pathname,
                photo_filename: generated_filename,
                index: photo_index,
            });
        } else if (Product.tipe_barang === 'lm') {
            await setDoc(doc(collection(db, related_collection)), {
                lm_id: Product.id,
                photo_url: image_url,
                photo_pathname: file_pathname,
                photo_filename: generated_filename,
                index: photo_index,
            });
        }
  
    }
    return ( 
        <div>
            <input type="file" name="image" id="input-image" className='hidden' onChange={files => handleSelectFile(files.target.files)} />
            <div className='bg-sky-200 rounded'>
                <label htmlFor="input-image" className='text-white flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-20 h-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                </label>
            </div>
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
            {imageFile &&
            <div className='mt-5'>
                <button className='btn btn-success text-white' onClick={e => handleUpload(e)} disabled={isLoading}>
                    Upload
                    {isLoading && <span className='loading loading-spinner'></span>}
                </button>
                <div className='mt-2'>
                    <progress className="progress w-56" value={progressUpload} max="100"></progress>
                </div>
            </div>
            }
            {/* <div className="mt-5">
                {
                downloadURL && 
                <div className='mt-2'>
                    <p>{downloadURL}</p>
                    <div className='mt-2'>
                        <Image src={downloadURL} width={500} height={500} alt={downloadURL} className='w-28' />
                    </div>
                </div>
                }
            </div> */}
        </div>
    );
}
 
export default UploadImage;