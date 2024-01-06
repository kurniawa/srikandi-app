import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import NavbarB from "../components/NavbarB";
import Link from "next/link";

const Cart = () => {
    const router = useRouter();

    return ( 
        <>
            <SessionProvider>
                <NavbarB></NavbarB>
            </SessionProvider>
            <main className="p-2">
                <h3 className="font-bold text-xl">Keranjang {router.query.cart_number}</h3>
                <div>
                    <h5>Tambah Item:</h5>
                    <div className="border border-violet-400 p-2 rounded-xl">
                        <div className="flex gap-2">
                            <Link href={'./add_perhiasan'} className="bg-emerald-400 rounded-3xl p-2 text-white">
                                Perhiasan
                            </Link>
                            <Link href={'./add_perhiasan'} className="bg-emerald-400 rounded-3xl p-2 text-white">
                                LM
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
 
export default Cart;