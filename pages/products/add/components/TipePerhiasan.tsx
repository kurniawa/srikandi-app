import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TipePerhiasanProps {
    data_perhiasan:{
        nama: string,
        codename: string,
        code: number,
        // id: string,
        jenis: {nama: string, code: number}[],
    }[],
    // tipePerhiasan: string,
    setTipePerhiasanTerpilihCodename: Dispatch<SetStateAction<string>>,
    setTipePerhiasanTerpilihNama: Dispatch<SetStateAction<string>>,
    setJenisPerhiasanTerpilih: Dispatch<SetStateAction<string>>
}

const TipePerhiasan = ({data_perhiasan, setTipePerhiasanTerpilihCodename, setTipePerhiasanTerpilihNama, setJenisPerhiasanTerpilih}:TipePerhiasanProps) => {
    const handleChangeTipePerhiasan = (e:ChangeEvent<HTMLSelectElement>) => {
        const dataPerhiasanTerpilih = data_perhiasan.filter((data) => {return data.codename === e.target.value})[0];
        // console.log(data_perhiasan);
        // console.log(e.target.value);
        // console.log(dataPerhiasanTerpilih);
        setTipePerhiasanTerpilihCodename(dataPerhiasanTerpilih.codename);
        setTipePerhiasanTerpilihNama(dataPerhiasanTerpilih.nama);
        setJenisPerhiasanTerpilih('');
    }
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">tipe_perhiasan</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="tipe_perhiasan"
            onChange={(e) => handleChangeTipePerhiasan(e)}
            >
                {data_perhiasan && data_perhiasan.map((data)=>{
                    return (
                        <option value={data.codename} key={data.codename}>{data.codename}</option>
                    )
                })}
            </select>
        </div>
    );
}
 
export default TipePerhiasan;