import React, { useEffect, useRef, useState } from "react";
import { Button, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { phongThueService } from "../../services/phongThue.service";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./listRoomsPage.scss";
import Mapbox from "../../components/MapComponent/Mapbox";

const ListRoomsPage = () => {
  const [searchParam] = useSearchParams();
  const [listRooms, setListRooms] = useState([]);
  const listIconNav = [
    {
      imgURL:
        "https://a0.muscache.com/pictures/b887040f-0968-4174-9a4f-2d41f8728248.jpg",
      name: "Your search",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      name: "Countryside",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
      name: "Castles",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
      name: "Top cities",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
      name: "Beds and breakfasts",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
      name: "Design",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      name: "OMG!",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      name: "Beachfront",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: "Farms",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: "Amazing views",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
      name: "Vineyards",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
      name: "Skiing",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      name: "Rooms",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
      name: "Historical homes",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg",
      name: "Houseboats",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg",
      name: "Creative spaces",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
      name: "Boats",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
      name: "Campings",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/e4b12c1b-409b-4cb6-a674-7c1284449f6e.jpg",
      name: "Cycladic homes",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
      name: "Luxe",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
      name: "Chef's kitchens",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
      name: "Surfing",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
      name: "Trulli",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
      name: "Arctic",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      name: "Carbins",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
      name: "Mansions",
    },
    {
      imgURL:
        "https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg",
      name: "Ski in/out",
    },
  ];
  const [iconStates, setIconStates] = useState(listRooms.map(() => false));
  const navigate = useNavigate();

  const locationData = [
    {
      id: 1,
      tenViTri: "Quận 1",
      tinhThanh: "Hồ Chí Minh",
      longitude: "106.6780311",
      latitude: "10.7752752",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg",
    },
    {
      id: 2,
      tenViTri: "Cái Răng",
      tinhThanh: "Cần Thơ",
      longitude: "105.7163707",
      latitude: "10.0342689",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg",
    },
    {
      id: 3,
      tenViTri: "Hòn Rùa",
      tinhThanh: "Nha Trang",
      longitude: "109.2426055",
      latitude: "12.2889893",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg",
    },
    {
      id: 4,
      tenViTri: "Hoàn Kiếm",
      tinhThanh: "Hà Nội",
      longitude: "105.8347019",
      latitude: "21.0304258",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg",
    },
    {
      id: 5,
      tenViTri: "Hòn Tằm",
      tinhThanh: "Phú Quốc",
      longitude: "103.7926141",
      latitude: "10.2291419",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg",
    },
    {
      id: 6,
      tenViTri: "Hải Châu",
      tinhThanh: "Đà Nẵng",
      longitude: "108.1340492",
      latitude: "16.0590292",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg",
    },
    {
      id: 7,
      tenViTri: "Langbiang",
      tinhThanh: "Đà Lạt",
      longitude: "108.4168785",
      latitude: "12.0112744",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt7.jpg",
    },
    {
      id: 8,
      tenViTri: "Mũi Né",
      tinhThanh: "Phan Thiết",
      longitude: "108.2695696",
      latitude: "10.9605204",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt8.jpg",
    },
    {
      id: 3240,
      tenViTri: "Cầu Vàng",
      tinhThanh: "Đà Nẵng",
      longitude: "108.1459593",
      latitude: "10.9608947",
      hinhAnh:
        "https://airbnbnew.cybersoft.edu.vn/avatar/24-08-2024-03-29-39-tesst.jpg",
    },
    {
      id: 3242,
      tenViTri: "Tam Đảo",
      tinhThanh: "Vĩnh Phúc",
      longitude: "105.6425416",
      latitude: "21.454107",
      hinhAnh:
        "https://airbnbnew.cybersoft.edu.vn/avatar/02-09-2024-06-55-52-tamdao4-7954-1650625982.jpg",
    },
    {
      id: 3243,
      tenViTri: "Mỹ Tho",
      tinhThanh: "Tiền Giang",
      longitude: "106.3040747",
      latitude: "10.3692895",
      hinhAnh:
        "https://muinetourhotel.com/upload/data/H%C3%8CNH%20THU%C3%8A%20XE%20CHU%E1%BA%A8N%20SEO/tour%20my%20tho/cn-thoi-son.jpg",
    },
  ];

  // gọi api
  useEffect(() => {
    let searchLocation = searchParam.get("location");
    if (searchLocation) {
      phongThueService
        .getRoomsByLocation(searchLocation)
        .then((res) => {
          console.log(res);
          setListRooms(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // thanh scroll đầu trang
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

  // css
  const textDisplay = (text, maxWord) => {
    const shortText = text.split(" ").slice(0, maxWord).join(" ") + "...";
    return shortText;
  };

  const addToFavorite = (event) => {
    event.stopPropagation();
  };

  const handleIconChange = (index) => {
    // Tạo một bản sao của mảng trạng thái hiện tại
    const updatedIconStates = [...iconStates];

    // Đổi trạng thái của icon tại vị trí index
    updatedIconStates[index] = !updatedIconStates[index];

    // Cập nhật lại trạng thái mới
    setIconStates(updatedIconStates);
  };

  const selectedLocation = locationData.find(
    (location) => location.id === parseInt(searchParam.get("location"))
  );
  const { tenViTri, tinhThanh, hinhAnh, longitude, latitude } =
    selectedLocation;

  return (
    <div className="container">
      <div ref={tabsRef}>
        <Tabs
          defaultActiveKey="1"
          items={listIconNav.map((item, index) => ({
            key: index + 1,
            label: (
              <div className="flex flex-col justify-center items-center">
                <img className="mb-2" src={item.imgURL} />
                <p className="text-black text-xs">{item.name}</p>
              </div>
            ),
            children: (
              <div className="listRoomsByLocation flex gap-8">
                <div className="basis-3/5">
                  <p className="text-base font-semibold my-5">
                    Over 1,000 places
                  </p>
                  <div className="grid sm:grid-col-1 md:grid-cols-3 gap-5">
                    {listRooms.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="text-base hover:cursor-pointer"
                          onClick={() => {
                            navigate(`/roomDetail?id=${item.id}`);
                          }}
                        >
                          <div className="overlay relative group">
                            <img
                              src={item.hinhAnh}
                              alt=""
                              className="rounded-lg h-96 sm:h-72 lg:h-60 w-full mb-3"
                            />
                            <div className="flex justify-between">
                              <h6 className="font-semibold ">
                                {textDisplay(item.tenPhong, 3)}
                              </h6>
                              <span className="text-sm">
                                <i className="fa-solid fa-star"></i>4.99 (159)
                              </span>
                            </div>

                            <p className="text-gray-500">
                              {textDisplay(item.moTa, 10)}
                            </p>

                            <div>
                              <span className="font-bold">${item.giaTien}</span>{" "}
                              <span>/ night</span>
                            </div>

                            <div
                              className="absolute top-3 right-3 text-white transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer"
                              onClick={addToFavorite}
                            >
                              {iconStates[index] ? (
                                <i
                                  className="fa-solid fa-heart text-lg text-white"
                                  onClick={() => {
                                    handleIconChange(index);
                                  }}
                                ></i>
                              ) : (
                                <i
                                  className="fa-regular fa-heart"
                                  onClick={() => {
                                    handleIconChange(index);
                                  }}
                                ></i>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="map basis-2/5">
                  <Mapbox
                    longitude={longitude}
                    latitude={latitude}
                    tenViTri={tenViTri}
                    tinhThanh={tinhThanh}
                    image={hinhAnh}
                  />
                </div>
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

export default ListRoomsPage;
