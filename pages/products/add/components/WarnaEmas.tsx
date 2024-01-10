import { db } from "@/firebase.config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {  ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface WarnaEmasProps {
    setWarnaEmas: Dispatch<SetStateAction<string>>
}

const WarnaEmas = ({setWarnaEmas}:WarnaEmasProps) => {

    const [warnaEmasThis, setWarnaEmasThis] = useState<any[]>([]);

    useEffect(() => {
        const fetchWarnaEmas = async () => {
            const warnaEmasRef = collection(db, "warna_emas");
            const q = query(warnaEmasRef, orderBy('code'));
            const querySnapshot = await getDocs(q);
            const data = new Array();
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            // console.log(data);
            setWarnaEmasThis(data);
            setWarnaEmas(data[0].nama);
            // console.log(data);
        }
        fetchWarnaEmas();
    },[setWarnaEmas, setWarnaEmasThis]);
    // console.log(warnaEmas);

    const handleChangeWarnaEmas = async (e:ChangeEvent<HTMLSelectElement>) => {
        setWarnaEmas(e.target.value);
    }

    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">warna_emas</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="warna_emas"
            onChange={(e) => handleChangeWarnaEmas(e)}
            >
                {warnaEmasThis && warnaEmasThis.map((warna) => 
                    // (warna.nama === 'kuning') ?  
                    // <option value={warna.nama} key={warna.id} selected>{warna.nama}</option>
                    // :
                    // <option value={warna.nama} key={warna.id}>{warna.nama}</option>
                    <option value={warna.nama} key={warna.id}>{warna.nama}</option>
                )}
            </select>
        </div>
     );
}
 
export default WarnaEmas;