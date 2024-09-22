import React from "react";
import ProfileSidebar from "../Components/ProfileSidebar";
import { Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <section className="h-screen ">
      <div className="h-full grid grid-flow-col grid-cols-12 ">
        <ProfileSidebar />
        <div className="h-full col-span-12 border p-2 bg-slate-100">
         <Outlet/>
        </div>
      </div>
    </section>
  );
}

export default ProfileLayout;
