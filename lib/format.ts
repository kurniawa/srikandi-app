export const formatPrice = (price:number) => {
    return ( price / 100 ).toLocaleString("id-ID", {
        style: 'currency',
        currency: 'IDR'
    });
}

export const formatPriceNormal = (price:number) => {
    return price.toLocaleString("id-ID", {
        style: 'currency',
        currency: 'IDR'
    });
}
 
// export default formatPrice;