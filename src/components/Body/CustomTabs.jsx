import React, { useState } from "react";

const CustomTabs = ({ listNavbar, listCategories }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <div className="tabs bg-white flex gap-5 py-4 shadow-md sticky top-24 z-10">
        {listNavbar.slice(0, 18).map((item, index) => (
          <button
            key={index + 1}
            className={`tab-item flex flex-col justify-center items-center border-b-2 opacity-70 hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer ${
              activeTab === index + 1 ? "border-black" : ""
            }`}
            onClick={() => setActiveTab(index + 1)}
          >
            <img className="mb-2 w-6" src={item.imgURL} alt={item.name} />
            <p className="text-black text-xs whitespace-nowrap">{item.name}</p>
          </button>
        ))}
      </div>

      <div className="tab-content pt-5 lg:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {listCategories
            .filter((category) => category.maViTri === activeTab)
            .map((category) => (
              <div key={category.id} className="cursor-pointer">
                <img
                  className="rounded-lg h-64 sm:h-56 lg:h-52 w-full mb-5"
                  src={category.hinhAnh}
                  alt={category.tenPhong}
                />
                <h3 className="font-semibold text-base">{category.tenPhong}</h3>
                <p>
                  <span className="font-semibold">${category.giaTien}</span>{" "}
                  night
                </p>
              </div>
            ))}
          {listCategories.filter((category) => category.maViTri === activeTab)
            .length === 0 && (
            <p className="col-span-4 text-center text-gray-500 h-72 flex items-center justify-center">
              No rooms available for this tab.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomTabs;
