import { db } from "@/firebase.config";
import { retrieveDataById } from "@/lib/firebase/service";
import Navbar from "@/pages/components/Navbar";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import UploadImage from "../add/components/UploadImage";
import { deleteObject, getStorage, ref } from "firebase/storage";

const EditProduct = () => {
  const router = useRouter();
  const [Product, setProduct] = useState<any>();
  const [EditItemPhotos, setEditItemPhotos] = useState<any>();
  const [DataUser, setDataUser] = useState<any>();
  const [JumlahPhoto, setJumlahPhoto] = useState(0);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [WarningMessage, setWarningMessage] = useState('');
  const [PhotoIndex, setPhotoIndex] = useState(99);

  useEffect(() => {
    const fetchProduct = async () => {
      if (router.query.slug) {
        const fetched_product = await retrieveDataById(router.query.slug[0], router.query.slug[1]);

        if (fetched_product) {
          fetched_product.id = router.query.slug[1];
        }

        // console.log(fetched_product);
        setProduct(fetched_product);
      }
    }

    fetchProduct()
  },[setProduct, router.query.slug]);

  useEffect(() => {
    let jumlah_photo = 0;
    const fetchProductPhotos = async () => {
      if (Product) {
        let related_collection = 'perhiasan_photos';

        if (Product.tipe_barang === 'LM') {
          related_collection = 'lm_photos';
        }

        let q_get_photos;
        if (router.query.slug) {
          // const condition_main = []
          // condition_main.push(where("perhiasan_id", "==", router.query.slug[1]));
          // condition_main.push(where("status", "==", 'utama'));
          // q_get_photos = query(collection(db, related_collection), where("perhiasan_id", "==", router.query.slug[1]), orderBy('urutan'));
          q_get_photos = query(collection(db, related_collection), where("perhiasan_id", "==", router.query.slug[1]));
        }
        const found_items:any = [];
        let ordered_items:any = [];

        if (q_get_photos) {
          const querySnapshot = await getDocs(q_get_photos);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc:any) => {
                // doc.data() is never undefined for query doc snapshots
                found_items.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
          }
          console.log(found_items);
          jumlah_photo = found_items.length;
          setJumlahPhoto(jumlah_photo);

          for (let i = 0; i < 5; i++) {
            let found = false;
            found_items.forEach((item:any) => {
              if (item.index === i+1) {
                found = true;
              }
            });
            if (!found) {
              found_items.push({index: i+1});
            }
          }

          ordered_items = found_items.sort((a:any, b:any) => a.index - b.index); // b - a for reverse sort

          setEditItemPhotos(ordered_items);
        }
    }
    }

    fetchProductPhotos();

  }, [Product, router, setEditItemPhotos]);
  // console.log(ProductPhotoSub);
  // console.log(EditItemPhotos);

  const handleDeletePhoto = async (e:BaseSyntheticEvent) => {
    e.preventDefault();
    let warnings_ = '';
    const confirm:boolean = window.confirm('Anda yakin ingin menghapus foto ini?');
    // console.log(confirm);
    // console.log(e.target.photo_index.value);

    let related_collection = 'perhiasan_photos';
    let document_column = 'perhiasan_id';
    if (Product.tipe_barang === 'LM') {
      related_collection = 'perhiasan_lms';
      document_column = 'lm_id';
    }
    // console.log(router.query.slug);
    const q = query(collection(db, related_collection), where(document_column, "==", Product.id), where('index', '==', parseInt(e.target.photo_index.value)));
    // const q = query(collection(db, related_collection), where(document_column, "==", Product.id), where('index', '==', 7));

    // console.log(q);
    // console.log(related_collection, document_column, e.target.photo_in)
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);

    querySnapshot.forEach(async (item) => {
      // cek apakah foto digunakan juga pada produk lain
      // console.log(item.data().photo_pathname);
      const q2 = query(collection(db, related_collection), where('photo_pathname', '==', item.data().photo_pathname));
      let found_items:any = [];
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(item => {
        found_items.push({id:item.id});
      });

      let exist_pada_item_lain = true;
      found_items.forEach((item:any) => {
        if (item.id != Product.id) {
          exist_pada_item_lain = false;
        }
      });

      // let delete_file = false;
      // if (querySnapshot2.docs.length === 0) {
      //   delete_file = true;
      // }

      deleteDoc(doc(db, related_collection, item.id));
      warnings_ += `-Document in ${related_collection} deleted.-`;

      if (!exist_pada_item_lain) {
        const storage = getStorage();

        // Create a reference to the file to delete
        const file_ref = ref(storage, item.data().photo_pathname);

        // Delete the file
        deleteObject(file_ref).then(() => {
          // File deleted successfully
          warnings_ += '-File in storage deleted-'
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });

      }
      setTimeout(() => {
        setWarningMessage(warnings_);
      }, 1000);
    });
  }

  return ( 
      <>
      <SessionProvider>
          <Navbar setDataUser={setDataUser}></Navbar>
      </SessionProvider>
      <div className="p-2">
          {EditItemPhotos &&
          <table>
              <tbody>
              {EditItemPhotos.map((photo:any, index:number)=>
              (photo.id) ?
              <tr key={index}>
                  <td>{photo.index}</td>
                  <td>
                    <div className='border-4 border-slate-100'>
                        <Image src={photo.photo_url} width={100} height={100} alt='' />
                    </div>
                  </td>
                  <td>
                    <div className="ml-2">
                      <form action="" method="POST" onSubmit={(e) => handleDeletePhoto(e)}>
                        <button type="submit" className="bg-pink-500 border-2 border-pink-300 rounded p-1 text-white" name="photo_index" value={photo.index}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </td>
              </tr>
              :
              <tr key={index}>
                  <td>{index+1}</td>
                  <td>
                      {/* <UploadImage setPhotoIndex={setPhotoIndex} photo_index={index+1} setImageURL={setImageURL} JumlahPhoto={JumlahPhoto} setErrorMessage={setErrorMessage} setFilename={setFilename} setPathname={setPathname}></UploadImage> */}
                      <UploadImage Product={Product} photo_index={index+1} JumlahPhoto={JumlahPhoto} setErrorMessage={setErrorMessage} setWarningMessage={setWarningMessage}></UploadImage>
                  </td>
              </tr>
              )}
              </tbody>
          </table>
          }
          <div role="alert" className="w-3/4  fixed bottom-9 text-white animate-pulse">
          {ErrorMessage && 
            <div className="flex justify-between bg-success p-3 rounded">
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{ErrorMessage}</span>
              </div>
              <button type='button' className='text-white' onClick={()=>setErrorMessage('')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          }
          {WarningMessage && 
            <div className="flex justify-between bg-warning p-3 rounded">
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{WarningMessage}</span>
              </div>
              <button type='button' className='text-white' onClick={()=>setWarningMessage('')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          }
          </div>
      </div>
      {/* <div className='h-36'></div> */}
      </>
  );
}
 
export default EditProduct;