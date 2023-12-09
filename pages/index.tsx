import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
      </main>
    </>
  );
}
