import { BaseSyntheticEvent, useEffect, useState } from 'react';

import { SessionProvider } from 'next-auth/react';
import NavbarB from '@/pages/components/NavbarB';
import { redirect, useRouter } from 'next/navigation';
import TipeBarang from '@/pages/products/add/components/TipeBarang';
import WarnaEmas from '@/pages/products/add/components/WarnaEmas';
import Kondisi from '@/pages/products/add/components/Kondisi';
import Cap from '@/pages/products/add/components/Cap';
import { addNewPerhiasan } from '@/lib/addNewPerhiasan';
import TipePerhiasan from '@/pages/products/add/components/TipePerhiasan';
import JenisPerhiasan from '@/pages/products/add/components/JenisPerhiasan';
import KadarBeratHarga from '@/pages/products/add/components/KadarBeratHarga';
import Nama from '@/pages/products/add/components/Nama';
import Deskripsi from '@/pages/products/add/components/Deskripsi';
import RangeUsia from '@/pages/products/add/components/RangeUsia';
import Ukuran from '@/pages/products/add/components/Ukuran';
import Merk from '@/pages/products/add/components/Merk';
import Mata from '@/pages/products/add/components/Mata';
import Mainan from '@/pages/products/add/components/Mainan';
import Plat from '@/pages/products/add/components/Plat';
import Nampan from '@/pages/products/add/components/Nampan';
import { retrieveAllDataInCollection } from '@/lib/firebase/service';
import Keterangan from '@/pages/products/add/components/Keterangan';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase.config';
import NamaShort from '../products/add/components/NamaShort';

// interface dataPerhiasanInterface {
//   nama: string,
//   codename: string,
//   code: number,
//   jenis: {
//     nama: string,
//     code: number
//   }[]
// }

const AddProductPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dataPerhiasan, setDataPerhiasan] = useState<any[]>([]);

  useEffect(() => {
    // const res = getAllProduct();
    // console.log('i fire once');
    const fetchDataPerhiasan = async () => {
      // const res = await retrieveAllDataInCollection('data_perhiasan');
      // setDataPerhiasan(res);
      const warnaEmasRef = collection(db, "data_perhiasan");
      const q = query(warnaEmasRef, orderBy("nama"));
      const querySnapshot = await getDocs(q);
      const data = new Array();
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          data.push({
              id: doc.id,
              ...doc.data()
          });
      });
      setDataPerhiasan(data);
    }
    fetchDataPerhiasan();
  }, [setDataPerhiasan])
  // console.log(dataPerhiasan);

  const [tipePerhiasanTerpilihCodename, setTipePerhiasanTerpilihCodename] = useState('AT');
  const [tipePerhiasanTerpilihNama, setTipePerhiasanTerpilihNama] = useState('Anting');
  const [jenisPerhiasanTerpilih, setJenisPerhiasanTerpilih] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [warnaEmas, setWarnaEmas] = useState('');
  const [kadar, setKadar] = useState('');
  const [berat, setBerat] = useState('');

  const handleAddProduct = async (e: BaseSyntheticEvent) => {
    setRedirecting(false);
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');
    const res = await addNewPerhiasan(e);
    if (res.status === 400) {
      setTimeout(() => {
        setErrorMessage(res.message);
        setIsLoading(false);
      }, 1000);
    } else if (res.status === 202) {
      setTimeout(() => {
        // setRedirecting(true)
        setSuccessMessage(res.message);
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
        <NavbarB></NavbarB>
      </SessionProvider>
      <main className="p-2 mb-52">
        <div>
          <form action="" method="POST" onSubmit={(e) => handleAddProduct(e)}>
            <div className="grid grid-cols-2 gap-2">
              <TipeBarang tipe_barang='perhiasan'></TipeBarang>
              <TipePerhiasan data_perhiasan={dataPerhiasan} setTipePerhiasanTerpilihCodename={setTipePerhiasanTerpilihCodename} setTipePerhiasanTerpilihNama={setTipePerhiasanTerpilihNama} setJenisPerhiasanTerpilih={setJenisPerhiasanTerpilih}></TipePerhiasan>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <JenisPerhiasan data_perhiasan={dataPerhiasan} tipePerhiasanTerpilihCodename={tipePerhiasanTerpilihCodename} tipePerhiasanTerpilihNama={tipePerhiasanTerpilihNama} jenisPerhiasanTerpilih={jenisPerhiasanTerpilih} setJenisPerhiasanTerpilih={setJenisPerhiasanTerpilih}></JenisPerhiasan>
              <Deskripsi setDeskripsi={setDeskripsi}></Deskripsi>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <WarnaEmas setWarnaEmas={setWarnaEmas}></WarnaEmas>
            </div>
            <KadarBeratHarga setKadar={setKadar} setBerat={setBerat}></KadarBeratHarga>
            <Nama tipePerhiasan={tipePerhiasanTerpilihNama} jenisPerhiasan={jenisPerhiasanTerpilih} deskripsi={deskripsi} warnaEmas={warnaEmas} kadar={kadar} berat={berat}></Nama>
            <NamaShort tipePerhiasan={tipePerhiasanTerpilihNama} jenisPerhiasan={jenisPerhiasanTerpilih} deskripsi={deskripsi} warnaEmas={warnaEmas}></NamaShort>
            <Keterangan></Keterangan>
            <div className="border-2 border-primary rounded p-1 mt-2">
              <div className="flex justify-center">
                <span className='font-bold'>attribute</span>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
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

        {successMessage && 
        <div role="alert" className="w-3/4 flex justify-between bg-success p-3 rounded fixed bottom-9 text-white animate-pulse">
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{successMessage}</span>
          </div>
          <button type='button' className='text-white' onClick={()=>setSuccessMessage('')}>
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
