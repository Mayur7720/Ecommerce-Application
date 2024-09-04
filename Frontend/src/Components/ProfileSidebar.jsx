import React from "react";
import { NavLink } from "react-router-dom";
function ProfileSidebar() {
  let active =
    " border bg-slate-50/10 mb-1 py-3 font-semibold pl-3 cursor-pointer hover:bg-slate-50/10  border-r-4 border-r-orange-400 border-l-0 border-t-0 border-b-0";
  let notActive =
    " border border-l-0 border-t-0 border-b-0 mb-1 py-3 font-semibold pl-3 cursor-pointer hover:bg-slate-50/10  border-transparent";
  return (
    <div className=" pt-3 col-span-2 flex flex-col gap-4 bg-slate-800 h-screen list-none text-white">
      <NavLink
        to="info"
        className={({ isActive }) => (isActive ? active : notActive)}
      >
        Info
      </NavLink>
      <NavLink
        to={"wishlist"}
        className={({ isActive }) => (isActive ? active : notActive)}
      >
        Wishlist
      </NavLink>

      <NavLink
        to={"your_order"}
        className={({ isActive }) => (isActive ? active : notActive)}
      >
        Your Order
      </NavLink>

      <NavLink
        to={"/dashboard"}
        className={({ isActive }) => (isActive ? active : notActive)}
      >
        Back
      </NavLink>

      {/* <li
            to={"/back"}
            className={(isActive) => {
              isActive
                ? "active
                : notActive
            }}
          >
            Back
          </li> */}
    </div>
  );
}

export default ProfileSidebar;
