import React, { useCallback, useState } from "react";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../Components/ErrorMsg";
import axiosApi from "../Api/axiosApi";


function Cards({ products, setProducts }) {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });
  const { setCartItems } = useCart();
  const navigate = useNavigate();

  const addToCart = useCallback(
    async (e, productId) => {
      e.stopPropagation();
      try {
        const response = await axiosApi.post(
          `${process.env.API_URL}/cart/${productId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        
        const data = response.data;
        setAlert({
          show: true,
          message: `${data.message}`,
          color: "bg-green-200",
        });

      } catch (err) {
        if (err.response.status == 401) {
          setAlert({
            show: true,
            message: `please Login `,
            color: "bg-amber-200",
          });
        } else {
          setAlert({
            show: true,
            message: `server error`,
            color: "bg-green-200",
          });
        }
      }
    },
    [setCartItems]
  );
  const handleLike = useCallback(
    async (e, productId) => {
      e.stopPropagation();
      try {
        const response = await axiosApi.patch(
          `/user/product/${productId}/wishlist`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = await response.data;
        setAlert({
          show: true,
          message: `${data.message}`,
          color: "bg-green-200",
        });
        setProducts((prevState) => {
          return prevState.map((product) =>
            product._id === productId
              ? { ...product, isInWishlist: !product.isInWishlist }
              : product
          );
        });
        setCartItems((prevItems) => [...prevItems, productId]);
      } catch (err) {
        console.log(err);
      }
    },
    [setProducts]
  );

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
      {products?.length > 0
        ? products.map((product, idx) => (
            <div
              onClick={() => navigate(`/product_details/${product._id}`)}
              key={product._id}
              className="z-10 border hover:cursor-pointer max-h-40 w-28 md:max-h-80 flex flex-col md:w-52 overflow-hidden rounded-md shadow-lg shadow-black/20 relative"
            >
              <div className=" overflow-hidden hover:shadow-black/40 bg-slate-300 max-h-[95px]  min-h-[95px] md:max-h-[190px] md:min-h-[190px]">
                <img
                  loading="lazy"
                  src={product.images[0] || product.images[idx]}
                  className=" hover:scale-105 transition-transform duration-300 ease-in-out w-full h-full "
                  alt="product"
                />
              </div>
              <div className="text-slate-950 bg-slate-100 h-full  md:py-2 px-1 min-h-[80px]">
                <p className="text-xs md:text-sm font-normal md:font-medium truncate">
                  {product.title}
                </p>
                <div className="flex justify-between mt-0.5 md:mt-1">
                  <p className=" text-xs md:text-lg flex items-center font-normal md:font-medium">
                    <FaRupeeSign className="w-1  md:w-auto md:h-auto" />
                    {Math.floor(product.price * 70)}
                  </p>
                  <p className=" px-1 md:h-auto md:w-auto flex items-center gap-0.5 rounded-md border md:px-1 bg-green-600 font-normal md:font-medium text-white">
                    <span className="block text-xs md:text-lg">
                      {product.rating?.toString().slice(0, 3)}
                    </span>
                    <FaStar className=" w-fit h-3 md:h-auto fill-white" />
                  </p>
                  <p className="w-6 h-4 md:mt-1 md:w-10 md:h-5">
                    <FaHeart
                      // size={1}
                      onClick={(e) => handleLike(e, product._id)}
                      className={` stroke-black  w-full h-full hover:scale-110 transition ease-out duration-200`}
                      style={{
                        strokeWidth: product?.isInWishlist ? "0" : "3rem",
                        color: product?.isInWishlist ? "#ef4444" : "#f8fafc",
                      }}
                    />
                  </p>
                </div>
                <button
                  onClick={(e) => addToCart(e, product._id)}
                  className="px-1 py-[0.2rem] md:px-3 md:py-2 bg-orange-400 text-white rounded text-xs md:text-sm hover:bg-orange-500 shadow-md hover:shadow-lg transition ease-out duration-300 md:mt-2"
                >
                  Add Cart
                </button>
              </div>
            </div>
          ))
        : " "}
    </>
  );
}

export default Cards;
