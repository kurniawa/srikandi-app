import { ChangeEvent } from "react";

interface MerkProps {
    PilihanMerk: {
        id: string,
        code: number,
        codename: string,
        nama: string,
        short: string,
        edisi: {
            code: number,
            codename: string,
            nama: string,
            short: string,
            tahun: number
        }[] | null
    }[]
}

// const handleChangeMerk = async (e:ChangeEvent<HTMLSelectElement>) => {
//     setWarnaEmas(e.target.value);
// }

const Merk = ({PilihanMerk}: MerkProps) => {
    return ( 
        <div className="form-control">
            <div className="label">
                <span className="label-text font-bold">merk</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="merk"
            // onChange={(e) => handleChangeMerk(e)}
            >
                {PilihanMerk && PilihanMerk.map((merk) => 
                    <option value={merk.nama} key={merk.id}>{merk.nama}</option>
                )}
            </select>
        </div>
     );
}
 
export default Merk;