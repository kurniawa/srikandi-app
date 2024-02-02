import Navbar from "@/pages/components/Navbar";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const AddPage = () => {
    const [DataUser, setDataUser] = useState<any>();
    
    return (
    <>
        <SessionProvider>
            <Navbar setDataUser={setDataUser}></Navbar>
        </SessionProvider>
        <main className="p-2">
            <div className="flex gap-2">
                <Link href={'/products/add/perhiasan'} className="btn btn-secondary text-white">
                    Perhiasan
                </Link>
                <Link href={'/products/add/perhiasan'} className="btn btn-secondary text-white">
                    LM
                </Link>
            </div>
        </main> 
    </> 
    );
}
 
export default AddPage;