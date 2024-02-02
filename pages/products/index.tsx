import { SessionProvider } from 'next-auth/react';
import UploadImage from './add/components/UploadImage';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const Products = () => {
  const [DataUser, setDataUser] = useState<any>()
  return (
    <>
      <SessionProvider>
          <Navbar setDataUser={setDataUser}></Navbar>
      </SessionProvider>
      <main className='p-2'>
        <h1>Products Page</h1>
        <form action="">
          {/* <UploadImage></UploadImage> */}
        </form>
      </main>
    </>
  );
};

export default Products;
