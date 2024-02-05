import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/pages/components/Navbar';
import { retrieveDataById } from '@/lib/firebase/service';
import { SetStateAction, useEffect, useState } from 'react';
import UploadImage from '../add/components/UploadImage';
import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/firebase.config';
import AlertError from '@/pages/components/AlertError';
import Image from "next/image";
import ImageSlider from '../add/components/ImageSlider';
import {formatPriceNormal} from '@/lib/format';
import { table } from 'console';
import Link from 'next/link';

const ProductDetailPage = () => {
  const [ErrorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  //   console.log(router);
  // console.log(router.query.slug);
  const [Product, setProduct] = useState<any>();
  // const [ProductPhotoMain, setProductPhotoMain] = useState<any>();
  // const [ProductPhotoSub, setProductPhotoSub] = useState<any>();
  const [ShowSlider, setShowSlider] = useState(false);
  const [ItemPhotos, setItemPhotos] = useState<any>();
  const [EditItemPhotos, setEditItemPhotos] = useState<any>();

  const [DataUser, setDataUser] = useState<any>();

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
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                found_items.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
          }

          // if (found_items.length >= 0) {
          //   found_items.forEach((item:any) => {
          //     if (item.status === 'main') {
          //       found_main = item;
          //     } else {
          //       found_sub.push(item);
          //     }
          //     jumlah_photo++;
          //   });
          // }

          // setProductPhotoMain(found_main);
          // setProductPhotoSub(found_sub);

          // let image_gabungan:any = [];
          // if (found_main) {
          //   image_gabungan.push(found_main);
          //   if (found_sub.length !== 0) {
          //     image_gabungan = image_gabungan.concat(found_sub)
          //   }
          // } else if(found_sub.length !== 0) {
          //   image_gabungan = found_sub;
          // }

          setItemPhotos(found_items);
          if (found_items.length !== 0) {
            setShowSlider(true);
          }

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

  }, [Product, router, setItemPhotos, setShowSlider, setEditItemPhotos]);
  // console.log(ProductPhotoSub);
  console.log(EditItemPhotos);


  

  // console.log(Product);
  // console.log(Date.now());
  // console.log(DataUser);
  // const [ShowDetail, setShowDetail] = useState('block');
  // const [ShowEdit, setShowEdit] = useState('hidden');

  // const handleShowEdit = () => {
  //   setShowEdit('block');
  //   setShowDetail('hidden');
  // }

  // const handleCancelEdit = () => {
  //   // console.log('cancel edit');
  //   setShowEdit('hidden');
  //   setShowDetail('block');
  // }
  return (
    <>
      <SessionProvider>
          <Navbar setDataUser={setDataUser}></Navbar>
      </SessionProvider>
      <main>
        {/* <div className={ShowDetail}> */}
        <div>
          {ShowSlider &&
          <ImageSlider ItemPhotos={ItemPhotos}></ImageSlider>
          }
          {Product &&
          <>
            <div className='p-2'>
              <div className='font-semibold text-xl'>
                {Product.nama_long}
              </div>
              <div className="flex justify-between">
                <div>H: {formatPriceNormal(Product.harga_gr)}/gr</div>
                <div className='font-semibold'>T: {formatPriceNormal(Product.harga_t)}</div>
              </div>
              <h3 className='text-lg font-semibold mt-2'>Spesifikasi</h3>
              <table className='w-full'>
                <tbody>
                  <tr>
                    <td className='border border-primary'>nama</td><td className='border border-primary'>{Product.nama_short}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>warna</td><td className='border border-primary'>{Product.warna_emas}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>berat</td><td className='border border-primary'>{Product.berat} gr</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>kadar</td><td className='border border-primary'>{Product.kadar}%</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>cap</td><td className='border border-primary'>{Product.cap}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>ukuran</td><td className='border border-primary'>{(Product.ukuran) ? Product.ukuran : '---'}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>usia</td><td className='border border-primary'>{Product.range_usia}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>kondisi</td><td className='border border-primary'>{Product.kondisi}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>mata</td><td className='border border-primary'>
                      {(Product.data_mata) ?
                      <table className='w-full'>
                        <tbody>
                          {Product.data_mata.map((mata:any, index:number) => 
                          <tr key={index}>
                            <td className='border border-primary'>{mata.warna_mata}</td>
                            <td className='border border-primary'>{mata.jumlah}</td>
                          </tr>
                          )}
                        </tbody>
                      </table>
                      :
                      '---'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>mainan</td><td className='border border-primary'>
                      {(Product.data_mainan) ?
                      <table className='w-full'>
                        <tbody>
                        {Product.data_mainan.map((mainan:any, index:number) => 
                          <tr key={index}>
                            <td className='border border-primary'>{mainan.warna_mainan}</td>
                            <td className='border border-primary'>{mainan.jumlah}</td>
                          </tr>
                        )}
                        </tbody>
                      </table>
                      :
                      '---'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>plat</td><td className='border border-primary'>{(Product.plat) ? Product.plat : '---'}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>keterangan</td><td className='border border-primary'>{(Product.keterangan) ? Product.keterangan : '---'}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>deskripsi</td><td className='border border-primary'>{(Product.deskripsi) ? Product.deskripsi : '---'}</td>
                  </tr>
                  <tr>
                    <td className='border border-primary'>stock</td><td className='border border-primary'>{Product.stock}</td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </>
          }
        </div>
        {/* <Image src="/data/images/at_desy.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" width={500} height={500} alt="..." /> */}
        <AlertError ErrorMessage={ErrorMessage} setErrorMessage={setErrorMessage}></AlertError>
        {DataUser &&
        (DataUser.role === 'admin') ?
        // <div className={ShowDetail}>
        <div>
          <div className="flex justify-center">
            <button type='button' className='btn btn-success text-white'>+ Keranjang</button>
          </div>
          {router && router.query && router.query.slug &&
          <div className="flex justify-center mt-2">
            {/* <Link href={`/products/detail/perhiasans/${product.id}`} className='btn btn-disabled'>Edit</Link> */}
            <Link href={`/products/edit/${router.query.slug[0]}/${router.query.slug[1]}`} className='border-2 border-slate-300 rounded-3xl py-2 px-3 text-slate-400 font-semibold'>
              <div className="flex justify-center gap-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </span>
                <span>Edit</span>
              </div>
            </Link>
          </div>
          }
        </div>
        :
        ''
        }
        {/* <div className={`mt-2 ${ShowEdit}`}>
          <div className="flex justify-center">
            <button type='button' className='py-2 px-3 rounded-3xl border-slate-300 border-2 text-slate-400 font-semibold' onClick={handleCancelEdit}>X Cancel Edit</button>
          </div>
        </div> */}
        <div className='h-36'></div>
      </main>
    </>
  );
};

export default ProductDetailPage;
