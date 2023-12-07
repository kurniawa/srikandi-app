import { useRouter } from 'next/router';

const ProductDetailPage = () => {
  const router = useRouter();
  //   console.log(router);
  //   console.log(router.query.id);
  return (
    <>
      <h1>Product Detail {router.query.id}</h1>
    </>
  );
};

export default ProductDetailPage;
