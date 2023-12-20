import { SessionProvider } from 'next-auth/react';
import UploadImage from './add/components/UploadImage';
import Navbar from '../components/Navbar';

const Products = () => {
  return (
    <>
      <SessionProvider>
          <Navbar></Navbar>
      </SessionProvider>
      <main className='p-2'>
        <h1>Products Page</h1>
        <form action="">
          <UploadImage></UploadImage>
        </form>
      </main>
    </>
  );
};

export default Products;
