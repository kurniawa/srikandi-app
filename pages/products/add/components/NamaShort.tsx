import React, { useEffect, useState } from "react";

interface namaProps {
  tipePerhiasan: string,
  jenisPerhiasan: string,
  deskripsi: string,
  warnaEmas: string,
}

const NamaShort = ({tipePerhiasan, jenisPerhiasan, deskripsi, warnaEmas}:namaProps) => {

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
    setNamaShort(namaShortThis);
  },[tipePerhiasan, jenisPerhiasan, deskripsi, warnaEmas, setNamaShort]);

  return ( 
    <>
      <input
        type="hidden"
        placeholder="nama..."
        name="nama_short"
        defaultValue={namaShort}
        key={namaShort}
      />
    </>
  );
}
 
export default NamaShort;