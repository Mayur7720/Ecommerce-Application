import { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import Cards from "../../Components/Cards";
import { getToken, DecodeToken } from "../../utils/DecodedToken";
import axiosApi from "../../Api/axiosApi";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [onClose, setOnClose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchProductsAndWishlist();
  }, []);

  const fetchProductsAndWishlist = async () => {
    try {
      setIsLoading(true);
      const productsRes = await axiosApi.get(`/products`, {
        withCredentials: true,
      });

      const allProducts = productsRes.data.data.products;
      setIsLoading(false);
      console.log(allProducts);
      setProducts(allProducts);
    } catch (err) {
      console.log("Error fetching products or wishlist:", err);
    }
  };
  // const fetchProductsAndWishlist = async () => {
  //   try {

  //     setIsLoading(true);
  //     const productsRes = await axiosApi.get(`/products`, {
  //       withCredentials: true,
  //     });

  //     const allProducts = productsRes.data.data.products;
  //     setIsLoading(false);

  //     if (userId) {
  //       setIsLoading(true);
  //       const wishlistRes = await axiosApi.get(`/user/${userId}/wishlist`, {
  //         withCredentials: true,
  //       });
  //       const wishlistProducts = wishlistRes.data.data.map((item) => item._id);

  //       setIsLoading(false);

  //       const updatedProducts = allProducts.map((product) => ({
  //         ...product,
  //         isInWishlist: wishlistProducts.includes(product._id),
  //       }));

  //       setProducts(updatedProducts);
  //     } else {
  //       setProducts(allProducts);
  //     }
  //   } catch (err) {
  //     console.log("Error fetching products or wishlist:", err);
  //   }
  // };
  return (
    <section className="bg-slate-200 ">
      <Banner />
      <section className="p-4 overflow-hidden ">
        {/* <ProductFilter /> */}
        {isLoading && (
          <h3 className=" text-slate-950 font-semibold text-xl text-center">
            Loading...
          </h3>
        )}
        <div className="px-8 w-full max-w-screen-xl mx-auto flex justify-start items-start gap-10 flex-wrap ">
          <Cards products={products} setProducts={setProducts} />
        </div>
      </section>
    </section>
  );
}

export default ProductsPage;
