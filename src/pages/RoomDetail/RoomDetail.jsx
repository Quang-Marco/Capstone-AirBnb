import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { phongThueService } from "../../services/phongThue.service";
import { viTriService } from "../../services/viTri.service";
import { binhLuanService } from "../../services/binhLuan.service";
import BookingPicker from "../../components/BookingPicker/BookingPicker";
import { NotificationContext } from "../../App";
import { getCurrentDateTime, getLocalStorage } from "../../utils/utils";
import Mapbox from "../../components/MapComponent/Mapbox";
import "./roomDetail.scss";
import {
  listBasisInfo,
  listOverallRate,
  listReviewIcon,
  listThingToKnow,
  mapLocationData,
  mapOfferIcon,
  offerNameTranslated,
  reportIcon,
  saveIcon,
  shareIcon,
} from "../../common/staticData";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import { pathDefault } from "../../common/path";
import noAvatar from "../../assets/img/no-avatar.jpg";
import useResponsive from "../../hooks/useReponsive";

const RoomDetail = () => {
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);
  const [searchParam] = useSearchParams();
  const roomId = searchParam.get("id");
  const { user } = useSelector((state) => state.authSlice);
  const localUser = getLocalStorage("user");
  const [roomDetail, setRoomDetail] = useState();
  const [idLocation, setIdLocation] = useState();
  const [locationDetail, setLocationDetail] = useState();
  const [listOffer, setListOffer] = useState();
  const [listComment, setListComment] = useState();
  const [commentValue, setCommentValue] = useState("");
  const [rating, setRating] = useState(0);
  const [starHover, setStarHover] = useState(0);
  const [isBookingCardOpen, setIsBookingCardOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    if (roomId) {
      phongThueService
        .getRoomsById(roomId)
        .then((res) => {
          setRoomDetail(res.data.content);
          setIdLocation(res.data.content.maViTri);
        })
        .catch((err) => {
          console.log(err);
        });
      binhLuanService
        .getCommentsByRoomId(roomId)
        .then((res) => {
          setListComment(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [roomId]);

  useEffect(() => {
    if (roomDetail) {
      const listOffer = Object.entries(roomDetail)
        .filter(([key, value]) => value === true)
        .map(([key]) => offerNameTranslated[key]);
      setListOffer(listOffer);
    }
    const getLocationDetail = async () => {
      if (idLocation) {
        try {
          const res = await viTriService.getLocationsById(idLocation);
          setLocationDetail(res.data.content);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getLocationDetail();
  }, [roomDetail, idLocation]);

  const mapDetail = mapLocationData.find(
    (location) => location.id === locationDetail?.id
  );

  const handlePostCmt = async (e) => {
    e.preventDefault();
    if (localUser) {
      const token = user.token;
      const commentData = {
        maPhong: roomId,
        maNguoiBinhLuan: user.user.id,
        ngayBinhLuan: getCurrentDateTime(),
        noiDung: commentValue,
        saoBinhLuan: rating,
      };

      try {
        const resNewComment = await binhLuanService.postComment(
          commentData,
          token
        );
        console.log(resNewComment);
        setCommentValue("");
        handleNotification(resNewComment.data.message, "success");

        const updatedComments = await binhLuanService.getCommentsByRoomId(
          roomId
        );
        setListComment(updatedComments.data.content);
      } catch (err) {
        console.log(err);
      }
    } else {
      handleNotification("Please login to comment", "error");
      setTimeout(() => {
        navigate(pathDefault.login);
      }, 3000);
    }
  };

  return (
    <Container>
      {/* room detail page title */}
      <div className="flex justify-between dark:text-white py-8">
        <h2 className="text-xl sm:text-3xl font-semibold">
          {roomDetail?.tenPhong}
        </h2>
        <div className="flex">
          <button className="py-1 px-3 me-2 rounded-md hover:bg-slate-100 duration-100 dark:hover:text-black dark:duration-100">
            {shareIcon}
            <span className="ms-1 text-base hidden lg:inline underline">
              Share
            </span>
          </button>
          <button className="py-1 px-3 me-2 rounded-md hover:bg-slate-100 duration-100 dark:hover:text-black dark:duration-100">
            {saveIcon}
            <span className="ms-1 text-base hidden lg:inline underline">
              Save
            </span>
          </button>
        </div>
      </div>
      {/* room img */}
      <img
        src={roomDetail?.hinhAnh}
        width="100%"
        alt=""
        className="rounded-xl h-64 lg:h-[600px] object-cover"
      />
      <div className="lg:flex justify-between">
        {/* room info */}
        <div className="grid grid-cols-1 lg:basis-2/3 lg:grid-cols-3 dark:text-white">
          <div className="lg:col-span-2">
            {/* room title */}
            <div className="py-6 border-b">
              <h3 className="font-semibold text-xl sm:text-2xl">
                Entire rental unit in {locationDetail?.tenViTri},{" "}
                {locationDetail?.tinhThanh}
              </h3>
              <p className="text-sm sm:text-md lg:text-lg text-gray-500 dark:text-gray-400 mt-2">
                {roomDetail?.khach} guests <span>·</span> {roomDetail?.phongNgu}{" "}
                bedroom <span>·</span> {roomDetail?.giuong} bed <span>·</span>{" "}
                {roomDetail?.phongTam} bath
              </p>
              <div className="text-sm sm:text-base lg:text-lg font-semibold mt-5">
                <i className="fa-solid fa-star"></i>4.99 (159) <span>·</span>{" "}
                <span className="underline hover:cursor-pointer">
                  10 reviews
                </span>
              </div>
            </div>
            {/* host */}
            <div className="flex py-6 border-b">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/435/435010.png"}
                width={50}
                className="rounded-md"
                alt=""
              />
              <div className="ms-5">
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  Hosted by Henry Park
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Superhost <span>·</span> 4 months hosting
                </p>
              </div>
            </div>
            {/* basis info */}
            <div className="flex flex-col gap-5 py-8 border-b">
              {listBasisInfo.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    {item.icon}
                    <div className="ms-5">
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold">
                        {item.service}
                      </h4>
                      <p className="text-xs sm:text-sm lg:text-md text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* description */}
            <div className="py-8 border-b">
              <h3 className="font-semibold text-xl lg:text-2xl">
                About this place
              </h3>
              <p className="text-sm lg:text-lg mt-2 lg:mt-5">
                {roomDetail?.moTa}
              </p>
            </div>
            <div className="py-8 border-b">
              <h3 className="font-semibold text-xl lg:text-2xl mb-5">
                Where you'll sleep
              </h3>
              <div className="overflow-hidden w-full">
                <img
                  src={roomDetail?.hinhAnh}
                  className="w-1/2 h-44 sm:w-1/2 sm:h-72 lg:w-1/2 lg:h-72 object-cover object-left rounded-xl"
                  alt=""
                />
              </div>
              <p className="mt-5 text-sm lg:text-base font-semibold">Bedroom</p>
              <p className="text-xs lg:text-sm">1 king bed</p>
            </div>
            {/* offer */}
            <div className="py-8">
              <h3 className="font-semibold text-xl lg:text-2xl mb-5">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-1 lg:gap-4">
                {listOffer?.map((offer, offerIndex) => {
                  return (
                    <div key={offerIndex} className="py-1">
                      {mapOfferIcon[offer]}
                      <span className="text-sm lg:text-base ms-3">{offer}</span>
                    </div>
                  );
                })}
              </div>

              <button className="text-sm lg:text-base font-semibold mt-5 py-3 px-8 border border-black rounded-lg hover:bg-slate-100 dark:border-white bg-white text-black dark:hover:bg-gray-200 duration-100 dark:duration-100">
                Show all amenities
              </button>
            </div>
          </div>
        </div>

        {/* booking card */}
        <div className="relative">
          {/* <div className="booking-card w-auto sm:w-96 lg:sticky top-24 right-0 lg:w-96">
            <div
              className="rounded-md bg-white shadow-lg dark:bg-[#111827] dark:text-white dark:border-[0.3px] dark:rounded-lg dark:border-white"
              style={{ top: "10px", padding: "20px 30px" }}
            >
              <div className="price-info text-sm lg:text-base mb-4">
                <span className="text-xl lg:text-2xl font-semibold">
                  ${roomDetail?.giaTien}
                </span>{" "}
                night
              </div>

              <BookingPicker roomPrice={roomDetail?.giaTien} roomId={roomId} />
            </div>
            <div className="flex items-center justify-center gap-2 py-6">
              {reportIcon}
              <div className="text-sm text-center font-semibold text-gray-500 underline dark:text-white cursor-pointer">
                Report this listing
              </div>
            </div>
          </div> */}
          {isMobile || isTablet ? (
            <>
              {/* mobile */}
              <div
                className="fixed bottom-0 inset-x-0 z-10 w-full h-16 bg-white border-t-2 p-3"
                style={{ left: 0, right: 0 }}
              >
                <div className="grid grid-cols-2">
                  <div>
                    <span className="text-xl lg:text-2xl font-semibold">
                      ${roomDetail?.giaTien}
                    </span>{" "}
                    night
                  </div>
                  <button
                    onClick={() => setIsBookingCardOpen(!isBookingCardOpen)}
                    className="py-3 px-8 rounded-md bg-[#DB0B64] text-white font-semibold text-md"
                  >
                    {isBookingCardOpen ? "Close reserve" : "Open Reserve"}
                  </button>
                </div>
              </div>

              {isBookingCardOpen && (
                <div className="fixed z-10 bottom-14 left-0 right-0 w-full bg-white shadow-lg dark:bg-[#111827] dark:text-white p-4">
                  <div className="rounded-md shadow-lg p-4 dark:border-[1px]">
                    <div className="price-info text-sm lg:text-base mb-4">
                      <span className="text-xl lg:text-2xl font-semibold">
                        ${roomDetail?.giaTien}
                      </span>{" "}
                      night
                    </div>
                    <BookingPicker
                      roomPrice={roomDetail?.giaTien}
                      roomId={roomId}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 py-6">
                    {reportIcon}
                    <div className="text-sm text-center font-semibold text-gray-500 underline dark:text-white cursor-pointer">
                      Report this listing
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="booking-card w-auto sm:w-96 lg:sticky top-24 right-0 lg:w-96">
              {/* desktop */}
              <div className="rounded-md bg-white shadow-lg dark:border-[1px] dark:bg-[#111827] dark:text-white p-4">
                <div className="price-info text-sm lg:text-base mb-4">
                  <span className="text-xl lg:text-2xl font-semibold">
                    ${roomDetail?.giaTien}
                  </span>{" "}
                  night
                </div>
                <BookingPicker
                  roomPrice={roomDetail?.giaTien}
                  roomId={roomId}
                />
              </div>
              <div className="flex items-center justify-center gap-2 py-6">
                {reportIcon}
                <div className="text-sm text-center font-semibold text-gray-500 underline dark:text-white cursor-pointer">
                  Report this listing
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* rates */}
      <div className="border-t dark:text-white">
        <h2 className="font-semibold text-xl lg:text-2xl py-8">
          <i className="fa-solid fa-star"></i> 4.99 (159) <span>·</span>{" "}
          <span>10 reviews</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 mb-10">
          <div>
            <h4 className="text-base lg:text-md font-bold mb-5">
              Overall rating
            </h4>
            <div className="flex justify-between">
              {/* overall rating */}
              <div className="w-full">
                {listOverallRate.map((star, starIndex) => {
                  return (
                    <div className="flex items-center" key={starIndex}>
                      <span className="text-sm">{star.star}</span>
                      <div className="relative flex-grow h-2 bg-gray-300 dark:bg-black mx-3">
                        <div
                          className="absolute top-0 left-0 h-full bg-black dark:bg-white"
                          style={{ width: `${star.width}` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {listReviewIcon.map((reviewItem, reviewIndex) => {
            return (
              <div key={reviewIndex} className="hidden lg:block">
                <h4 className="font-bold mb-4">{reviewItem.title}</h4>
                <span className="text-lg font-semibold">{reviewItem.star}</span>
                <div className="mt-5">{reviewItem.icon}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* comment */}
      <div className="border-t py-8 dark:text-white">
        <h2 className="font-semibold text-xl lg:text-2xl mb-5">
          What people say
        </h2>
        {listComment?.length !== 0 ? (
          <div className="commment grid grid-cols-1 lg:grid-cols-2 gap-4">
            {listComment?.map((comment, commentIndex) => (
              <div key={commentIndex}>
                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-3 pb-3">
                    <img
                      className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                      src={comment.avatar ? comment.avatar : noAvatar}
                      alt="avatar"
                    />
                    <div>
                      <h4 className="capitalize text-sm lg:text-base font-semibold">
                        {comment.tenNguoiBinhLuan}
                      </h4>
                      <p className="text-xs lg:text-sm">5 years on Airbnb</p>
                    </div>
                  </div>
                  <div className="flex text-sm space-x-1">
                    {Array.from({ length: comment.saoBinhLuan }, (_, index) => (
                      <i
                        key={index}
                        className="fa-solid fa-star text-yellow-500 text-xs lg:text-base"
                      ></i>
                    ))}
                    <span className="text-xs lg:text-base">
                      {comment.ngayBinhLuan}
                    </span>
                  </div>
                  <p className="text-sm lg:text-base">{comment.noiDung}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="comment italic text-sm lg:text-base">
            There are no comments for this room yet. Leave a comment below.
          </div>
        )}
        {/* comment input */}
        <form onSubmit={handlePostCmt} className="my-3">
          <div>
            <div className="flex justify-start gap-5 py-3">
              {/* avatar */}
              <img
                src={localUser ? user?.user.avatar : noAvatar}
                className="w-12 h-12 rounded-full"
                alt="avatar"
              />
              <div className="w-full">
                <textarea
                  placeholder="Add a comment"
                  className="p-3 h-28 border w-full border-gray-200 rounded-md text-xs lg:text-base"
                  value={commentValue}
                  onChange={(e) => {
                    setCommentValue(e.target.value);
                  }}
                />
                <div className="flex">
                  <div className="flex items-center">
                    <span className="text-xs lg:text-base me-1 lg:me-3">
                      Rating:
                    </span>
                  </div>
                  {/* 5 stars */}
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <span
                        key={index}
                        value={rating}
                        className={`cursor-pointer text-3xl ${
                          index <= (starHover || rating)
                            ? "text-yellow-400 text-xl"
                            : "text-gray-400 text-xl"
                        }`}
                        onClick={() => {
                          setRating(index);
                        }}
                        onMouseEnter={() => setStarHover(index)}
                        onMouseLeave={() => setStarHover(rating)}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-5 bg-[#DB0B64] text-white font-semibold rounded-md text-sm lg:text-base hover:bg-[#FD365B] duration-100"
              >
                Post comment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* map */}
      <div className="border-t py-8 dark:text-white">
        <h3 className="font-semibold text-xl lg:text-2xl mb-5">
          Where you'll be
        </h3>
        <div className="roomLocation">
          {mapDetail ? (
            <Mapbox
              longitude={mapDetail.longitude}
              latitude={mapDetail.latitude}
              tenViTri={mapDetail.tenViTri}
              tinhThanh={mapDetail.tinhThanh}
              image={mapDetail.hinhAnh}
            />
          ) : null}
        </div>
      </div>

      {/* meet your host */}
      <div className="border-t py-8 dark:text-white">
        <h3 className="font-semibold text-xl lg:text-2xl mb-5">
          Meet your host
        </h3>
        <div className="lg:flex justify-between gap-24">
          <div className="hostLeft mb-5">
            <div className="border flex justify-center lg:justify-between gap-14 py-10 ps-20 pe-5 shadow-md rounded-3xl">
              <div className="text-center">
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/435/435010.png"}
                  width={120}
                  alt=""
                  className="mx-auto mb-3"
                />
                <h3 className="text-md lg:text-2xl font-bold">Henry Park</h3>
                <p className="font-semibold">Host</p>
              </div>
              <div className="flex flex-col">
                <div className="flex-grow mb-2 text-sm">
                  <span className="text-lg lg:text-2xl mb-1 font-bold">10</span>{" "}
                  <br /> Reviews
                </div>
                <div className="flex-grow mb-2 text-sm">
                  <span className="text-lg lg:text-2xl mb-1 font-bold">
                    5{" "}
                    <i className="fa-solid fa-star text-sm align-text-top"></i>
                  </span>{" "}
                  <br /> Rating
                </div>
                <div className="flex-grow mb-2 text-sm">
                  <span className="text-lg lg:text-2xl mb-1 font-bold">3</span>{" "}
                  <br /> Years hosting
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm lg:text-base flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 22,
                  width: 22,
                  fill: "currentcolor",
                }}
              >
                <path d="m5.7 1.3 3 3-.66.72a12 12 0 0 0 16.95 16.94l.72-.67 3 3-1.42 1.42-1.67-1.68A13.94 13.94 0 0 1 18 26.96V29h3v2h-8v-2h3v-2.04a13.95 13.95 0 0 1-8.92-4.08 14 14 0 0 1-1.11-18.5L4.29 2.71zm18.18 4.44.21.21.21.22a10 10 0 1 1-.64-.63zm-9.34 11.13-2.45 2.45a8 8 0 0 0 8.04 1.05 16.7 16.7 0 0 1-5.59-3.5zm4.91-4.91-3.5 3.5c2.85 2.54 6.08 3.82 6.7 3.2.63-.61-.66-3.85-3.2-6.7zm-9.81-2.1-.08.19a8 8 0 0 0 1.12 7.86l2.45-2.45a16.68 16.68 0 0 1-3.5-5.6zM23.32 8.1l-2.45 2.44a16.73 16.73 0 0 1 3.5 5.6 8 8 0 0 0-1.05-8.05zm-11.98-.76c-.62.62.66 3.86 3.2 6.7l3.5-3.5c-2.85-2.54-6.07-3.82-6.7-3.2zm2.54-1.7c1.75.59 3.75 1.83 5.58 3.49l2.44-2.45a8.03 8.03 0 0 0-8.02-1.04z" />
              </svg>
              <p className="ms-3">
                Speaks English, Chinese, Japanese and Korean
              </p>
            </div>
            <p className="pt-2 underline cursor-pointer font-semibold text-sm lg:text-base hover:text-gray-600">
              Show more
            </p>
          </div>
          <div className="hostRight h-[400px] flex flex-col lg:flex lg:flex-col">
            <h4 className="text-base lg:text-xl font-semibold flex-grow">
              Host details
            </h4>
            <div className="flex-grow text-sm lg:text-base">
              Henry Park <span className="font-semibold">is a Superhost</span>
            </div>
            <div className="flex-grow text-sm lg:text-base">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </div>
            <div className="flex-grow text-sm lg:text-base">
              <p>Response rate: 100%</p>
              <p>Responds within an hour</p>
            </div>
            <div className="flex-grow text-sm lg:text-base">
              <button className="py-3 px-8 font-bold rounded-md bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 duration-100 dark:hover:bg-gray-200 dark:duration-100">
                Message Host
              </button>
            </div>

            <p className="flex-grow text-sm cursor-pointer lg:text-base underline">
              Individual Host
            </p>
            <div className="flex-grow text-sm lg:text-base pt-5 border-t">
              <div className="flex">
                <svg
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 24,
                    width: 24,
                    fill: "rgb(227, 28, 95)",
                    stroke: "currentcolor",
                  }}
                >
                  <g>
                    <g stroke="none">
                      <path
                        d="m25 5 .5846837.00517475c4.2905015.07574932 8.8374917.98334075 13.644943 2.73687823l.7703733.28794702v27.3705076l-.0084766.1301365c-.0392237.2994207-.2122236.5656263-.4699074.7230756l-.1154775.0605995-11.4234694 5.0774159c.0623636-.7458456-.0433445-1.4943022-.3209346-2.2783707-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487l-.3317555-.6369277c-.4686141-.9115826-.8248653-1.6297768-1.3147672-2.2052384-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-.4956822.9653459-.9868615 1.9338929-1.47282629 2.9041739l.00159179-19.0721502.769087-.28647781c4.798406-1.75037189 9.3373349-2.65799308 13.6207364-2.73688762z"
                        fillOpacity=".2"
                      />
                      <path d="m25 1c5.5985197 0 11.5175072 1.27473768 17.7548231 3.81642897.7027419.28641855 1.1783863.94329535 1.2386823 1.69066764l.0064946.16143432v28.73197667c0 1.8999458-1.0758761 3.6285379-2.7638433 4.4721215l-.2054644.0969363-15.0427818 6.6856808c-.4614217.2050763-1.8621146.3276624-2.7955525.3430957l-.192358.0016581.0009065-1.0005013c.6483674-.0069073 1.2843321-.1330366 1.8784107-.3747752.8327784-.3388673 1.5457548-.8939986 2.0790671-1.5885618l13.2600311-5.8942194c1.023196-.4547538 1.7028179-1.4383245 1.7751735-2.5449525l.0064111-.1964822v-28.73197667l-.6916987-.27704554c-5.7517231-2.26330416-11.1871718-3.39148539-16.3083013-3.39148539-5.1211255 0-10.5565697 1.12817946-16.3082877 3.39148006l-.6917123.27707479-.00030284 24.49382405c-.68067737 1.4079172-1.34834149 2.8151846-2.00083161 4.2173468l.00113445-28.71117085c0-.81311953.4922453-1.5453083 1.24525131-1.85215622 6.23725069-2.54166294 12.15623339-3.81639863 17.75474869-3.81639863z" />
                    </g>
                    <path
                      d="m15.999908 41.6930234.6867258-.8851772c1.5957359-2.0328613 2.5919668-3.8873951 2.9612752-5.511912.2804314-1.2318637.2318527-2.5167089-.4804505-3.5591688-.6801015-.9952012-1.8642067-1.5894421-3.1673665-1.5894421-1.3033438 0-2.487633.5940563-3.1675505 1.5890729-.7099111 1.039137-.761802 2.3201055-.4810025 3.5580612.3689403 1.6247015 1.3653552 3.4796045 2.9616432 5.5133888l.6867258.8851772.6447715.7192179c1.1495113 1.2599236 2.1735278 2.122579 3.2227536 2.7149739.8151649.4602182 1.6400823.7413704 2.4521191.8358878.8812245.1033783 1.7585848-.0123685 2.559765-.3383795 1.6422905-.6682672 2.8186673-2.1775911 3.0700251-3.9387151.1205267-.8438258.0264975-1.6854363-.2876078-2.572644-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487-.6486357-1.2222643-1.0477537-2.1388241-1.6465227-2.8421661-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-2.1326775 4.1534098-4.1819984 8.3660775-6.09128759 12.5211487-.28227155.6306079-.79308369 1.6933742-1.04168139 2.3948702-.3141053.8872077-.40813448 1.7288182-.28760784 2.5731978.25117384 1.7609394 1.42736664 3.2700787 3.06965711 3.9385305.81939715.3333951 1.69418134.4397272 2.55958102.3385641.81295679-.0948866 1.63805829-.3760388 2.45248709-.8360724 1.0492258-.5922103 2.0732422-1.4550503 3.2227536-2.7149739z"
                      fill="none"
                      strokeWidth={2}
                    />
                  </g>
                </svg>
                <p className="ms-2 text-sm lg:text-base">
                  To protect your payment, never transfer money or communicate
                  outside of the Airbnb website or app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Things to know */}
      <div className="border-t py-8 dark:text-white">
        <h3 className="font-semibold text-xl lg:text-2xl mb-5">
          Things to know
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {listThingToKnow.map((thing, tingIndex) => {
            return (
              <div key={tingIndex}>
                <h5 className="font-semibold text-base lg:text-md mb-3">
                  {thing.title}
                </h5>
                <p className="text-sm lg:text-base mb-3">{thing.rule1}</p>
                <p className="text-sm lg:text-base mb-3">{thing.rule2}</p>
                <p className="text-sm lg:text-base mb-3">{thing.rule3}</p>
                <button className="cursor-pointer underline text-sm lg:text-base font-semibold mb-6 hover:text-gray-600">
                  Show more
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
export default RoomDetail;
