import { db } from "@/firebase.config";
import { retrieveDataById } from "@/lib/firebase/service";
import Navbar from "@/pages/components/Navbar";
import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UploadImage from "../add/components/UploadImage";

const EditProduct = () => {
  const router = useRouter();
  const [Product, setProduct] = useState<any>();
  const [EditItemPhotos, setEditItemPhotos] = useState<any>();
  const [DataUser, setDataUser] = useState<any>();
  const [Pathname, setPathname] = useState('');
  const [Filename, setFilename] = useState('');
  const [ImageURL, setImageURL] = useState('');
  const [JumlahPhoto, setJumlahPhoto] = useState(0);
  const [ErrorMessage, setErrorMessage] = useState('');
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
          q_get_photos = query(collection(db, related_collection), where("perhiasan_id", "==", router.query.slug[1]), orderBy('index'));
        }
        const found_items:any = [];
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
          jumlah_photo = found_items.length;
          setJumlahPhoto(jumlah_photo);

          for (let i = 0; i < 5; i++) {
            if (found_items[i]) {
              if (found_items[i].index !== i+1) {
                found_items[i].index = i+1;
              } 
            } else {
              found_items[i] = {
                index: i+1
              };
            }
          }

          setEditItemPhotos(found_items);
        }
    }
    }

    fetchProductPhotos();

  }, [Product, router, setEditItemPhotos]);
  // console.log(ProductPhotoSub);
  console.log(EditItemPhotos);

  useEffect(() => {
    const addImage = async () => {
      // console.log('slug:', ImageURL);
      let related_collection = 'perhiasan_photos';
      if (Product.tipe_barang === 'LM') {
        related_collection = 'perhiasan_lms'
      }
      // console.log(router.query.slug);
      let q;
      if (router.query.slug) {
        q = query(collection(db, related_collection), where("perhiasan_id", "==", router.query.slug[1]));
      }

      // console.log(found_items);
      if (router.query.slug) {
        
        await setDoc(doc(collection(db, related_collection)), {
          perhiasan_id: router.query.slug[1],
          photo_url: ImageURL,
          photo_pathname: Pathname,
          photo_filename: Filename,
          index: PhotoIndex,
        });
      }
    }

    if (ImageURL && Product && ImageURL !== '') {
      addImage();
    }

  }, [ImageURL, setImageURL, Product, router, JumlahPhoto, Pathname, Filename, PhotoIndex])

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
                </tr>
                :
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <UploadImage setPhotoIndex={setPhotoIndex} photo_index={index+1} setImageURL={setImageURL} JumlahPhoto={JumlahPhoto} setErrorMessage={setErrorMessage} setFilename={setFilename} setPathname={setPathname}></UploadImage>
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            }
        </div>
        </>
    );
}
 
export default EditProduct;