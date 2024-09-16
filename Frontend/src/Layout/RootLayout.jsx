import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {

  return (
      <section className="bg-slate-50 text-slate-300">
        <Navbar />
        <section className="w-full">
          <Outlet />
        </section>
      </section>
  );
}

export default RootLayout;
