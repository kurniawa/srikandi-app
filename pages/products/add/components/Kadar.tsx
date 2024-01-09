import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface KadarProps {
    setKadar: Dispatch<SetStateAction<string>>
}

const Kadar = ({setKadar}:KadarProps) => {

    const handleChangeKadar = (e:ChangeEvent<HTMLInputElement>) => {
        setKadar(e.target.value);
    }
    
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">kadar(%.)</span>
            </div>
            <input
            type="text"
            placeholder="kadar..."
            name="kadar"
            className="input input-bordered input-sm w-full"
            onChange={(e)=>handleChangeKadar(e)}
            />
        </div>
     );
}
 
export default Kadar;