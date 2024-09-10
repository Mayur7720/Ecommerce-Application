import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DecodeToken } from "../utils/DecodedToken";

function CartBanners() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    console.log("ok")
    try {
      const userId = DecodeToken();
      const response = await fetch(`${process.env.API_URL}/cart/${userId}`);

      const data = await response.json();
      console.log(data);
      setCart(data?.cart?.items || []); // Ensure cart is at least an empty array
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Unable to load cart items. Please try again later.");
    } finally {
      setLoading(false); // End loading regardless of success or error
    }
  };
  const handleDelete = async ( productId) => {
    try {
      const userId = DecodeToken();
      console.log(productId)
      const response = await fetch(
        `${process.env.API_URL}/cart/${userId}/product/${productId}/delete`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.log("Product not found in cart.");
          return;
        }
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product remove from cart:", data);
      fetchCart()
    } catch (err) {
      console.log("Error removing product from cart:", err);
    }
  };
  const handleIncrement = async (e, productId) => {
    try {
      const userId = DecodeToken();
      const response = await fetch(
        `${process.env.API_URL}/cart/${userId}/product/${productId}/increment`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.log("Product not found in cart.");
          return;
        }
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product quantity incremented:", data);
      fetchCart()
    } catch (err) {
      console.log("Error incrementing product quantity:", err);
    }
  };

  const handleDecrement = async (e, productId) => {
    try {
      const userId = DecodeToken();
      const response = await fetch(
        `${process.env.API_URL}/cart/${userId}/product/${productId}/decrement`,
        {
          method: "PATCH", // Assuming PATCH or POST method for decrement
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.log("Product not found in cart.");
          return;
        }
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product quantity decremented:", data);
      fetchCart();
    } catch (err) {
      console.log("Error decrementing product quantity:", err);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Show loading spinner
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error message
  }

  return (
    <section className="text-slate-950 py-2">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-amber-500 hover:bg-blue-500 transition duration-400  text-white px-4 py-3 tracking-wide rounded font-semibold shadow-md shadow-black/20 mt-4 float-start flex items-center gap-2"
      >
        <FaArrowLeft />
        Back
      </button>
      <h4 className="text-3xl text-center mt-4 mb-8 font-extrabold">
        Your Products
      </h4>

      <article className="">
        {cart.length > 0 ? (
          <table className="mx-auto w-2/3">
            <thead className="border border-1 border-slate-300 border-l-0 border-r-0">
              <tr>
                <th className="text-left ">Item</th>
                <th className="text-left ">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2 text-right">Total</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody className="border border-1 border-slate-300 border-l-0 border-r-0 border-t-0">
              {cart.map((item) => (
                <tr key={item._id}>
                  <td className="border-b-2  max-w-56 p-2">
                    <div className="flex items-center font-semibold gap-2">
                      <div className="max-w-24 max-h-24 overflow-hidden rounded">
                        <img
                          className="w-24 h-24"
                          src={item.image}
                          alt="product image"
                        />
                      </div>
                      <p className="truncate max-w-62 text-left ">
                        {item.title}
                      </p>
                    </div>
                  </td>
                  <td className="border-b-2 max-w-6 truncate ">{item.price}</td>
                  <td className="border-b-2 max-w-6">
                    <div className="flex w-full justify-between items-center">
                      <button
                        onClick={(e) => {
                          handleIncrement(e, item.product);
                        }}
                        className="hover:bg-amber-400 border-none shadow-md shadow-black/20 bg-amber-500 rounded-full p-1 border-black"
                      >
                        <FaPlus fill="black" />
                      </button>
                      <div>{item.quantity}</div>
                      <button
                        onClick={(e) => {
                          handleDecrement(e, item.product);
                        }}
                        className="hover:bg-amber-400 border-none shadow-md shadow-black/20 bg-amber-500 rounded-full p-1 border-black"
                      >
                        <FaMinus fill="black" />
                      </button>
                    </div>
                  </td>
                  <td className="border-b-2 max-w-20">
                    <div className=" px-2 flex gap-2 justify-center">
                      <p>{item.totalPrice}</p>
                    </div>
                  </td>
                  <td className="border-b-2  max-w-20">
                    <div className=" px-2 flex gap-2 justify-between items-center">
                      <button onClick={()=>handleDelete(item.product)} className=" px-2 py-2 bg-red-600 hover:bg-red-500  rounded shadow-md shadow-black/40">
                        <FaTrash fill="white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No items in cart</div>
        )}
      </article>
    </section>
  );
}

export default CartBanners;
