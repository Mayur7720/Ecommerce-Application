import { useState, useEffect } from "react";
import Banner from "../Components/Banner";
import Cards from "../Components/Cards";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/products", {
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
      <Cards products={products} />
    </section>
  );
}

export default ProductsPage;
