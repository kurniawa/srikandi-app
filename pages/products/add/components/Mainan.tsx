import {
  useState,
} from 'react';

interface elementMainanProps {
  id: number
}


const Mainan = () => {
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
        <span className='label-text font-bold'>warna_mainan</span>
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
        <div className="flex w-full gap-1 items-center mt-1" key={element.id}>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="mainan..."
            name="mainan"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div className="w-1/4">
          <input
            type="number"
            placeholder="jumlah_mainan..."
            name="jumlah_mainan"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
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
