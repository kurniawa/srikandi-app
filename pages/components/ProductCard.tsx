import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product, default_photo}:any) => {
    return ( 
        <div className="rounded bg-base-100 shadow drop-shadow p-1">
            <div>
                {default_photo ?
                <Image src={default_photo.path} width={50} height={50} alt="product default photo"/>
                :
                <div className="max-w-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-full h-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                }
            </div>
            {product &&
            <>
                <div>
                    <span>{product.nama_long}</span>
                </div>
                <div className="flex justify-end">
                    <Link href={`/products/detail/perhiasans/${product.id}`}>
                        <button className="rounded-full bg-yellow-500 text-white w-7 h-7 font-bold">D</button>
                    </Link>
                </div>
            </>
            }
        </div>
    );
}
 
export default ProductCard;