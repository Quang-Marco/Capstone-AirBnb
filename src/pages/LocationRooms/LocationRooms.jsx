import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { phongThueService } from "../../services/phongThue.service";
import { pathDefault } from "../../common/path";
import { viTriService } from "../../services/viTri.service";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Mapbox from "../../components/MapComponent/Mapbox";
import { mapLocationData } from "../../common/staticData";

const LocationRooms = () => {
  const navigate = useNavigate();
  const [listLocationRooms, setListLocationRooms] = useState([]);
  const [params, setParams] = useSearchParams();
  const [tenViTriTitle, setTenViTriTitle] = useState("");
  const idLocation = params.get("idLocation");
  const [savedRooms, setSavedRooms] = useState([]);

  const mapDetail =
    mapLocationData.find((location) => location.id === parseInt(idLocation)) ||
    [];

  const handleIconClick = (event, roomId) => {
    event.stopPropagation();
    setSavedRooms((listSavedRooms) =>
      listSavedRooms.includes(roomId)
        ? listSavedRooms.filter((id) => id !== roomId)
        : [...listSavedRooms, roomId]
    );
  };

  const fetchData = async () => {
    try {
      const result = await viTriService.getLocationsById(idLocation);
      setTenViTriTitle(
        `${result.data.content.tenViTri}, ${result.data.content.tinhThanh}`
      );
      const res = await phongThueService.getRoomsByLocation(idLocation);
      setListLocationRooms(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idLocation]);

  return (
    <Container>
      {listLocationRooms.length > 0 ? (
        <div className="py-5">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={pathDefault.homePage} className="dark:text-white">
                    <HomeOutlined />
                  </Link>
                ),
              },
              {
                title: <p className="dark:text-white">location</p>,
              },
            ]}
          />
          <h2 className="dark:text-white text-xl sm:text-2xl lg:text-3xl mt-5 mb-10">
            {listLocationRooms.length} places for{" "}
            <span className="font-semibold">"{tenViTriTitle}"</span>
          </h2>
          <div className="lg:flex gap-8">
            <div className="basis-full grid grid-cols-1 sm:grid-cols-2 sm:gap-5 lg:basis-3/5 lg:grid-cols-3 lg:gap-7 lg:h-auto">
              {listLocationRooms.map((category) => (
                <div
                  onClick={() => {
                    navigate(`${pathDefault.roomDetail}?id=${category.id}`);
                  }}
                  key={category.id}
                  className="cursor-pointer relative overflow-hidden group"
                >
                  <div className="w-full rounded-lg overflow-hidden mb-5">
                    <img
                      className="rounded-lg w-full h-64 sm:h-56 lg:h-72 object-cover lg:object-left group-hover:scale-105 duration-300"
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
                    onClick={(event) => handleIconClick(event, category.id)}
                  >
                    <i
                      className={`fa-regular fa-heart ${
                        savedRooms.includes(category.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    ></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="map basis-full h-72 lg:basis-2/5 lg:h-auto lg:max-h-fit">
              <Mapbox
                longitude={mapDetail.longitude || 0}
                latitude={mapDetail.latitude || 0}
                tenViTri={mapDetail.tenViTri || ""}
                tinhThanh={mapDetail.tinhThanh || ""}
                image={mapDetail.hinhAnh || ""}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-5">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={pathDefault.homePage} className="dark:text-white">
                    <HomeOutlined />
                  </Link>
                ),
              },
              {
                title: <p className="dark:text-white">location</p>,
              },
            ]}
          />
          <h2 className="dark:text-white text-xl sm:text-2xl lg:text-3xl mt-5 mb-10">
            0 places for{" "}
            <span className="font-semibold">"{tenViTriTitle}"</span>
          </h2>
          <p className="col-span-4 text-center text-gray-500 h-10 sm:h-[350px] flex items-center justify-center">
            No rooms available for this location.
          </p>
        </div>
      )}
    </Container>
  );
};

export default LocationRooms;
