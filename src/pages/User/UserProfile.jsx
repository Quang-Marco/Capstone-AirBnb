import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { phongThueService } from "../../services/phongThue.service";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";

const UserProfile = () => {
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    phongThueService
      .getRooms()
      .then((res) => {
        setListCategories(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-10 mt-10">
        <div className="card">
          <div className="border rounded-lg sm:rounded-3xl shadow-xl p-5 sm:p-8 flex flex-col justify-center items-center">
            <img
              className="w-32 h-32 rounded-full"
              src="https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=Q&im_w=240&im_s=133.33&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"
              alt="avatar"
            />
            <button className="bg-gray-100 px-5 py-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 duration-300">
              <i className="fa-solid fa-circle-camera"></i>
              <span> update</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-5">Name</h2>
          </div>
          <div className="border rounded-3xl p-5 sm:p-8 mt-10">
            <div className="border-b mb-5">
              <h3 className="text-xl font-semibold">
                Name's confirmed information
              </h3>
              <p className="my-5">
                <i className="fa-duotone fa-solid fa-check"></i>
                <span> Email address</span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Verify your identity</h3>
              <p className="my-5">
                Before you book or host on Airbnb, you’ll need to complete this
                step.
              </p>
              <button className="px-5 py-3 font-semibold border border-black rounded-lg hover:bg-gray-100 duration-300">
                Get Verified
              </button>
            </div>
          </div>
        </div>

        <div className="rooms sm:col-span-2">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-10">
            Phòng đã thuê
          </h3>
          {listCategories.slice(0, 3).map((category) => (
            <div
              //   to={pathDefault.homePage}
              key={category.id}
              className="cursor-pointer relative overflow-hidden group mb-5"
            >
              <div className="rounded-lg overflow-hidden mb-5">
                <img
                  className="rounded-lg object-cover group-hover:scale-105 duration-300"
                  src={category.hinhAnh}
                  alt={category.tenPhong}
                />
              </div>
              <h3 className="text-base font-semibold hover:underline duration-300">
                {category.tenPhong}
              </h3>
              <p>
                <span className="font-semibold">${category.giaTien}</span> night
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
    </Container>
  );
};

export default UserProfile;
