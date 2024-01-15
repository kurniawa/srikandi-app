import { ChangeEvent, useState } from "react";

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

const ElementMata = ({PilihanWarnaMata, PilihanSaturasi, PilihanOpacity}:mataProps) => {
    
  const [WarnaMataTerpilih, setWarnaMataTerpilih] = useState('');
  const [WarnaMataFiltered, setWarnaMataFiltered] = useState<any>([]);
  const [SudahPilihWarnaMata, setSudahPilihWarnaMata] = useState(false);

  const handleOnInputWarnaMata = (e:ChangeEvent<HTMLInputElement>) => {
    setSudahPilihWarnaMata(false);
    const pilihan_warna_filtered = PilihanWarnaMata.filter(warna_mata =>  warna_mata.nama.toLowerCase().includes(e.target.value.toLowerCase()))
    setWarnaMataFiltered(pilihan_warna_filtered);
    // console.log(pilihan_warna_filtered);
  }

  const handlePilihWarnaMata = (warna_mata:string) => {
    setSudahPilihWarnaMata(true);
    setWarnaMataTerpilih(warna_mata);
  }
  
    return ( 
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 items-center mt-1">
        <div className="relative w-full">
          <input 
            type='text'
            name="warna_mata" 
            placeholder="warna_mata..."
            onChange={(e) => handleOnInputWarnaMata(e)}
            defaultValue={WarnaMataTerpilih}
            key={WarnaMataTerpilih}
            className="input input-bordered input-sm w-11/12"
          />
          {(WarnaMataFiltered.length !== 0) ?
            !SudahPilihWarnaMata &&
            <div className="absolute top-7 left-2 bg-base-100">
                {WarnaMataFiltered && WarnaMataFiltered.map((warna_mata:any, index:number) => {
                    return (
                        <div key={index} className="p-2 border border-rose-200 hover:bg-primary block" onClick={() => handlePilihWarnaMata(warna_mata.nama)}>{warna_mata.nama}</div>
                    )
                })}
            </div>
            : ''
          }
        </div>
        <div className="w-1/4">
          <select name="saturasi" className='select select-bordered'>
            {PilihanSaturasi && PilihanSaturasi.map((saturasi)=>
              <option value={saturasi.nama} key={saturasi.id}>{saturasi.nama}</option>
            )
            }
          </select>
        </div>
        <div className="w-1/4">
          <select name="saturasi" className='select select-bordered'>
            {PilihanOpacity && PilihanOpacity.map((opacity)=>
              <option value={opacity.nama} key={opacity.id}>{opacity.nama}</option>
            )
            }
          </select>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            placeholder="jumlah_mata..."
            name="jumlah_mata"
            className="input input-bordered input-sm w-full"
          />
          
        </div>
      </div>
     );
}
 
export default ElementMata;