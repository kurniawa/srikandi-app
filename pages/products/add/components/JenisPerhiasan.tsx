import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface JenisPerhiasanProps {
    data_perhiasan: {
        nama: string,
        codename: string,
        code: number,
        // id: string,
        jenis: {nama: string, code: number}[],
    }[],
    tipePerhiasan:string
}

const JenisPerhiasan = ({data_perhiasan, tipePerhiasan}:JenisPerhiasanProps) => {

    const jenis_perhiasan = data_perhiasan.filter((data) => data.codename === tipePerhiasan)[0].jenis;
    const jenis_perhiasan_terpilih = new Array();
    jenis_perhiasan.forEach(jenis => {
        jenis_perhiasan_terpilih.push(jenis.nama);
    });
    // console.log(jenis_perhiasan_terpilih);
    const [jenisPerhiasanFiltered, setJenisPerhiasanFiltered] = useState<any>([]);
    const [sudahPilih, setSudahPilih] = useState(false);
    const [jenisPerhiasanTerpilih, setJenisPerhiasanTerpilih] = useState('');

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
                <span className="label-text font-bold">jenis {tipePerhiasan}</span>
            </div>
            <div className="relative">
                <input className="input input-bordered" name="jenis_perhiasan" onChange={(e) => handleOninputJenisPerhiasan(e)} value={jenisPerhiasanTerpilih}/>
                {(jenisPerhiasanFiltered.length !== 0) ?
                !sudahPilih &&
                <div className="absolute top-11 left-2 bg-base-100">
                    {jenisPerhiasanFiltered.map((jenis:string, index:number) => {
                        return (
                            <div key={index} className="p-2 border border-rose-200 hover:bg-primary" onClick={() => handlePilihJenisPerhiasan(jenis)}>{jenis}</div>
                        )
                    })}
                </div>
                : ''
                }
            </div>
            {/* <select
            className="select select-bordered select-sm"
            name="tipe_perhiasan"
            >
                {jenis_perhiasan.map((jenis) => {
                    return (
                        <option value={jenis.nama} key={jenis.code}>{jenis.nama}</option>
                    )
                })} */}
                {/* <option value={'GW'}>GW</option>
                <option value={'CC'}>CC</option>
                <option value={'GLR'}>GLR</option>
                <option value={'GLB'}>GLB</option>
                <option value={'KL'}>KL</option>
                <option value={'Lion'}>Lion</option> */}
            {/* </select> */}
        </div>
    );
}
 
export default JenisPerhiasan;