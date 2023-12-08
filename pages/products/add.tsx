'use client';

import { BaseSyntheticEvent, useState } from 'react';
import Mata from './components/Mata';
import Mainan from './components/Mainan';

const AddProductPage = () => {
  const handleAddProduct = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(e.target);
  };

  const [showMata, setShowMata] = useState(false);

  const toggleMata = (el: BaseSyntheticEvent) => {
    if (el.target.checked) {
      setShowMata(true);
      el.target.value = 'mata';
    } else {
      setShowMata(false);
      el.target.value = '';
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
    <main className="p-2">
      <div>
        <form action="" method="POST" onSubmit={(e) => handleAddProduct(e)}>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">nama</span>
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
                <span className="label-text">kadar</span>
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
                <span className="label-text">berat</span>
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
                <span className="label-text">harga_gr</span>
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
                <span className="label-text">harga_t</span>
              </div>
              <input
                type="number"
                placeholder="harga_t..."
                name="harga_t"
                className="input input-bordered input-sm w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">warna_emas</span>
              </div>
              <select
                className="select select-bordered select-sm"
                name="warna_emas"
              >
                <option value={'kuning'}>kuning</option>
                <option value={'merah'}>merah</option>
                <option value={'chrome'}>chrome</option>
                <option value={'putih'}>putih</option>
              </select>
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">kondisi</span>
              </div>
              <select
                className="select select-bordered select-sm"
                name="kondisi"
              >
                <option value={99}>99</option>
                <option value={80}>80</option>
                <option value={70}>70</option>
                <option value={60}>60</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">deskripsi</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="deskripsi..."
            ></textarea>
          </div>
          <div className="flex justify-center mt-3">
            <button type="submit" className="btn btn-success btn-xs text-white">
              Tambah
            </button>
          </div>
          <div className="border-2 border-primary rounded p-1 mt-2">
            {showMata && <Mata></Mata>}
            {showMainan && <Mainan></Mainan>}
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
                <span className="label-text">cap</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddProductPage;
