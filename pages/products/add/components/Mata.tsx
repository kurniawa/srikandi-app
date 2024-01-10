import { db } from '@/firebase.config';
import { retrieveAllDataInCollection } from '@/lib/firebase/service';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  useEffect,
  useState,
} from 'react';

interface elementMataProps {
  id: number
}

const Mata = () => {
  const [elementMata, setElementMata] = useState<elementMataProps[]>([]);
  const [idElement, setIdElement] = useState(0);

  const handleAddMata = () => {
    setElementMata((oldElementMata) => [
      ...oldElementMata, {id: idElement}
    ]);
    setIdElement(idElement + 1);
  };

  const handleRemoveMata = (key: number) => {
    const newElementMata = elementMata.filter( element => key !== element.id)
    setElementMata(newElementMata);
  };

  const [pilihanWarnaMata, setPilihanWarnaMata] = useState<any[]>([]);
  const [PilihanOpacity, setPilihanOpacity] = useState<any[]>([]);
  const [PilihanSaturasi, setPilihanSaturasi] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataMata = async () => {
      const warnaMataRef = collection(db, 'warna_permatas');
      const q = query(warnaMataRef, orderBy('code'));
      const querySnapshot = await getDocs(q);
      const data = new Array();
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setPilihanWarnaMata(data);

      const opacityRef = collection(db, 'opacity_warna_permatas');
      const q_opacity = query(opacityRef, orderBy('code'));
      const querySnapshot_opacity = await getDocs(q_opacity);
      const data_opacity = new Array();
      querySnapshot_opacity.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setPilihanOpacity(data_opacity);

      const saturasiRef = collection(db, 'saturasi_warna_permatas');
      const q_saturasi = query(saturasiRef, orderBy('code'));
      const querySnapshot_saturasi = await getDocs(q_saturasi);
      const data_saturasi = new Array();
      querySnapshot_saturasi.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setPilihanSaturasi(data_saturasi);
    }
    fetchDataMata();
    console.log(PilihanSaturasi)
  }, [setPilihanWarnaMata, setPilihanOpacity, setPilihanSaturasi, PilihanSaturasi]);
  console.log(pilihanWarnaMata);
  // console.log(PilihanSaturasi);

  return (
    <div className='mt-1'>
      <div className="flex gap-1 items-center">
        <span className='label-text font-bold'>warna_mata</span>
        <div>
          <button
            type="button"
            className="btn btn-success btn-sm text-white"
            onClick={() => { handleAddMata() }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>
      {elementMata.map( element => (
        <div className="flex w-full gap-1 items-center mt-1" key={element.id}>
        <div className="w-1/4">
          <input
            type="text"
            placeholder="warna_mata..."
            name="warna_mata"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div className="w-1/4">
          <select name="saturasi">
            {PilihanSaturasi && PilihanSaturasi.map((saturasi)=>
              <option value={saturasi.nama} key={saturasi.id}>{saturasi.nama}</option>
            )
            }
          </select>
        </div>
        <div className="w-1/4">
          <input
            type="number"
            placeholder="jumlah_mata..."
            name="jumlah_mata"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-error btn-sm text-white"
            onClick={() => handleRemoveMata(element.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      ))}
      
    </div>
  );
};

export default Mata;
