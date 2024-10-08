import React from "react";

const Container = ({ children, backgroundImage = "", sectionName = "" }) => {
  return (
    <div
      className={`container ${sectionName} max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-2 dark:bg-gray-900`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};
export default Container;
