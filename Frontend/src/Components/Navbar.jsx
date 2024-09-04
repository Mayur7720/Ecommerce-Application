import { useContext, useEffect, useState } from "react";
import { FaShoppingBag } from "@react-icons/all-files/fa/FaShoppingBag";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";

import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

function Navbar() {
  const { setIsDialogOpen } = useCart();

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const openModal = () => {
    navigate("/cart")
    // setIsDialogOpen(true);
  };

  return (
    <>
      <header className=" bg-white flex justify-around">
        <div className="bg-amber-400 my-1 px-2 py-1  font-bold text-lg text-amber-100 italic border-2 border-amber-400 text-center rounded-lg">
          <FaShoppingBag className="mx-auto w-10 h-5 fill-white" />
          Appla Bazar
        </div>
        <input
          type="text"
          placeholder="Search for product"
          className=" my-3 px-4 w-2/5 border rounded-lg text-slate-700 bg-blue-50 outline-none ring-transparent focus:ring-1  focus:border-transparent focus:ring-blue-200 "
        />
        <div className="flex justify-evenly w-80 font-medium text-slate-600">
          {/* <button
            onClick={handleLoginClick}
            className="bg-slate-50 hover:bg-blue-100 hover:border-transparent  my-2 px-4 flex gap-1 justify-around items-center  rounded border"
          >
            Login <FaUser />
          </button> */}
          <button
            onClick={handleLogoutClick}
            className="bg-slate-50 hover:bg-blue-100 hover:border-transparent  my-2 px-4 flex gap-1 justify-around items-center  rounded border"
          >
            Logout <FaSignOutAlt />
          </button>
          <button
            onClick={openModal}
            className="bg-slate-50  hover:bg-blue-100 hover:border-transparent my-2 px-4 flex gap-1 justify-around items-center  rounded border"
          >
            Cart <FaShoppingCart />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-slate-50 rounded-full hover:bg-blue-100 hover:border-transparent my-2 px-4 flex gap-1 justify-around items-center border "
          >
            <FaUser />
          </button>
        </div>
      </header>
    </>
  );
}
export default Navbar;
