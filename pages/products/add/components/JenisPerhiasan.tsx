import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface JenisPerhiasanProps {
    data_perhiasan: {
        nama: string,
        codename: string,
        code: number,
        // id: string,
        jenis: {nama: string, code: number}[],
    }[],
    tipePerhiasanTerpilihCodename:string,
    tipePerhiasanTerpilihNama:string,
    jenisPerhiasanTerpilih: string,
    setJenisPerhiasanTerpilih: Dispatch<SetStateAction<string>>
}

const JenisPerhiasan = ({data_perhiasan, tipePerhiasanTerpilihCodename, tipePerhiasanTerpilihNama, jenisPerhiasanTerpilih, setJenisPerhiasanTerpilih}:JenisPerhiasanProps) => {

    const jenis_perhiasan_terpilih = new Array();
    // console.log(data_perhiasan);
    // console.log(tipePerhiasanTerpilihCodename);
    if (data_perhiasan && data_perhiasan.length !== 0) {
        const jenis_perhiasan = data_perhiasan.filter((data) => data.codename === tipePerhiasanTerpilihCodename)[0].jenis;

        // console.log(jenis_perhiasan);
        
        jenis_perhiasan.forEach(jenis => {
            jenis_perhiasan_terpilih.push(jenis.nama);
        });
    }
    // console.log(jenis_perhiasan_terpilih);
    const [jenisPerhiasanFiltered, setJenisPerhiasanFiltered] = useState<any>([]);
    const [sudahPilih, setSudahPilih] = useState(false);

    const handleOninputJenisPerhiasan = (e:ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setSudahPilih(false);
        const jenis_perhiasan_filtered = jenis_perhiasan_terpilih.filter(jenis =>  jenis.toLowerCase().includes(e.target.value.toLowerCase()))
        setJenisPerhiasanFiltered(jenis_perhiasan_filtered);
    }

    const handlePilihJenisPerhiasan = (jenis: string) => {
        setSudahPilih(true);
        setJenisPerhiasanTerpilih(jenis);
    }

    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">jenis {tipePerhiasanTerpilihNama}</span>
            </div>
            <div className="relative">
                <input className="input input-bordered" name="jenis_perhiasan" onChange={(e) => handleOninputJenisPerhiasan(e)} defaultValue={jenisPerhiasanTerpilih} key={jenisPerhiasanTerpilih}/>
                {(jenisPerhiasanFiltered.length !== 0) ?
                !sudahPilih &&
                <div className="absolute top-11 left-2 bg-base-100">
                    {jenisPerhiasanFiltered && jenisPerhiasanFiltered.map((jenis:string, index:number) => {
                        return (
                            <div key={index} className="p-2 border border-rose-200 hover:bg-primary block" onClick={() => handlePilihJenisPerhiasan(jenis)}>{jenis}</div>
                        )
                    })}
                </div>
                : ''
                }
            </div>
        </div>
    );
}
 
export default JenisPerhiasan;