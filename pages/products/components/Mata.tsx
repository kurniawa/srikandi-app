import { BaseSyntheticEvent, ReactElement, useState } from 'react';

const Mata = () => {
  const [indexMata, setIndexMata] = useState(1);

  let htmlMata: ReactElement[] = [];

  for (let i = 0; i < indexMata; i++) {
    htmlMata.push(
      <div className="flex w-full gap-1 items-center mb-1" key={i}>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="warna_mata..."
            name="warna_mata[]"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div className="w-1/4">
          <input
            type="number"
            placeholder="jumlah_mata..."
            name="jumlah_mata[]"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-error btn-sm text-white"
            onClick={() => setIndexMata(indexMata - 1)}
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
    );
  }

  return (
    <div>
      {htmlMata}
      <div>
        <button
          type="button"
          className="btn btn-success btn-sm text-white"
          onClick={() => {
            setIndexMata(indexMata + 1);
            setTimeout(() => {
              console.log(htmlMata);
            }, 1000);
          }}
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
  );
};

export default Mata;
