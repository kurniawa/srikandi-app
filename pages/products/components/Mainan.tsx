import {
  BaseSyntheticEvent,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';

const Mainan = () => {
  const [htmlMainan, setHtmlMainan]: any = useState([]);

  const [indexMainan, setIndexMainan] = useState(0);

  const handleAddMainan = () => {
    setHtmlMainan((oldHtmlMainan: any) => [
      ...oldHtmlMainan,
      <div className="flex w-full gap-1 items-center mb-1" key={indexMainan}>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="warna_mainan..."
            name="warna_mainan[]"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div className="w-1/4">
          <input
            type="number"
            placeholder="jumlah_mainan..."
            name="jumlah_mainan[]"
            className="input input-bordered input-sm w-full"
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-error btn-sm text-white"
            onClick={() => handleRemoveMainan(indexMainan)}
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
      </div>,
    ]);
    // console.log(indexMainan);
    console.log(htmlMainan);
    setIndexMainan(indexMainan + 1);
  };

  const handleRemoveMainan = (i: number) => {
    const key_to_rm = i.toString();
    console.log(htmlMainan);
    console.log(key_to_rm);
    setHtmlMainan(
      htmlMainan.filter((html: any, index: number) => {
        console.log('index');
        console.log(index);
        // // console.log('html.key');
        // console.log(html.key);
        // // console.log('i');
        // console.log(i);
        // if (parseInt(html.key) < i || parseInt(html.key) > i) {
        //   console.log(parseInt(html.key));
        //   console.log(i);
        //   return html;
        // }
        html.key !== key_to_rm;
      })
    );
  };

  return (
    <div>
      {htmlMainan}
      <div>
        <button
          type="button"
          className="btn btn-success btn-sm text-white"
          onClick={() => {
            handleAddMainan();
            // setTimeout(() => {
            //   console.log(htmlMainan);
            // }, 1000);
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

export default Mainan;
