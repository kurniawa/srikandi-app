import { ChangeEvent, useState } from "react";

interface mainanProps {
    PilihanMainan: {
      id: string,
      code: number,
      codename: string,
      nama: string,
    }[]
  }

const ElementMainan = ({PilihanMainan}:mainanProps) => {
    const [MainanTerpilih, setMainanTerpilih] = useState('');
    const [MainanFiltered, setMainanFiltered] = useState<any>([]);
    const [SudahPilihMainan, setSudahPilihMainan] = useState(false);

    const handleOnInputMainan = (e:ChangeEvent<HTMLInputElement>) => {
        setSudahPilihMainan(false);
        const pilihan_mainan_filtered = PilihanMainan.filter(mainan =>  mainan.nama.toLowerCase().includes(e.target.value.toLowerCase()))
        setMainanFiltered(pilihan_mainan_filtered);
        // console.log(pilihan_warna_filtered);
    }

    const handlePilihMainan = (mainan:string) => {
        setSudahPilihMainan(true);
        setMainanTerpilih(mainan);
    }
    
    return ( 
        <div className="flex w-full gap-1 items-center mt-1">
            <div className="w-1/2 relative">
            <input 
                type='text'
                name="mainan" 
                placeholder="mainan..."
                onChange={(e) => handleOnInputMainan(e)}
                defaultValue={MainanTerpilih}
                key={MainanTerpilih}
                className="input input-bordered input-sm w-11/12"
            />
            {(MainanFiltered.length !== 0) ?
                !SudahPilihMainan &&
                <div className="absolute top-7 left-2 bg-base-100">
                    {MainanFiltered && MainanFiltered.map((mainan:any, index:number) => {
                        return (
                            <div key={index} className="p-2 border border-rose-200 hover:bg-primary block" onClick={() => handlePilihMainan(mainan.nama)}>{mainan.nama}</div>
                        )
                    })}
                </div>
                : ''
            }
            </div>
            <div className="w-1/4">
                <input
                    type="number"
                    placeholder="jumlah_mainan..."
                    name="jumlah_mainan"
                    className="input input-bordered input-sm w-full"
                />
            </div>
      </div>
     );
}
 
export default ElementMainan;