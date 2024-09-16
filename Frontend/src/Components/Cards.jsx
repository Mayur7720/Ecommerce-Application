import React, { useState, useEffect, useCallback } from "react";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
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

  const addToCart = useCallback(async (e, productId) => {
    e.stopPropagation();
    const userId = DecodeToken();
    const token = getToken();

    try {
      const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleLike = useCallback(async (e, productId) => {
    e.stopPropagation();
    const userId = DecodeToken();
    const token = getToken();

    try {
      const response = await fetch(
        `${process.env.API_URL}/cart/${productId}/wishlist`,
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
              <div className=" hover:shadow-black/40 bg-slate-300  max-h-[190px] min-h-[190px]">
                <img
                  loading="lazy"
                  src={product.images[0] || product.images[idx]}
                  className="hover:scale-105 ease-in duration-200 w-full  object-fit h-4/3"
                  alt="product"
                />
              </div>
              <div className="text-slate-950 bg-slate-100 h-full py-2 px-1">
                <p className="text-sm font-medium truncate">{product.title}</p>

                <div className="flex justify-between mt-1">
                  <p className="flex items-center font-medium">
                    <FaRupeeSign />
                    {Math.floor(product.price * 70)}
                  </p>
                  <p className="flex gap-1 rounded-md border px-1 bg-green-600 items-center font-medium text-white">
                    {product.rating?.toString().slice(0, 3)}

                    <FaStar className="fill-white" />
                  </p>
                  <p className=" w-10 h-5">
                    <FaHeart
                      onClick={(e) => handleLike(e, product._id)}
                      className={`stroke-black w-full h-full fill-slate-100 hover:fill-red-500 hover:stroke-none`}
                      style={{ strokeWidth: "3rem" }}
                    />
                  </p>
                </div>
                <button
                  onClick={(e) => addToCart(e, product._id)}
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
