import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { retrieveAllDataInCollection } from '@/lib/firebase/service';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface productInterface {
  id: string
}

export default function Home() {

  const [products, setProducts] = useState<productInterface[]>();

  const getAllProduct = async () => {
    const res = await retrieveAllDataInCollection('products');
    return res;
  }

  useEffect(() => {
    // const res = getAllProduct();
    async function fetchAllProduct() {
      const res = await retrieveAllDataInCollection('products');
      return res
    }
    setProducts(fetchAllProduct());
  }, [setProducts])

  return (
    <>
      <SessionProvider>
        <Navbar></Navbar>
      </SessionProvider>
      <main className='p-2'>
        <div className="flex justify-end">
          <Link
            href={'products/add'}
            className="btn btn-success btn-xs text-white"
          >
            + Product
          </Link>
        </div>
        <div>
        {products && products.map((product, index) => {
            return product.id
        })}
        </div>
      </main>
    </>
  );
}
