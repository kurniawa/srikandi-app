const formatPrice = (price:number) => {
    return ( price / 100 ).toLocaleString("id-ID", {
        style: 'currency',
        currency: 'IDR'
    });
}
 
export default formatPrice;