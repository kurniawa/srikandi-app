import React, { useEffect, useState } from "react";

interface namaProps {
  tipePerhiasan: string,
  jenisPerhiasan: string,
  deskripsi: string,
  warnaEmas: string,
  kadar: string,
  berat: string,
}

const Nama = ({tipePerhiasan, jenisPerhiasan, deskripsi, warnaEmas, kadar, berat}:namaProps) => {

  const [namaLong, setNamaLong] = useState('');
  const [namaShort, setNamaShort] = useState('');

  useEffect(() => {
    let namaLongThis = `${tipePerhiasan} ${jenisPerhiasan}`;
    if (deskripsi !== '') {
      namaLongThis += ` ${deskripsi}`;
    }
    let namaShortThis = namaLongThis;
    if (warnaEmas !== 'kuning' && warnaEmas !== 'putih') {
      namaLongThis += ` (${warnaEmas})`;
    } else if (warnaEmas === 'putih') {
      namaLongThis += ` (emas ${warnaEmas})`;
    }
    setNamaLong(`${namaLongThis} k:${kadar}% ${berat}g`);
    setNamaShort(namaShortThis);
  },[tipePerhiasan, jenisPerhiasan, deskripsi, warnaEmas, kadar, berat, setNamaLong, setNamaShort]);

  return ( 
      <div className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">nama</span>
        </div>
        <input
          type="text"
          placeholder="nama..."
          name="nama_long"
          className="input input-bordered input-sm w-full"
          defaultValue={namaLong}
          key={namaLong}
        />
        <input
          type="hidden"
          placeholder="nama..."
          name="nama_short"
          defaultValue={namaShort}
          key={namaShort}
        />
      </div> 
  );
}
 
export default Nama;