import { useEffect, useRef, useState } from "react";
import Container from "../Container";
import { phongThueService } from "../../services/phongThue.service";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const [listCategories, setListCategories] = useState([]);
  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const listTabs = [
    {
      imgURL:
        "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      name: t("content.tabs.rooms"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: t("content.tabs.amazingViews"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
      name: t("content.tabs.beach"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
      name: t("content.tabs.chefsKitchens"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      name: t("content.tabs.cabins"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      name: t("content.tabs.countryside"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
      name: t("content.tabs.trending"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
      name: t("content.tabs.tinyHomes"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
      name: t("content.tabs.castles"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg",
      name: t("content.tabs.grandPianos"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: t("content.tabs.farms"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      name: t("content.tabs.amazingPools"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
      name: t("content.tabs.treehouses"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
      name: t("content.tabs.tropical"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
      name: t("content.tabs.arctic"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
      name: t("content.tabs.domes"),
    },
    {
      imgURL:
        "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
      name: t("content.tabs.icons"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/747b326c-cb8f-41cf-a7f9-809ab646e10c.jpg",
      name: t("content.tabs.shepherdsHuts"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
      name: t("content.tabs.earthHomes"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
      name: t("content.tabs.boats"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
      name: t("content.tabs.yurts"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
      name: t("content.tabs.luxe"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
      name: t("content.tabs.mansions"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
      name: t("content.tabs.lakefront"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      name: t("content.tabs.beachfront"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
      name: t("content.tabs.islands"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
      name: t("content.tabs.aFrames"),
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      name: t("content.tabs.omg"),
    },
  ];

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
                  <p className="text-gray-500">Nov 9 - 14</p>
                  <p className="dark:text-white mt-1">
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
