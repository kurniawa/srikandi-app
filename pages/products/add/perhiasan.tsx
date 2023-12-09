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

const AddProductPage = () => {
  const handleAddProduct = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(e.target)
    console.log(e.target.nama);
    console.log(e.target.warna_mata);
    console.log(e.target.test);
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
      <main className="p-2">
        <div>
          <form action="" method="POST" onSubmit={(e) => handleAddProduct(e)}>
          <div className="grid grid-cols-2 gap-2">
              <TipeBarang tipe_barang='perhiasan'></TipeBarang>
              <TipePerhiasan></TipePerhiasan>
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">nama</span>
              </div>
              <input
                type="text"
                placeholder="nama..."
                name="nama"
                className="input input-bordered input-sm w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">kadar</span>
                </div>
                <input
                  type="number"
                  placeholder="kadar..."
                  name="kadar"
                  className="input input-bordered input-sm w-full"
                />
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">berat</span>
                </div>
                <input
                  type="number"
                  placeholder="berat..."
                  name="berat"
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">harga_gr</span>
                </div>
                <input
                  type="number"
                  placeholder="harga_gr..."
                  name="harga_gr"
                  className="input input-bordered input-sm w-full"
                />
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">harga_t</span>
                </div>
                <input
                  type="number"
                  placeholder="harga_t..."
                  name="harga_t"
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">deskripsi</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="deskripsi..."
              ></textarea>
            </div>
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
      </main>
    </>
  );
};

export default AddProductPage;
