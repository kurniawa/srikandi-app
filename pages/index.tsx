import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="p-2">
        <div className="flex justify-end">
          <Link
            href={'products/add'}
            className="btn btn-success btn-xs text-white"
          >
            + Product
          </Link>
        </div>
      </div>
      <div className="mt-9 flex justify-center"></div>
    </>
  );
}
