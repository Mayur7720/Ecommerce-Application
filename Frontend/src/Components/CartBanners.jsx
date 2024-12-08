import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../Api/axiosApi";
import ErrorMsg from "../Components/ErrorMsg";

function CartBanners() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", color: "" });
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    try {
      const response = await axiosApi.get(`/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      console.log(data.cart);
      setTotal(data?.cart?.total);
      setCart(data?.cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response.status == 401) {
        setAlert({
          show: true,
          message: `please login`,
          color: "bg-green-200",
        });
      }
      setAlert({
        show: true,
        message: `unable to load cart`,
        color: "bg-green-200",
      });
      // setError("Unable to load cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (productId) => {
    try {
      const response = await axiosApi.delete(
        `$/cart/product/${productId}/delete`,
        {
          withCredentials: true,
        }
      );

      setAlert({
        show: true,
        message: `product removed from cart`,
        color: "bg-green-200",
      });
      fetchCart();
    } catch (err) {
      if (err.response.status == 401) {
        setAlert({
          show: true,
          message: `please login`,
          color: "bg-amber-200",
        });
      } else if (err.response.status == 202) {
        setAlert({
          show: true,
          message: `product enable removed from cart`,
          color: "bg-amber-200",
        });
      }
      setAlert({
        show: true,
        message: `server error`,
        color: "bg-red-200",
      });
    }
  };
  const handleIncrement = async (e, productId) => {
    try {
      const response = await axiosApi.patch(
        `/cart/product/${productId}/increment`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // if (!response.ok) {
      //   if (response.status === 404) {
      //     console.log("Product not found in cart.");
      //     return;
      //   }
      //   throw new Error(`Error: ${response.status}`);
      // }

      const data = await response.data;
      console.log("Product quantity incremented:", data);
      fetchCart();
    } catch (err) {
      console.log("Error incrementing product quantity:", err);
    }
  };

  const handleDecrement = async (e, productId) => {
    try {
      const response = await axiosApi.patch(
        `${process.env.API_URL}/cart/product/${productId}/decrement`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // if (!response.ok) {
      //   if (response.status === 404) {
      //     console.log("Product not found in cart.");
      //     return;
      //   }
      //   throw new Error(`Error: ${response.status}`);
      // }

      const data = await response.data;
      console.log("Product quantity decremented:", data);
      fetchCart();
    } catch (err) {
      console.log("Error decrementing product quantity:", err);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      {alert.show && (
        <ErrorMsg
          message={alert.message}
          color={alert.color}
          onClose={handleCloseAlert}
        />
      )}
      <section className="text-slate-950 py-2 ">
        <button
          onClick={() => navigate(-1)}
          className="bg-amber-500 hover:bg-blue-500 transition duration-400  text-white px-1 md:px-4 py-1 md:py-3 tracking-wide rounded font-semibold shadow-md shadow-black/20 mt-4 float-start flex items-center gap-1 md:gap-2"
        >
          <FaArrowLeft />
          Back
        </button>
        <h4 className="text-xl md:text-3xl text-center mt-4 mb-8 font-bold md:font-extrabold">
          Your Products
        </h4>
        <article className="overflow-hidden">
          {cart.length > 0 ? (
            <>
              <table className="w-full md:mx-auto md:w-2/3 ">
                <thead className="border border-1 border-slate-300 border-l-0 border-r-0">
                  <tr>
                    <th className="text-left  text-xs md:text-lg">Item</th>
                    <th className="text-left  text-xs md:text-lg">Price</th>
                    <th className="text-left "></th>
                    <th className="p-2 text-xs md:text-lg">Quantity</th>
                    <th className="text-left "></th>
                    <th className="p-2  text-xs md:text-lg">Total</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody className="border border-1 border-slate-300 border-l-0 border-r-0 border-t-0">
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td className="border-b-2 max-w-56 py-1 md:p-2">
                        <div className="flex items-center font-semibold gap-2">
                          <div className="max-w-8 max-h-8 md:max-w-24 md:max-h-24 overflow-hidden rounded">
                            <img
                              loading="lazy"
                              src={item.image}
                              alt="product image"
                            />
                          </div>
                          <p className="text-xs md:text-base truncate w-20 md:w-full md:max-w-62 text-left">
                            {item.title}
                          </p>
                        </div>
                      </td>
                      <td className="text-xs md:text-lg border-b-2 max-w-6 truncate ">
                        {item.price}
                      </td>
                      <td className="border-b-2 md:px-2"></td>
                      <td className="border-b-2 max-w-6">
                        <div className="flex w-full justify-between items-center">
                          <button
                            onClick={(e) => {
                              handleIncrement(e, item.product);
                            }}
                            className="hover:bg-amber-400 border-none shadow-md shadow-black/20 bg-amber-500 rounded-full md:p-1 border-black"
                          >
                            <FaPlus
                              fill="black"
                              className="p-[0.2rem] md:p-0"
                            />
                          </button>
                          <div className="text-xs md:text-base">
                            {item.quantity}
                          </div>
                          <button
                            onClick={(e) => {
                              handleDecrement(e, item.product);
                            }}
                            className="hover:bg-amber-400 border-none shadow-md shadow-black/20 bg-amber-500 rounded-full md:p-1 border-black"
                          >
                            <FaMinus
                              fill="black"
                              className="p-[0.2rem] md:p-0"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="border-b-2 md:px-2"></td>
                      <td className="border-b-2 max-w-20">
                        <div className=" text-xs md:text-base px-2 flex gap-2 justify-center">
                          <p>{item.totalPrice}</p>
                        </div>
                      </td>
                      <td className="border-b-2  max-w-20">
                        <div className=" px-2 flex gap-2 justify-between items-center">
                          <button
                            onClick={() => handleDelete(item.product)}
                            className=" p-1 md:px-2 md:py-2 bg-red-600 hover:bg-red-500  rounded shadow-md shadow-black/40"
                          >
                            <FaTrash
                              className="w-4 p-[0.1rem] md:p-0"
                              fill="white"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <article className=" mx-auto   md:w-2/4 ">
                <div className=" w-1/2  float-right flex items-center justify-between mt-4 ">
                  <p className="font-bold text-xs md:text-xl text-slate-900 ">
                    Grand Total
                  </p>
                  <span
                    className="
                font-semibold text-xl"
                  >
                    =
                  </span>
                  <p className="text-xs md:text-base font-semibold">{total}</p>
                </div>
              </article>
            </>
          ) : (
            <div className="text-center">No items in cart</div>
          )}
        </article>
      </section>
    </>
  );
}

export default CartBanners;
