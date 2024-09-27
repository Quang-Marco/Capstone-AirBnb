import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ items, children, classCustom = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative py-4 hover:rounded-full hover:bg-gray-100 duration-300 ${classCustom}`}
      ref={dropdownRef}
    >
      <div className="cursor-pointer" onClick={toggleDropdown}>
        {children}
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-6 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {items.map((item, index) => (
            <div key={index} className="p-2">
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;