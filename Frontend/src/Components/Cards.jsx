import React, { useCallback, useState } from "react";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { DecodeToken, getToken } from "../utils/DecodedToken";
import ErrorMsg from "../Components/ErrorMsg";
function Cards({ products, setProducts }) {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });
  const { setCartItems } = useCart();
  const navigate = useNavigate();

  const addToCart = useCallback(
    async (e, productId) => {
      e.stopPropagation();
      const userId = DecodeToken();
      const token = getToken();

      try {
        const response = await fetch(
          `${process.env.API_URL}/cart/${productId}`,
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
        console.log(data)
        setAlert({ show: true, message: `${data.message}`, color: "bg-green-200" });
      } catch (err) {
        console.log(err);
      }
    },
    [setCartItems]
  );

  const handleLike = useCallback(async (e, productId) => {
    e.stopPropagation();
    const userId = DecodeToken();
    const token = getToken();
    try {
      const response = await fetch(
        `${process.env.API_URL}/user/${userId}/product/${productId}/wishlist`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAlert({ show: true, message: `${data.message}`, color: "bg-green-200" });
      setProducts((prevState) => {
        return prevState.map((product) =>
          product._id === productId
            ? { ...product, isInWishlist: !product.isInWishlist }
            : product
        );
      });
      setCartItems((prevItems) => [...prevItems, productId]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", color: "" });
  };
  return (
    <>
      {alert.show && (
        <ErrorMsg
          message={alert.message}
          color={alert.color}
          onClose={handleCloseAlert}
        />
      )}
      {products.length > 0
        ? products.map((product, idx) => (
            <div
              onClick={() => navigate(`/product_details/${product._id}`)}
              key={product._id}
              className=" border hover:cursor-pointer max-h-72 flex flex-col w-48 overflow-hidden rounded-md shadow-lg shadow-black/20 relative"
            >
              <div className="hover:shadow-black/40 bg-slate-300 max-h-[190px] min-h-[190px]">
                <img
                  loading="lazy"
                  src={product.images[0] || product.images[idx]}
                  className="hover:scale-105 ease-in duration-200 w-full object-fit h-4/3"
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
                  <p className="w-10 h-5">
                    <FaHeart
                      onClick={(e) => handleLike(e, product._id)}
                      className={`stroke-black w-full h-full hover:fill-red-500 hover:stroke-none`}
                      style={{
                        strokeWidth: product?.isInWishlist ? " " : "3rem",
                        color: product?.isInWishlist ? "#ef4444" : "#f8fafc",
                      }}
                    />
                  </p>
                </div>
                <button
                  onClick={(e) => addToCart(e, product._id)}
                  className="px-2 py-1 bg-orange-400 text-white mx-auto rounded text-sm hover:bg-orange-500 shadow-sm shadow-black/60 hover:shadow-none ease-out duration-300 mt-1"
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
