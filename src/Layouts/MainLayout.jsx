import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className=" bg-accent ">
      <Navbar></Navbar>
      <div className=" max-w-14/15 md:max-w-10/11 lg:max-w-9/10 mx-auto">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
