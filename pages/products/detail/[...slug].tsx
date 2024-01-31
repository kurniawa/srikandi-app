import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/pages/components/Navbar';
import { retrieveDataById } from '@/lib/firebase/service';
import { SetStateAction, useEffect, useState } from 'react';
import UploadImage from '../add/components/UploadImage';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/firebase.config';
import AlertError from '@/pages/components/AlertError';
import Image from "next/image";
import ImageSlider from '../add/components/ImageSlider';

const ProductDetailPage = () => {
  const [ErrorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  //   console.log(router);
  // console.log(router.query.slug);
  const [Product, setProduct] = useState<any>();
  const [ProductPhotoMain, setProductPhotoMain] = useState<any>();
  const [ProductPhotoSub, setProductPhotoSub] = useState<any>();
  const [JumlahPhoto, setJumlahPhoto] = useState(0);
  const [Pathname, setPathname] = useState('');
  const [Filename, setFilename] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (router.query.slug) {
        const fetched_product = await retrieveDataById(router.query.slug[0], router.query.slug[1])
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

        let q_main_sub;
        if (router.query.slug) {
          // const condition_main = []
          // condition_main.push(where("perhiasan_id", "==", router.query.slug[1]));
          // condition_main.push(where("status", "==", 'utama'));
          q_main_sub = query(collection(db, related_collection), where("perhiasan_id", "==", router.query.slug[1]));
        }
        const found_items:any = [];
        let found_main;
        const found_sub:any = [];
        if (q_main_sub) {
          const querySnapshot = await getDocs(q_main_sub);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                found_items.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
          }

          if (found_items.length >= 0) {
            found_items.forEach((item:any) => {
              if (item.status === 'main') {
                found_main = item;
              } else {
                found_sub.push(item);
              }
              jumlah_photo++;
            });
          }

          setProductPhotoMain(found_main);
          setProductPhotoSub(found_sub);
          setJumlahPhoto(jumlah_photo);
        }
      }
    }

    fetchProductPhotos();

  }, [Product, router, setProductPhotoMain, setProductPhotoSub]);
  console.log(ProductPhotoSub);

  const [ImageURL, setImageURL] = useState('');

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
        
        let status = 'sub';

        if (JumlahPhoto === 0) {
          status = 'main'  
        }

        await setDoc(doc(collection(db, related_collection)), {
          perhiasan_id: router.query.slug[1],
          photo_url: ImageURL,
          photo_pathname: Pathname,
          photo_filename: Filename,
          status: status,
        });
      }
    }

    if (ImageURL && Product && ImageURL !== '') {
      addImage();
    }

  }, [ImageURL, setImageURL, Product, router, JumlahPhoto, Pathname, Filename])

  // console.log(Product);
  console.log(Date.now());
  return (
    <>
      <SessionProvider>
          <Navbar></Navbar>
      </SessionProvider>
      <main>
        <ImageSlider></ImageSlider>
        {ProductPhotoMain &&
        <div>
          <Image src={ProductPhotoMain.photo_url} width={50} height={50} alt='' />
        </div>
        }
        {ProductPhotoSub &&
        <div className='flex'>
          {ProductPhotoSub.map((photo:any)=>
          <div key={photo.id} className='border-4 border-slate-100'>
            <Image src={photo.photo_url} width={100} height={100} alt='' />
          </div>
          )}
        </div>
        }
        {Product &&
        <>
          <div className='p-2'>
            <div>
              {Product.nama_long}
            </div>
            <div className="flex justify-between">
              <div>{Product.harga_gr}</div>
              <div>{Product.harga_t}</div>
            </div>
            {router.query.slug &&
            // <UploadImage collection_name={router.query.slug[0]} id={Product.id}></UploadImage>
            (JumlahPhoto >= 5) ?
            ''
            :
            <UploadImage setImageURL={setImageURL} JumlahPhoto={JumlahPhoto} setErrorMessage={setErrorMessage} setFilename={setFilename} setPathname={setPathname}></UploadImage>
            
            }
          </div>
        </>
        }
        {/* <Image src="/data/images/at_desy.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" width={500} height={500} alt="..." /> */}
        <AlertError ErrorMessage={ErrorMessage} setErrorMessage={setErrorMessage}></AlertError>
      </main>
    </>
  );
};

export default ProductDetailPage;
