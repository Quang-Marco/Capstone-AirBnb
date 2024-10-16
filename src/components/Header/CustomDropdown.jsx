import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  items,
  classWrapper = "",
  classContent = "",
  children,
}) => {
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
      className={`relative py-2 sm:py-4 hover:rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 duration-300 ${classWrapper}`}
      ref={dropdownRef}
    >
      <div className="cursor-pointer" onClick={toggleDropdown}>
        {children}
      </div>
      {isOpen && (
        <div
          className={`absolute mt-6 w-80 bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-lg z-10 ${classContent}`}
        >
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
