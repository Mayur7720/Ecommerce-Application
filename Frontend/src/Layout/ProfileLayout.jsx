import React from "react";
import ProfileSidebar from "../Components/ProfileSidebar";
import { Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <section className="">
      <div className="grid grid-flow-col grid-cols-12 ">
        <ProfileSidebar />
        <div className="col-span-12 border p-2 bg-slate-100">
         <Outlet/>
        </div>
      </div>
    </section>
  );
}

export default ProfileLayout;
