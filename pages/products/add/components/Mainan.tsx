import {
  ChangeEvent,
  useState,
} from 'react';
import ElementMainan from './ElementMainan';

interface mainanProps {
  PilihanMainan: {
    id: string,
    code: number,
    codename: string,
    nama: string,
  }[]
}

interface elementMainanProps {
  id: number
}


const Mainan = ({PilihanMainan}:mainanProps) => {
  const [elementMainan, setElementMainan] = useState<elementMainanProps[]>([]);
  const [idElement, setIdElement] = useState(0);

  const handleAddMainan = () => {
    setElementMainan((oldElementMainan) => [
      ...oldElementMainan, {id: idElement}
    ]);
    setIdElement(idElement + 1);
  };

  const handleRemoveMainan = (key: number) => {
    const newElementMainan = elementMainan.filter( element => key !== element.id)
    setElementMainan(newElementMainan);
  };

  

  return (
    <div className='mt-1'>
      <div className="flex gap-1 items-center">
        <span className='label-text font-bold'>mainan</span>
        <div>
          <button
            type="button"
            className="btn btn-success btn-sm text-white"
            onClick={() => { handleAddMainan() }}
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
      {elementMainan.map( element => (
      <div key={element.id} className='border-b border-slate-400 pb-1'>
        <ElementMainan PilihanMainan={PilihanMainan}></ElementMainan>
        <div className='flex justify-end'>
            <button
                type="button"
                className="btn btn-error btn-sm text-white"
                onClick={() => handleRemoveMainan(element.id)}
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

export default Mainan;
