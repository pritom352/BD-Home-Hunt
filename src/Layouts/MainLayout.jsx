import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className=" bg-accent ">
      <Navbar></Navbar>
      <div className=" max-w-10/11 md:max-w-9/11 lg:max-w-8/10 mx-auto min-h-[359px]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
