import { retrieveAllDataInCollection } from "@/lib/firebase/service";
import Navbar from "@/pages/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import InputNamaBarang from "./InputNamaBarang";

const PilihPhotoDariProdukLain = () => {
    const [DataUser, setDataUser] = useState<any>();
    const router = useRouter();
    const [AllProduct, setAllProduct] = useState<any>([]);
    const [NamaProdukTerpilih, setNamaProdukTerpilih] = useState('');

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

    

    return ( 
        <>
        <SessionProvider>
            <Navbar setDataUser={setDataUser}></Navbar>
        </SessionProvider>
        <main>
            <InputNamaBarang AllProduct={AllProduct} setNamaProdukTerpilih={setNamaProdukTerpilih} NamaProdukTerpilih={NamaProdukTerpilih}></InputNamaBarang>
        </main>
        </>
    );
}
 
export default PilihPhotoDariProdukLain;