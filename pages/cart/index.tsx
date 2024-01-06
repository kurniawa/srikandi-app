import { useRouter } from "next/router";

const Cart = () => {
    const router = useRouter();

    return ( 
        <>
            <h3>Keranjang {router.query.slug}</h3>
        </>
    );
}
 
export default Cart;