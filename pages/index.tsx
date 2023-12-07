import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <SessionProvider>
      <main className="text-xs">
        <Navbar></Navbar>
        <h1>Hi Falentine</h1>
      </main>
    </SessionProvider>
  );
}
