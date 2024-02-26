import { retrieveAllDataInCollection, retrieveDataById } from "@/lib/firebase/service";
import Navbar from "@/pages/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import InputNamaBarang from "./InputNamaBarang";
import UploadImage from "../../add/components/UploadImage";

const PilihPhotoDariProdukLain = () => {
    const [DataUser, setDataUser] = useState<any>();
    const router = useRouter();
    const [AllProduct, setAllProduct] = useState<any>([]);
    const [NamaProdukTerpilih, setNamaProdukTerpilih] = useState('');
    const [Product, setProduct] = useState<any>();
    const [ErrorMessage, setErrorMessage] = useState('');
    const [WarningMessage, setWarningMessage] = useState('');
    const [SuccessMessage, setSuccessMessage] = useState('');
    const [TipeBarang, setTipeBarang] = useState('');
    const [IdBarang, setIdBarang] = useState('');
    const [PhotoIndex, setPhotoIndex] = useState(0);

    // console.log(router.query.slug);

    useEffect(() => {
        const getAllProduct = async () => {
            let fetch_all_product = [];
            if (router) {
                if (router.query) {
                    if (router.query.slug) {
                        fetch_all_product = await retrieveAllDataInCollection(router.query.slug[0]);
                        setAllProduct(fetch_all_product);
                    }
                }
            }

            console.log(router.query.slug); 
        }
        getAllProduct();
    }, [router, setAllProduct]);
    // console.log(AllProduct);

    useEffect(() => {
        const fetchProduct = async () => {
          if (router.query.slug) {
            const fetched_product = await retrieveDataById(router.query.slug[0], router.query.slug[1]);
    
            if (fetched_product) {
              fetched_product.id = router.query.slug[1];
            }
    
            // console.log(fetched_product);
            setProduct(fetched_product);
            setTipeBarang(router.query.slug[0]);
            setIdBarang(router.query.slug[1]);
            setPhotoIndex(parseInt(router.query.slug[2]));
          }
        }
        fetchProduct()
    },[setProduct, router.query.slug]);

    return ( 
        <>
        <SessionProvider>
            <Navbar setDataUser={setDataUser}></Navbar>
        </SessionProvider>
        <main className="p-2">
            <h3 className="font-bold">Pilih dari Produk Lain:</h3>
            <div className="border border-indigo-500 rounded p-1">
                <InputNamaBarang AllProduct={AllProduct} setNamaProdukTerpilih={setNamaProdukTerpilih} NamaProdukTerpilih={NamaProdukTerpilih}></InputNamaBarang>
            </div>

            <h3 className="font-bold">Input Foto Baru:</h3>
            <div className="border border-emerald-500 rounded p-1">
                <UploadImage Product={Product} PhotoIndex={PhotoIndex} TipeBarang={TipeBarang} IdBarang={IdBarang} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} setWarningMessage={setWarningMessage}></UploadImage>
            </div>

            {SuccessMessage && 
            <div role="alert" className="fixed bottom-9 text-white animate-pulse">
                <div className="flex justify-between bg-success p-3 rounded">
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>{SuccessMessage}</span>
                    </div>
                    <button type='button' className='text-white' onClick={()=>setSuccessMessage('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            }
        </main>
        </>
    );
}
 
export default PilihPhotoDariProdukLain;