import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { Link, useSearchParams } from "react-router-dom";
import { phongThueService } from "../../services/phongThue.service";
import { pathDefault } from "../../common/path";
import { viTriService } from "../../services/viTri.service";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const LocationRooms = () => {
  const [listLocationRooms, setListLocationRooms] = useState([]);
  const [params, setParams] = useSearchParams();
  const [tenViTri, setTenViTri] = useState("");
  const maViTri = params.get("maViTri");

  const fetchData = async () => {
    try {
      const result = await viTriService.getLocationsFromId(maViTri);
      setTenViTri(
        `${result.data.content.tenViTri}, ${result.data.content.tinhThanh}`
      );

      const res = await phongThueService.getRoomsFromLocation(maViTri);
      setListLocationRooms(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [maViTri]);

  return (
    <Container>
      {listLocationRooms.length > 0 ? (
        <div className="mt-5">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={pathDefault.homePage}>
                    <HomeOutlined />
                  </Link>
                ),
              },
              {
                title: "location",
              },
            ]}
          />
          <h2 className="text-xl sm:text-2xl lg:text-3xl mt-5 mb-10">
            {listLocationRooms.length} places for{" "}
            <span className="font-semibold">"{tenViTri}"</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            {listLocationRooms.map((category) => (
              <div
                // to={pathDefault.homePage}
                key={category.id}
                className="cursor-pointer relative overflow-hidden group"
              >
                <div className="rounded-lg overflow-hidden mb-5">
                  <img
                    className="rounded-lg w-full h-64 sm:h-56 lg:h-72 object-cover group-hover:scale-105 duration-300"
                    src={category.hinhAnh}
                    alt={category.tenPhong}
                  />
                </div>
                <h3 className="text-base font-semibold hover:underline duration-300">
                  {category.tenPhong}
                </h3>
                <p>
                  <span className="font-semibold">${category.giaTien}</span>{" "}
                  night
                </p>
                <button
                  type="button"
                  className="heart h-10 w-10 rounded-full text-center text-gray-500 focus:text-red-500 bg-white hover:bg-gray-100 absolute top-2 right-2 opacity-0 duration-300 group-hover:opacity-100"
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={pathDefault.homePage}>
                    <HomeOutlined />
                  </Link>
                ),
              },
              {
                title: "location",
              },
            ]}
          />
          <p className="col-span-4 text-center text-gray-500 h-10 sm:h-[350px] flex items-center justify-center">
            No rooms available for this location.
          </p>
        </div>
      )}
    </Container>
  );
};

export default LocationRooms;
