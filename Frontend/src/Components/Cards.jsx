import React, { useState, useEffect, useCallback } from "react";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { DecodeToken, getToken } from "../utils/DecodedToken";
function Cards({ products }) {
  const [filterProducts, setFilterProducts] = useState({
    category: "not selected",
    rating: "not selected",
    price: "not selected",
  });
  const [filteredData, setFilteredData] = useState(products);
  const { isDialogOpen, setIsDialogOpen, cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const addToCart = useCallback(async (e, product) => {
    e.stopPropagation();
    const userId = DecodeToken();
    const token = getToken();

    try {
      const response = await fetch(
        `${process.env.API_URL}/cart/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const filteredData = products.filter((product) => {
      return (
        (filterProducts.category === "not selected" ||
          product.category.toLowerCase() === filterProducts.category) &&
        (filterProducts.price === "not selected" ||
          Math.floor(product.price * 70) <= parseInt(filterProducts.price)) &&
        (filterProducts.rating === "not selected" ||
          product.rating >= parseFloat(filterProducts.rating))
      );
    });
    setFilteredData(filteredData);
  }, [filterProducts, products]);

  return (
    <>
      {filteredData.length > 0
        ? filteredData.map((product, idx) => (
            <div
              onClick={() => navigate(`/product_details/${product._id}`)}
              key={product._id}
              className="border hover:cursor-pointer max-h-72 flex flex-col w-48 overflow-hidden rounded-md shadow-lg shadow-black/20 relative "
            >
              <div className="hover:scale-105 ease-in duration-200 hover:shadow-black/40 bg-slate-300 h-3/4 min-h-[190px]">
                <img
                  loading="lazy"
                  src={product.images[0] || product.images[idx]}
                  className="w-full object-fit h-4/3"
                  alt="product"
                />
              </div>
              <div className="text-slate-950 bg-slate-100 h-full py-2 px-1">
                <p className="text-sm font-medium truncate">{product.title}</p>

                <div className="flex gap-6 mt-1">
                  <p className="flex ml-2  items-center font-medium">
                    <FaRupeeSign />
                    {Math.floor(product.price * 70)}
                  </p>
                  <p className="flex gap-1 rounded-md border px-1 bg-green-600 items-center font-medium text-white">
                    {product.rating?.toString().slice(0, 3)}

                    <FaStar className="fill-white" />
                  </p>
                </div>
                <button
                  onClick={(e) => addToCart(e, product)}
                  className="px-2 py-1 bg-orange-400 text-white mx-auto  rounded text-sm hover:bg-orange-500 shadow-sm shadow-black/60 hover:shadow-none ease-out duration-300 mt-1"
                >
                  Add Cart
                </button>
              </div>
            </div>
          ))
        : "No products found"}
    </>
  );
}

export default Cards;
