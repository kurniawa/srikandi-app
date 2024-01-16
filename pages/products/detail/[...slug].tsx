import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/pages/components/Navbar';
import PageTitle from '@/pages/components/PageTitle';
import { retrieveDataById } from '@/lib/firebase/service';
import { SetStateAction, useEffect, useState } from 'react';
import UploadImage from '../add/components/UploadImage';

const ProductDetailPage = () => {
  const router = useRouter();
  //   console.log(router);
  // console.log(router.query.slug);
  const [Product, setProduct] = useState<any>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (router.query.slug) {
        const fetched_product = await retrieveDataById(router.query.slug[0], router.query.slug[1])
        setProduct(fetched_product);
      }
    }
    fetchProduct()
  },[setProduct, router.query.slug]);

  console.log(Product);
  return (
    <>
      <SessionProvider>
          <Navbar></Navbar>
      </SessionProvider>
      <main>
        <div className='p-2'>
          <PageTitle title='Detail Produk'></PageTitle>
        </div>
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
            <UploadImage collection_name={router.query.slug[0]} id={Product.id}></UploadImage>
            }
          </div>
        </>
        }
      </main>
    </>
  );
};

export default ProductDetailPage;
