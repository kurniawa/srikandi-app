import { BaseSyntheticEvent, useEffect, useState } from 'react';
import Mata from './components/Mata';
import Mainan from './components/Mainan';
import WarnaEmas from './components/WarnaEmas';
import Kondisi from './components/Kondisi';
import Cap from './components/Cap';
import TipeBarang from './components/TipeBarang';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/pages/components/Navbar';
import TipePerhiasan from './components/TipePerhiasan';
import Nama from './components/Nama';
import KadarBeratHarga from './components/KadarBeratHarga';
import Deskripsi from './components/Deskripsi';
import { addNewPerhiasan } from '../../../lib/addNewPerhiasan';
import Plat from './components/Plat';
import Nampan from './components/Nampan';
import RangeUsia from './components/RangeUsia';
import Ukuran from './components/Ukuran';
import Merk from './components/Merk';
import { redirect, useRouter } from 'next/navigation';
import JenisPerhiasan from './components/JenisPerhiasan';

const AddProductPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = async (e: BaseSyntheticEvent) => {
    setRedirecting(false);
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');
    const res = await addNewPerhiasan(e);
    if (res.status === 400) {
      setErrorMessage(res.message);
    } else if (res.status === 202) {
      setTimeout(() => {
        setRedirecting(true)
        setIsLoading(false);
      }, 1000);
    }
  }

  const [showUkuran, setShowUkuran] = useState(false);
  const toggleUkuran = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowUkuran(true);
      
    } else {
      setShowUkuran(false);
    }
    // console.log(el.target);
  };

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
    } else {
      setShowMainan(false);
    }
    // console.log(el.target);
  };

  const [showMerk, setShowMerk] = useState(false);
  const toggleMerk = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowMerk(true);
    } else {
      setShowMerk(false);
    }
    // console.log(el.target);
  };

  const [showPlat, setShowPlat] = useState(false);
  const togglePlat = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowPlat(true);
    } else {
      setShowPlat(false);
    }
    // console.log(el.target);
  };

  const [showNampan, setShowNampan] = useState(false);
  const toggleNampan = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowNampan(true);
    } else {
      setShowNampan(false);
    }
    // console.log(el.target);
  };

  const router = useRouter()
  useEffect(() => {
    // console.log('useEffect - redirecting')
    if (redirecting) {
      router.push("/products")
    }
  }, [redirecting, router]);

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
              {/* <TipePerhiasan></TipePerhiasan> */}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* <JenisPerhiasan tipe_perhiasan='perhiasan'></JenisPerhiasan> */}
              <div></div>
            </div>
            {/* <KadarBeratHarga></KadarBeratHarga>
            <Nama></Nama>
            <Deskripsi></Deskripsi> */}
            <div className="border-2 border-primary rounded p-1 mt-2">
              <div className="flex justify-center">
                <span className='font-bold'>attribute</span>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {/* <WarnaEmas></WarnaEmas> */}
                <Kondisi></Kondisi>
                <Cap></Cap>
                <RangeUsia></RangeUsia>
                {showUkuran && <Ukuran></Ukuran>}
                {showMerk && <Merk></Merk>}
              </div>
              {showMata && <Mata></Mata>}
              {showMainan && <Mainan></Mainan>}
              <div className="grid grid-cols-2 gap-2 md:w-1/2">
                {showPlat && <Plat></Plat>}
                {showNampan && <Nampan></Nampan>}
              </div>
            </div>
            <input type="hidden" name="test" defaultValue={'test'} />
            <input type="hidden" name="test" defaultValue={'123'} />
            <div className="flex justify-center mt-3">
              <button type="submit" className="btn btn-success text-white" disabled={isLoading}>
                <span>Tambah Perhiasan</span>
                {isLoading && <span className='loading loading-spinner'></span>}
              </button>
            </div>
            <div className="flex gap-2 fixed bottom-0">
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => toggleMata(el)}
                    name='toggle_mata'
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
                    name='toggle_mainan'
                  />
                  <span className="label-text">mainan</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => toggleUkuran(el)}
                  />
                  <span className="label-text">ukuran</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => toggleMerk(el)}
                  />
                  <span className="label-text">merk</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => togglePlat(el)}
                  />
                  <span className="label-text">plat</span>
                </label>
              </div>
              <div className="form-control max-w-fit">
                <label className="label cursor-pointer gap-1">
                  <input
                    type="checkbox"
                    className="checkbox border-4 checkbox-xs checkbox-secondary"
                    onChange={(el) => toggleNampan(el)}
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
