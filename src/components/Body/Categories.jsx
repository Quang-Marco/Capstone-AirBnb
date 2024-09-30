import { useEffect, useState } from "react";
import "./categories.scss";
import Container from "../Container";
import { phongThueService } from "../../services/phongThue.service";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";

const Categories = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [listCategories, setListCategories] = useState([]);
  const listNavbar = [
    {
      imgURL:
        "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      name: "Rooms",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
      name: "Chef's kitchens",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      name: "Cabins",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/747b326c-cb8f-41cf-a7f9-809ab646e10c.jpg",
      name: "Shepherd's huts",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: "Farms",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg",
      name: "Grand pianos",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
      name: "Castles",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
      name: "Tiny homes",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
      name: "Chef's kitchens",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: "Amazing views",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg",
      name: "Grand pianos",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/747b326c-cb8f-41cf-a7f9-809ab646e10c.jpg",
      name: "Shepherd's huts",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      name: "Amazing pools",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
      name: "Treehouses",
    },
    {
      imgURL:
        "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
      name: "Icons",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      name: "OMG!",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
      name: "Domes",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      name: "Countryside",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
      name: "Arctic",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
      name: "Earth homes",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
      name: "Boats",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
      name: "Yurts",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
      name: "Tropical",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
      name: "Luxe",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
      name: "Mansions",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
      name: "Lakefront",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
      name: "Islands",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
      name: "A-frames",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      name: "Beachfront",
    },
  ];

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
      <div className="bg-white dark:bg-gray-900 pt-5 pb-2 sticky top-[90px] z-[1]">
        <Container>
          <div className="tabs-categories flex gap-10 overflow-x-auto">
            {listNavbar.map((item, index) => (
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
        <div className="tab-content mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            {listCategories
              .filter((category) => category.maViTri === activeTab)
              .map((category) => (
                <Link
                  to={pathDefault.homePage}
                  key={category.id}
                  className="cursor-pointer relative overflow-hidden group"
                >
                  <img
                    className="rounded-lg  w-full mb-5 h-64 sm:h-56 lg:h-72 group-hover:scale-105 duration-300"
                    src={category.hinhAnh}
                    alt={category.tenPhong}
                  />
                  <h3 className="text-base font-semibold hover:underline duration-300">
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
