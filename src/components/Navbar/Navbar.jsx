import { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { Button, Tabs } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { phongThueService } from "../../services/phongThue.service";

const Navbar = () => {
  const [listCategories, setListCategories] = useState([]);
  const listNavbar = [
    {
      imgURL:
        "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
      name: "Icons",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      name: "Cabins",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: "Farms",
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
        "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      name: "Rooms",
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
        "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
      name: "Trending",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
      name: "Treehouses",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
      name: "Beach",
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
  ];

  const tabsRef = useRef(null);
  useEffect(() => {
    if (tabsRef.current) {
      const navWrap = tabsRef.current.querySelector(".ant-tabs-nav-wrap");
      if (navWrap) {
        tabsRef.current = navWrap;
      }
    }
  }, []);
  const scrollToNext = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };
  const scrollToPrev = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  useEffect(() => {
    phongThueService
      .getRooms()
      .then((res) => setListCategories(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container px-2">
      <div ref={tabsRef}>
        <Tabs
          defaultActiveKey="1"
          items={listNavbar.map((item, index) => ({
            key: index + 1,
            label: (
              <div className="flex flex-col justify-center items-center">
                <img className="mb-2" src={item.imgURL} />
                <p className="text-black text-xs">{item.name}</p>
              </div>
            ),
            children: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {listCategories.map((item, index) => (
                  <div key={index + 1} className="cursor-pointer">
                    <img
                      className="rounded-lg h-64 sm:h-56 lg:h-52 w-full mb-5"
                      src={item.hinhAnh}
                    />
                    <h3 className="font-semibold text-base">{item.tenPhong}</h3>
                    <p>
                      <span className="font-semibold">${item.giaTien}</span>{" "}
                      night
                    </p>
                  </div>
                ))}
              </div>
            ),
          }))}
          tabBarExtraContent={{
            left: (
              <Button
                className="mr-5"
                icon={<LeftOutlined />}
                onClick={scrollToPrev}
              />
            ),
            right: (
              <Button
                className="ml-5"
                icon={<RightOutlined />}
                onClick={scrollToNext}
              />
            ),
          }}
        ></Tabs>
      </div>
    </div>
  );
};

export default Navbar;
