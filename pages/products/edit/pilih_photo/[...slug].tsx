import Navbar from "@/pages/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

const PilihPhotoDariProdukLain = () => {
    const [DataUser, setDataUser] = useState<any>();

    return ( 
        <>
        <SessionProvider>
            <Navbar setDataUser={setDataUser}></Navbar>
        </SessionProvider>
        </>
    );
}
 
export default PilihPhotoDariProdukLain;