import { BaseSyntheticEvent, useState } from 'react';
import Mata from './components/Mata';
import Mainan from './components/Mainan';
import WarnaEmas from './components/WarnaEmas';
import Kondisi from './components/Kondisi';
import Cap from './components/Cap';
import TipeBarang from './components/TipeBarang';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/pages/components/Navbar';
import TipePerhiasan from './components/TipePerhiasan';
import Kadar from './components/Kadar';
import Berat from './components/Berat';
import Nama from './components/Nama';
import KadarBeratHarga from './components/KadarBeratHarga';
import HargaT from './components/HargaT';
import Deskripsi from './components/Deskripsi';
import { addProduct } from '../../../lib/addProduct';

const AddProductPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = addProduct(e);
    if (res.status === 400) {
      setErrorMessage(res.message);
    }
  }

  const [showMata, setShowMata] = useState(false);


  const toggleMata = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowMata(true);
      
    } else {
      setShowMata(false);
    }
    // console.log(el.target);
  };

  const [showMainan, setShowMainan] = useState(false);
  const toggleMainan = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowMainan(true);
      el.target.value = 'mata';
    } else {
      setShowMainan(false);
      el.target.value = '';
    }
    // console.log(el.target);
  };

  return (
    <>
      <SessionProvider>
        <Navbar></Navbar>
      </SessionProvider>
      <main className="p-2 mb-52">
        <div>
          <form action="" method="POST" onSubmit={(e) => handleAddProduct(e)}>
          <div className="grid grid-cols-2 gap-2">
              <TipeBarang tipe_barang='perhiasan'></TipeBarang>
              <TipePerhiasan></TipePerhiasan>
            </div>
            <Nama></Nama>
            <KadarBeratHarga></KadarBeratHarga>
            <Deskripsi></Deskripsi>
            <div className="border-2 border-primary rounded p-1 mt-2">
              <div className="flex justify-center">
                <span className='font-bold'>attribute</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <WarnaEmas></WarnaEmas>
                <Kondisi></Kondisi>
              </div>
              <Cap></Cap>
              {showMata && <Mata></Mata>}
              {showMainan && <Mainan></Mainan>}
            </div>
            <input type="hidden" name="test" defaultValue={'test'} />
            <input type="hidden" name="test" defaultValue={'123'} />
            <div className="flex justify-center mt-3">
              <button type="submit" className="btn btn-success text-white">
                Tambah Perhiasan
              </button>
            </div>
            <div className="flex gap-2 fixed bottom-0">
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => toggleMata(el)}
                  />
                  <span className="label-text">mata</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => toggleMainan(el)}
                  />
                  <span className="label-text">mainan</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                  />
                  <span className="label-text">plat</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                  />
                  <span className="label-text">nampan</span>
                </label>
              </div>
            </div>
          </form>
        </div>
        {errorMessage && 
        <div role="alert" className="w-3/4 flex justify-between bg-primary p-3 rounded fixed bottom-9 text-white animate-pulse">
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{errorMessage}</span>
          </div>
          <button type='button' className='text-white' onClick={()=>setErrorMessage('')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        }
      </main>
    </>
  );
};

export default AddProductPage;
