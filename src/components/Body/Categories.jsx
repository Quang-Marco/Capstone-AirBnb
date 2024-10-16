import { useEffect, useRef, useState } from "react";
import Container from "../Container";
import { phongThueService } from "../../services/phongThue.service";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { listTabs } from "./ListTabs";

const Categories = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [listCategories, setListCategories] = useState([]);
  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    checkScrollPosition();

    const tabs = tabsRef.current;
    tabs.addEventListener("scroll", checkScrollPosition);

    return () => tabs.removeEventListener("scroll", checkScrollPosition);
  }, []);

  useEffect(() => {
    phongThueService
      .getRooms()
      .then((res) => {
        setListCategories(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 pt-5 pb-2 sticky top-[62px] sm:top-[76px] lg:top-[90px] z-[1]">
        <Container>
          <div
            ref={tabsRef}
            className="tabs-headers flex gap-10 overflow-x-auto"
          >
            {listTabs.map((item, index) => (
              <button
                type="button"
                key={index + 1}
                className={`tab-item flex flex-col justify-center items-center pb-2 border-b-[3px] opacity-70 hover:opacity-100 focus:opacity-100 duration-300 ${
                  activeTab === index + 1
                    ? "border-black dark:border-white"
                    : ""
                }`}
                onClick={() => {
                  setActiveTab(index + 1);
                  window.scrollTo({
                    top: 700,
                    behavior: "smooth",
                  });
                }}
              >
                <img
                  className="mb-2 w-6 dark:invert"
                  src={item.imgURL}
                  alt={item.name}
                />
                <p className="text-black dark:text-white text-xs whitespace-nowrap">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </Container>
        <button
          onClick={() => {
            tabsRef.current.scrollBy({ left: -500, behavior: "smooth" });
          }}
          disabled={!canScrollLeft}
          className="absolute left-16 top-7 hidden sm:inline-block"
        >
          <i
            className={`fa-light fa-chevron-left dark:text-white text-lg w-9 h-9 leading-9 border rounded-full duration-300 ${
              !canScrollLeft ? "sm:hidden" : "hover:shadow-lg hover:scale-110"
            }`}
          ></i>
        </button>
        <button
          onClick={() => {
            tabsRef.current.scrollBy({ left: 500, behavior: "smooth" });
          }}
          disabled={!canScrollRight}
          className="absolute right-16 top-7 hidden sm:inline-block"
        >
          <i
            className={`fa-light fa-chevron-right dark:text-white text-lg w-9 h-9 leading-9 border rounded-full duration-300 ${
              !canScrollRight ? "sm:hidden" : "hover:shadow-lg hover:scale-110"
            }`}
          ></i>
        </button>
      </div>

      <Container>
        <div className="tab-content py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            {listCategories
              .filter((category) => category.maViTri === activeTab)
              .map((category) => (
                <Link
                  to={`${pathDefault.roomDetail}?id=${category.id}`}
                  key={category.id}
                  className="cursor-pointer relative group"
                >
                  <div className="rounded-lg overflow-hidden mb-5">
                    <img
                      className="rounded-lg w-full h-64 sm:h-56 lg:h-72 object-cover group-hover:scale-105 duration-300"
                      src={category.hinhAnh}
                      alt={category.tenPhong}
                    />
                  </div>
                  <h3 className="dark:text-white text-base font-semibold hover:underline duration-300">
                    {category.tenPhong}
                  </h3>
                  <p className="dark:text-white">
                    <span className="font-semibold">${category.giaTien}</span>{" "}
                    night
                  </p>
                  <button
                    type="button"
                    className="heart h-10 w-10 rounded-full text-center text-gray-500 focus:text-red-500 bg-white hover:bg-gray-100 absolute top-2 right-2 opacity-0 duration-300 group-hover:opacity-100"
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </Link>
              ))}
            {listCategories.filter((category) => category.maViTri === activeTab)
              .length === 0 && (
              <p className="col-span-4 text-center text-gray-500 h-10 sm:h-[350px] flex items-center justify-center">
                No rooms available for this tab.
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Categories;
