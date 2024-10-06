import React from "react";
import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

const UserTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop
        className="hover:bg-green-500 duration-300 flex items-center justify-center"
        width="16"
        height="16"
        smooth
      />
    </>
  );
};

export default UserTemplate;
