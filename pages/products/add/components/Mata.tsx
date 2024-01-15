import { db } from '@/firebase.config';
import { retrieveAllDataInCollection } from '@/lib/firebase/service';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import ElementMata from './ElementMata';

interface mataProps {
  PilihanWarnaMata: {
    id: string,
    code: number,
    codename: string,
    nama: string,
  }[],
  PilihanSaturasi: {
    id: string,
    code: number,
    codename: string,
    nama: string,
  }[],
  PilihanOpacity: {
    id: string,
    code: number,
    codename: string,
    nama: string,
  }[],
}

interface elementMataProps {
  id: number
}

const Mata = ({PilihanWarnaMata, PilihanSaturasi, PilihanOpacity}:mataProps) => {
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
      <div key={element.id} className='border-b border-slate-400 pb-1'>
        <ElementMata PilihanWarnaMata={PilihanWarnaMata} PilihanSaturasi={PilihanSaturasi} PilihanOpacity={PilihanOpacity}></ElementMata>
        <div className='flex justify-end'>
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
