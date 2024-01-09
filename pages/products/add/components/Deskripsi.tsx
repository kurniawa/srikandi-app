import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface deskripsiProps {
    setDeskripsi: Dispatch<SetStateAction<string>>
}

const Deskripsi = ({setDeskripsi}:deskripsiProps) => {
    
    const handleInputDeskripsi = (e:ChangeEvent<HTMLInputElement>) => {
        setDeskripsi(e.target.value);
    }

    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">deskripsi (opt.)</span>
            </div>
            <div>
            <input
              type="text"
              placeholder="deskripsi..."
              name="deskripsi"
              className="input input-bordered input-sm w-full"
              onChange={(e)=>handleInputDeskripsi(e)}
            />
            </div>
        </div>
    );
}
 
export default Deskripsi;