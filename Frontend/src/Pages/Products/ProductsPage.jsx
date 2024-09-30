import { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import Cards from "../../Components/Cards";
import ProductFilter from "../../Components/ProductFilter";
import { getToken, DecodeToken } from "../../utils/DecodedToken";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [onClose, setOnClose] = useState(false);
  useEffect(() => {
    fetchProductsAndWishlist();
  }, []);

  const fetchProductsAndWishlist = async () => {
    try {
      const token = getToken();
      const userId = DecodeToken();

      const productsRes = await fetch(`${process.env.API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const productsData = await productsRes.json();
      const allProducts = productsData.data.products;
      if (userId) {
        const wishlistRes = await fetch(
          `${process.env.API_URL}/user/${userId}/wishlist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const wishlistData = await wishlistRes.json();
        const wishlistProducts = wishlistData.data.map((item) => item._id);

        const updatedProducts = allProducts.map((product) => ({
          ...product,
          isInWishlist: wishlistProducts.includes(product._id),
        }));

        setProducts(updatedProducts);
      } else {
        setProducts(allProducts);
      }
    } catch (err) {
      console.log("Error fetching products or wishlist:", err);
    }
  };
  return (
    <section className="bg-slate-200 ">
      <Banner />
      <section className="p-2">
        {/* <ProductFilter /> */}
        <div className="flex gap-5 mx-8 flex-wrap ">
          <Cards products={products} setProducts={setProducts} />
        </div>
      </section>
    </section>
  );
}

export default ProductsPage;
