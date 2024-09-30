import React from "react";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";

const NotFound = () => {
  return (
    <div className="bg-[url(https://mauwebsite.vn/wp-content/uploads/2021/10/loi-404.png)] bg-no-repeat bg-center bg-cover h-screen">
      <Link
        to={pathDefault.homePage}
        className="text-lg text-blue-600 inline-block p-5 hover:underline duration-300"
      >
        <i className="fa-regular fa-arrow-left"></i> Back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
