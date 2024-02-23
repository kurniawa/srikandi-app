import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface InputNamaBarangProps {
    AllProduct: any,
    setNamaProdukTerpilih: Dispatch<SetStateAction<string>>,
    NamaProdukTerpilih: string
}

const InputNamaBarang = ({AllProduct, setNamaProdukTerpilih, NamaProdukTerpilih}:InputNamaBarangProps) => {
    const [NamaProdukFiltered, setNamaProdukFiltered] = useState<any>([]);
    const [sudahPilih, setSudahPilih] = useState(false);
    const [ArrayNamaLong, setArrayNamaLong] = useState<string[]>([]);
    
    useEffect(()=>{
        const array_nama_long:string[] = [];
        AllProduct.forEach((product:any) => {
            array_nama_long.push(product.nama_long);
        });
        setArrayNamaLong(array_nama_long);
    }, [AllProduct, setArrayNamaLong]);

    console.log(ArrayNamaLong);

    const handleOninputNamaPerhiasan = (e:ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setSudahPilih(false);
        const product_sesuai_input = ArrayNamaLong.filter((nama_long) =>  nama_long.toLowerCase().includes(e.target.value.toLowerCase()))
        setNamaProdukFiltered(product_sesuai_input);
    }

    const handlePilihNamaProduk = (jenis: string, index:number) => {
        setSudahPilih(true);
        setNamaProdukTerpilih(jenis);
        console.log(AllProduct[index]);
    }

    return ( 
        <>
            <div className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold">Nama Produk</span>
                </div>
                <div className="relative">
                    <input className="input input-bordered w-full" name="jenis_perhiasan" onChange={(e) => handleOninputNamaPerhiasan(e)} defaultValue={NamaProdukTerpilih} key={NamaProdukTerpilih}/>
                    {(NamaProdukFiltered.length !== 0) ?
                    !sudahPilih &&
                    <div className="absolute top-11 left-2 bg-base-100">
                        {NamaProdukFiltered && NamaProdukFiltered.map((jenis:string, index:number) => {
                            return (
                                <div key={index} className="p-2 border border-rose-200 hover:bg-primary block" onClick={() => handlePilihNamaProduk(jenis, index)}>{jenis}</div>
                            )
                        })}
                    </div>
                    : ''
                    }
                </div>
            </div>
        </> 
    );
}
 
export default InputNamaBarang;