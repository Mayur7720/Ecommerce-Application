import { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import Cards from "../../Components/Cards";
import ProductFilter from "../../Components/ProductFilter";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProducts(data.data.product);
    } catch (err) {
      console.log("GET is ", err);
    }
  };
  return (
    <section className="bg-slate-200 h-full">
      <Banner />
      <section className="p-4">
        <ProductFilter />
        <div className="flex gap-5 mx-8 flex-wrap bg-black">
          <Cards products={products} />
        </div>
      </section>
    </section>
  );
}

export default ProductsPage;
