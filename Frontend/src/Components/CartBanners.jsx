import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import React from "react";
import { useNavigate } from "react-router-dom";

function CartBanners() {
  const navigate = useNavigate();
  return (
    <section className="text-slate-950 py-2">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-amber-500 hover:bg-blue-500 transition duration-400  text-white px-2 py-1 rounded font-semibold shadow-md shadow-black/20 mt-4"
      >
        Back
      </button>
      <h4 className="text-3xl text-center mb-3  font-extrabold">
        Your Products
      </h4>

      <article className="">
        <table className="mx-auto w-2/3">
          <thead className="border border-1 border-slate-300 border-l-0 border-r-0">
            <tr>
              <th className="text-left p-2">Item</th>
              <th className="text-left p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody className="border border-1 border-slate-300 border-l-0 border-r-0 border-t-0">
            <tr>
              <td className="p-2 max-w-56 ">
                <div className="flex items-center font-semibold gap-3">
                  <div className="max-w-24 max-h-24 overflow-hidden rounded">
                    <img
                      className="w-24 h-24"
                      src="https://i.imgur.com/axsyGpD.jpeg"
                      alt="product image"
                    />
                  </div>
                  <p className="truncate max-w-62 text-left ">
                    Modern Minimalist Workstation Setup
                  </p>
                </div>
              </td>
              <td className="text-left  max-w-6 truncate">5000000</td>
              <td className="  max-w-6">
                <div className="flex w-full justify-between items-center">
                  <button className="hover:bg-amber-400 border-none shadow-md shadow-black/20 bg-amber-500 rounded-full p-1 border-black">
                    <FaPlus fill="black" />
                  </button>
                  <div>3000000</div>
                  <button className="hover:bg-amber-400 border-none shadow-md shadow-black/20 bg-amber-500 rounded-full p-1 border-black">
                    <FaMinus fill="black" />
                  </button>
                </div>
              </td>
              <td className=" max-w-20">
                <div className=" px-2 flex gap-2 justify-between items-center jus  ">
                  <p>40000000000</p>
                  <button className=" px-2 py-2 bg-red-600 hover:bg-red-500  rounded shadow-md shadow-black/40">
                    <FaTrash fill="white" />
                  </button>
                </div>
              </td>
            </tr>
            <hr />
          </tbody>
        </table>
      </article>
    </section>
  );
}

export default CartBanners;
