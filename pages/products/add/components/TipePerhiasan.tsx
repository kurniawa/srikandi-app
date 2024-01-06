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
    setTipePerhiasan: Dispatch<SetStateAction<string>>
}

const TipePerhiasan = ({data_perhiasan, setTipePerhiasan}:TipePerhiasanProps) => {
    const handleChangeTipePerhiasan = (e:ChangeEvent<HTMLSelectElement>) => {
        setTipePerhiasan(e.target.value);
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
                {data_perhiasan.map((data)=>{
                    return (
                        <option value={data.codename} key={data.codename}>{data.codename}</option>
                    )
                })}
            </select>
        </div>
    );
}
 
export default TipePerhiasan;