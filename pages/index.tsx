import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { retrieveAllDataInCollection } from '@/lib/firebase/service';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './cart';
import CartList from './components/CartList';

const inter = Inter({ subsets: ['latin'] });

interface productInterface {
  id: string
}

export default function Home() {

  const [products, setProducts] = useState<productInterface[]>();

  useEffect(() => {
    // const res = getAllProduct();
    async function fetchAllProduct() {
      const res = await retrieveAllDataInCollection('perhiasans');
      setProducts(res)
    }
    fetchAllProduct();
  }, [setProducts])
console.log(products)

  return (
    <>
      <SessionProvider>
        <Navbar></Navbar>
      </SessionProvider>
      <main className='p-2'>
        <div className="flex justify-between items-center">
          <CartList></CartList>
          <Link
            href={'/products/add'}
            className="btn btn-success btn-xs text-white"
          >
            + Product
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-2'>
        {products && products.map((product, index) => 
          <ProductCard product={product} product_photo={null} key={index}></ProductCard>
        )}
        </div>
      </main>
    </>
  );
}
