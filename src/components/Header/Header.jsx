import { useEffect, useState } from "react";
import IconLogoHeader from "./IconLogoHeader";
import Container from "../Container";
import Navbar from "../Navbar/Navbar";
import UserMenu from "../Navbar/UserMenu";
import CustomDropdown from "./CustomDropdown";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Dropdown } from "antd";
import dayjs from "dayjs";
import useResponsive from "../../hooks/useReponsive";
import useDebounce from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import LogoHeader from "./LogoHeader";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";
import CustomDropdown from "./CustomDropdown";
import { viTriService } from "../../services/viTri.service";
import { pathDefault } from "../../common/path";
import { Calendar, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import useDebounce from "../../hooks/useDebounce";
import { viTriService } from "../../services/viTri.service";

const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Header = () => {
  const { t } = useTranslation();

  const [listLocation, setListLocation] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const handleOpenLocation = (open) => {
    setLocationOpen(open);
  };

  // Hàm loại bỏ dấu tiếng Việt
  const removeAccents = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredLocations = listLocation.filter(
    (location) =>
      removeAccents(location.tenViTri.toLowerCase()).includes(
        removeAccents(searchValue.toLowerCase())
      ) ||
      removeAccents(location.tinhThanh.toLowerCase()).includes(
        removeAccents(searchValue.toLowerCase())
      )
  );

  const itemsLocation = filteredLocations.map((item, index) => ({
    key: index.toString(),
    label: (
      <Link
        to={pathDefault.homePage}
        onClick={() => setSearchValue(`${item.tenViTri}, ${item.tinhThanh}`)}
      >
        {item.tenViTri}, {item.tinhThanh}
      </Link>
    ),
    icon: <img className="w-12 h-10" src={item.hinhAnh} />,
  }));

  const [dates, setDates] = useState({
    checkin: "Add dates",
    checkout: "Add dates",
    date: "Add dates",
  });
  const onSelectDate = (type, date) => {
    setDates((prevDates) => ({
      ...prevDates,
      [type]: date ? dayjs(date).format("DD/MM/YYYY") : "Add dates",
    }));
  };

  const itemsCalendar = (type) => [
    {
      key: "0",
      label: (
        <Calendar
          fullscreen={false}
          onSelect={(date) => onSelectDate(type, date)}
        />
      ),
    },
  ];

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const updateGuestCount = (type, action, e) => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]:
        action === "increment"
          ? prevGuests[type] + 1
          : prevGuests[type] > 0
          ? prevGuests[type] - 1
          : 0,
    }));
  };
  const itemsGuest = [
    {
      key: "1",
      label: (
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <p className="font-semibold">Adults</p>
            <p className="text-gray-500 text-sm">Ages 13 or above</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateGuestCount("adults", "decrement")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-minus w-5 h-5"></i>
            </button>
            <span className="font-semibold text-base mx-4">
              {guests.adults}
            </span>
            <button
              onClick={() => updateGuestCount("adults", "increment")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-plus w-5 h-5"></i>
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <p className="font-semibold">Children</p>
            <p className="text-gray-500 text-sm">Ages 2–12</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateGuestCount("children", "decrement")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-minus w-5 h-5"></i>
            </button>
            <span className="font-semibold text-base mx-4">
              {guests.children}
            </span>
            <button
              onClick={() => updateGuestCount("children", "increment")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-plus w-5 h-5"></i>
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <p className="font-semibold">Infants</p>
            <p className="text-gray-500 text-sm">Under 2</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateGuestCount("infants", "decrement")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-minus w-5 h-5"></i>
            </button>
            <span className="font-semibold text-base mx-4">
              {guests.infants}
            </span>
            <button
              onClick={() => updateGuestCount("infants", "increment")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-plus w-5 h-5"></i>
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex justify-between items-center p-5">
          <div>
            <p className="font-semibold">Pets</p>
            <p className="text-gray-500 text-sm">Bringing a service animal?</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateGuestCount("pets", "decrement")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-minus w-5 h-5"></i>
            </button>
            <span className="font-semibold text-base mx-4">{guests.pets}</span>
            <button
              onClick={() => updateGuestCount("pets", "increment")}
              className="px-1 py-[2px] rounded-full border border-black opacity-60 hover:opacity-100 duration-300"
            >
              <i className="fa-regular fa-plus w-5 h-5"></i>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      key: "1",
      label: "Stays",
      content: (
        <div className="text-gray-600 border md:w-[900px] rounded-full shadow-sm hover:shadow-md duration-300 cursor-pointer">
          <div className="grid grid-cols-6 items-center text-sm">
            <div className="col-span-2 pl-6 py-4 rounded-full hover:bg-gray-100 duration-300">
              <Dropdown
                menu={{
                  items: itemsLocation,
                }}
                trigger={["click"]}
                open={locationOpen}
                onOpenChange={handleOpenLocation}
                overlayStyle={{ paddingTop: "20px" }}
              >
                <div>
                  <button className="font-semibold block">Where</button>
                  <input
                    className="bg-transparent focus-visible:outline-none"
                    type="text"
                    placeholder="Search destinations"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value), setLocationOpen(true);
                    }}
                  />
                </div>
              </Dropdown>
            </div>
            <CustomDropdown
              items={itemsCalendar("checkin")}
              classCustom="px-6 border-l"
            >
              <div>
                <p className="font-semibold">Check in</p>
                <p className="">{dates.checkin}</p>
              </div>
            </CustomDropdown>
            <CustomDropdown
              items={itemsCalendar("checkout")}
              classCustom="px-6 border-x"
            >
              <div>
                <p className="font-semibold">Check out</p>
                <p className="">{dates.checkout}</p>
              </div>
            </CustomDropdown>
            <div className="col-span-2 pl-6 pr-2 rounded-full flex items-center justify-between hover:bg-gray-100 duration-300">
              <CustomDropdown items={itemsGuest}>
                <div>
                  <p className="font-semibold">Who</p>
                  <p>
                    {guests.adults +
                      guests.children +
                      guests.infants +
                      guests.pets >
                    0
                      ? `${guests.adults + guests.children} guests, ${
                          guests.infants
                        } infants, ${guests.pets} pets`
                      : "Add guests"}
                  </p>
                </div>
              </CustomDropdown>
              <button className="bg-[#FF385C] text-white p-4 rounded-full hover:bg-rose-600 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  style={{
                    display: "block",
                    fill: "none",
                    height: 16,
                    width: 16,
                    stroke: "currentColor",
                    strokeWidth: 4,
                    overflow: "visible",
                  }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fill="none"
                    d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
  const navigate = useNavigate();
  const [idLocation, setIdLocation] = useState(0);
  const [listLocation, setListLocation] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [dates, setDates] = useState({
    checkin: "Add dates",
    checkout: "Add dates",
    date: "Add dates",
  });
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const filteredLocations = useMemo(() => {
    return listLocation.filter(
      (location) =>
        removeAccents(location.tenViTri.toLowerCase()).includes(
          removeAccents(searchValue.toLowerCase())
        ) ||
        removeAccents(location.tinhThanh.toLowerCase()).includes(
          removeAccents(searchValue.toLowerCase())
        )
    );
  }, [searchValue, listLocation]);

  const itemsLocation = useMemo(
    () =>
      filteredLocations.map((item, index) => ({
        key: index.toString(),
        label: (
          <div
            onClick={() => {
              setSearchValue(`${item.tenViTri}, ${item.tinhThanh}`);
              setIdLocation(item.id);
            }}
            className="flex items-center gap-3"
          >
            <img className="w-12 h-10" src={item.hinhAnh} />
            <p>
              {item.tenViTri}, {item.tinhThanh}
            </p>
          </div>
        ),
      })),
    [filteredLocations]
  );

  const onSelectDate = useCallback((type, date) => {
    setDates((prevDates) => ({
      ...prevDates,
      [type]: date ? dayjs(date).format("DD/MM/YYYY") : "Add dates",
    }));
  }, []);

  const itemsCalendar = useCallback(
    (type) => [
      {
        key: "0",
        label: (
          <Calendar
            fullscreen={false}
            onSelect={(date) => onSelectDate(type, date)}
          />
        ),
      },
    ],
    [onSelectDate]
  );

  const updateGuestCount = useCallback((type, action) => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]:
        action === "increment"
          ? prevGuests[type] + 1
          : prevGuests[type] > 0
          ? prevGuests[type] - 1
          : 0,
    }));
  }, []);

  const itemsGuest = useMemo(
    () => [
      {
        key: "1",
        label: (
          <div className="flex justify-between items-center p-5 border-b">
            <div>
              <p className="font-semibold">Adults</p>
              <p className="text-gray-500 text-sm">Ages 13 or above</p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => updateGuestCount("adults", "decrement")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-minus w-5 h-5"></i>
              </button>
              <span className="font-semibold text-base mx-4">
                {guests.adults}
              </span>
              <button
                type="button"
                onClick={() => updateGuestCount("adults", "increment")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-plus w-5 h-5"></i>
              </button>
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div className="flex justify-between items-center p-5 border-b">
            <div>
              <p className="font-semibold">Children</p>
              <p className="text-gray-500 text-sm">Ages 2–12</p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => updateGuestCount("children", "decrement")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-minus w-5 h-5"></i>
              </button>
              <span className="font-semibold text-base mx-4">
                {guests.children}
              </span>
              <button
                type="button"
                onClick={() => updateGuestCount("children", "increment")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-plus w-5 h-5"></i>
              </button>
            </div>
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <div className="flex justify-between items-center p-5 border-b">
            <div>
              <p className="font-semibold">Infants</p>
              <p className="text-gray-500 text-sm">Under 2</p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => updateGuestCount("infants", "decrement")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-minus w-5 h-5"></i>
              </button>
              <span className="font-semibold text-base mx-4">
                {guests.infants}
              </span>
              <button
                type="button"
                onClick={() => updateGuestCount("infants", "increment")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-plus w-5 h-5"></i>
              </button>
            </div>
          </div>
        ),
      },
      {
        key: "4",
        label: (
          <div className="flex justify-between items-center p-5">
            <div>
              <p className="font-semibold">Pets</p>
              <p className="text-gray-500 text-sm">
                Bringing a service animal?
              </p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => updateGuestCount("pets", "decrement")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-minus w-5 h-5"></i>
              </button>
              <span className="font-semibold text-base mx-4">
                {guests.pets}
              </span>
              <button
                type="button"
                onClick={() => updateGuestCount("pets", "increment")}
                className="px-1 py-[2px] rounded-full border border-black dark:border-white opacity-60 hover:opacity-100 duration-300"
              >
                <i className="fa-regular fa-plus w-5 h-5"></i>
              </button>
            </div>
          </div>
        ),
      },
    ],
    [guests, updateGuestCount]
  );

  const handleOpenLocation = (open) => {
    setLocationOpen(open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${pathDefault.listRooms}?idLocation=${idLocation}`);
  };

  const tabs = [
    {
      key: "1",
      label: t("header.navbar.stays"),
      content: (
        <form
          onSubmit={handleSubmit}
          className="text-gray-600 dark:text-white border lg:w-[900px] rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 items-center text-sm">
            <div className="sm:col-span-2 px-2 sm:px-6 py-2 sm:py-4 rounded-full flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 duration-300">
              <Dropdown
                menu={{
                  items: itemsLocation,
                }}
                trigger={["click"]}
                open={locationOpen}
                onOpenChange={handleOpenLocation}
                overlayStyle={{ paddingTop: "20px" }}
              >
                <div className="lg:w-full">
                  <p className="text-xs sm:text-sm font-semibold block">
                    {t("header.navbar.where")}
                  </p>
                  <input
                    className="text-xs sm:text-sm bg-transparent focus-visible:outline-none"
                    type="text"
                    placeholder={t("header.navbar.searchDestination")}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      if (!locationOpen) {
                        setLocationOpen(true);
                      }
                    }}
                  />
                </div>
              </Dropdown>
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className={`w-6 h-6 hidden md:flex justify-center items-center rounded-full hover:bg-gray-300 ${
                  searchValue ? "" : "md:hidden"
                }`}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
            <CustomDropdown
              items={itemsCalendar("checkin")}
              classWrapper="px-4 sm:px-6 border-l"
              classContent="-left-24"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold">
                  {t("header.navbar.checkin")}
                </p>
                <p className="text-xs sm:text-sm">{dates.checkin}</p>
              </div>
            </CustomDropdown>
            <CustomDropdown
              items={itemsCalendar("checkout")}
              classWrapper="px-4 sm:px-6 border-x"
              classContent="-left-24"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold">
                  {t("header.navbar.checkout")}
                </p>
                <p className="text-xs sm:text-sm">{dates.checkout}</p>
              </div>
            </CustomDropdown>
            <div className="sm:col-span-2 pl-2 sm:pl-6 pr-2 rounded-full flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 duration-300">
              <CustomDropdown
                items={itemsGuest}
                classContent="-left-56 md:-left-28 lg:left-0"
              >
                <div className="w-40 min-[524px]:w-full sm lg:w-52">
                  <p className="text-xs sm:text-sm font-semibold">
                    {t("header.navbar.who")}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {guests.adults +
                      guests.children +
                      guests.infants +
                      guests.pets >
                    0
                      ? `${guests.adults + guests.children} guests, ${
                          guests.infants
                        } infants, ${guests.pets} pets`
                      : t("header.navbar.addGuests")}
                  </p>
                </div>
              </CustomDropdown>
              <button
                type="submit"
                className="bg-[#FF385C] text-white p-2 sm:p-4 rounded-full hover:bg-rose-600 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="block fill-none h-2 w-2 sm:h-4 sm:w-4 stroke-current stroke-[4] overflow-visible"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fill="none"
                    d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      ),
    },
    {
      key: "2",
      label: "Experiences",
      content: (
        <div className="text-gray-600 border w-full md:w-[900px] rounded-full shadow-sm hover:shadow-md duration-300 cursor-pointer">
          <div className="grid grid-cols-6 items-center text-sm">
            <div className="col-span-2 pl-6 py-4 rounded-full hover:bg-gray-100 duration-300">
              <Dropdown
                menu={{
                  items: itemsLocation,
                }}
                trigger={["click"]}
                open={locationOpen}
                onOpenChange={handleOpenLocation}
                overlayStyle={{ paddingTop: "20px" }}
              >
                <div>
                  <button className="font-semibold block">Where</button>
                  <input
                    className="bg-transparent focus-visible:outline-none"
                    type="text"
                    placeholder="Search destinations"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value), setLocationOpen(true);
                    }}
                  />
                </div>
              </Dropdown>
            </div>
            <CustomDropdown
              items={itemsCalendar("date")}
              classCustom="col-span-2 pl-6 border-x"
            >
              <div>
                <p className="font-semibold">Date</p>
                <p className="">{dates.date}</p>
              </div>
            </CustomDropdown>
            <div className="col-span-2 pl-6 pr-2 rounded-full flex items-center justify-between hover:bg-gray-100 duration-300">
              <CustomDropdown items={itemsGuest}>
                <div>
                  <p className="font-semibold">Who</p>
                  <p>
                    {guests.adults +
                      guests.children +
                      guests.infants +
                      guests.pets >
                    0
                      ? `${guests.adults + guests.children} guests, ${
                          guests.infants
                        } infants, ${guests.pets} pets`
                      : "Add guests"}
                  </p>
                </div>
              </CustomDropdown>
              <button className="bg-[#FF385C] text-white p-4 rounded-full hover:bg-rose-600 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  style={{
                    display: "block",
                    fill: "none",
                    height: 16,
                    width: 16,
                    stroke: "currentColor",
                    strokeWidth: 4,
                    overflow: "visible",
                  }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fill="none"
                    d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      key: "2",
      label: t("header.navbar.experiences"),
      content: (
        <form
          onSubmit={handleSubmit}
          className="text-gray-600 dark:text-white border lg:w-[900px] rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="grid grid-cols-3 sm:grid-cols-6 items-center text-sm">
            <div className="sm:col-span-2 px-2 sm:px-6 py-2 sm:py-4 rounded-full flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 duration-300">
              <Dropdown
                menu={{
                  items: itemsLocation,
                }}
                trigger={["click"]}
                open={locationOpen}
                onOpenChange={handleOpenLocation}
                overlayStyle={{ paddingTop: "20px" }}
              >
                <div className="lg:w-full">
                  <p className="text-xs sm:text-sm font-semibold block">
                    {t("header.navbar.where")}
                  </p>
                  <input
                    className="text-xs sm:text-sm bg-transparent focus-visible:outline-none"
                    type="text"
                    placeholder={t("header.navbar.searchDestination")}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      if (!locationOpen) {
                        setLocationOpen(true);
                      }
                    }}
                  />
                </div>
              </Dropdown>
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className={`w-6 h-6 hidden md:flex justify-center items-center rounded-full hover:bg-gray-300 ${
                  searchValue ? "" : "md:hidden"
                }`}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
            <CustomDropdown
              items={itemsCalendar("date")}
              classWrapper="sm:col-span-2 pl-6 border-x"
              classContent="-left-24"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold">
                  {t("header.navbar.date")}
                </p>
                <p className="text-xs sm:text-sm">{dates.date}</p>
              </div>
            </CustomDropdown>
            <div className="sm:col-span-2 pl-2 sm:pl-6 pr-2 rounded-full flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 duration-300">
              <CustomDropdown
                items={itemsGuest}
                classContent="-left-56 md:-left-28 lg:left-0"
              >
                <div className="w-40 min-[524px]:w-full sm lg:w-52">
                  <p className="text-xs sm:text-sm font-semibold">
                    {t("header.navbar.who")}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {guests.adults +
                      guests.children +
                      guests.infants +
                      guests.pets >
                    0
                      ? `${guests.adults + guests.children} guests, ${
                          guests.infants
                        } infants, ${guests.pets} pets`
                      : t("header.navbar.addGuests")}
                  </p>
                </div>
              </CustomDropdown>
              <button
                type="submit"
                className="bg-[#FF385C] text-white p-2 sm:p-4 rounded-full hover:bg-rose-600 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="block fill-none h-2 w-2 sm:h-4 sm:w-4 stroke-current stroke-[4] overflow-visible"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fill="none"
                    d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const [isBlack, setIsBlack] = useState(false);
  const handleClickLogo = () => {
    setIsBlack(!isBlack);
  };

  const [scrollY, setScrollY] = useState(0);
  const debouncedScrollY = useDebounce(scrollY, 100);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsScroll(debouncedScrollY > 100);
  }, [debouncedScrollY]);

  useEffect(() => {
    viTriService
      .getLocations()
      .then((res) => {
        setListLocation(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const [scrollY, setScrollY] = useState(0);
  const debouncedScrollY = useDebounce(scrollY, 100);
  const [isScroll, setIsScroll] = useState(false);

  const { isMobile } = useResponsive();

  useEffect(() => {
    if (isMobile) {
      setActiveTab(tabs[1].key);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsScroll(debouncedScrollY > 100);
  }, [debouncedScrollY]);

  useEffect(() => {
    viTriService
      .getLocations()
      .then((res) => {
        setListLocation(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="bg-white py-5 border-b sticky top-0 z-10">
      <Container>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div
            onClick={handleClickLogo}
            className={`cursor-pointer hover:text-[#ff385c] duration-300 ${
              isBlack ? "text-black" : "text-[#ff385c]"
            }`}
          >
            <IconLogoHeader />
          </div>

          {/* Navbar or Tabs header*/}
          {isScroll ? (
            <Navbar />
          ) : (
            <div className="tabs-header flex gap-4 ">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`px-4 py-2 text-gray-600 rounded-full ${
                    activeTab === tab.key
                      ? "font-semibold"
                      : "hover:bg-gray-100 hover:text-black duration-300"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* User actions */}
          <UserMenu />
    <header className="bg-white dark:bg-gray-900 py-3 sm:py-4 lg:py-5 border-b sticky top-0 z-10">
      <Container>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <LogoHeader />

          {/* Navbar or Tabs header*/}
          {isScroll ? (
            <Navbar setLocationOpen={setLocationOpen} />
          ) : (
            <div className="tabs-header hidden sm:flex gap-4 ">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  className={`px-4 py-2 text-gray-600 dark:text-white rounded-full ${
                    activeTab === tab.key
                      ? "font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black duration-300"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* User actions */}
          <UserMenu />
        </div>

        {/* Tabs content */}
        {!isScroll && (
          <div className="flex justify-center mt-4 ">
            {tabs.map(
              (tab) =>
                activeTab === tab.key && (
                  <div
                    key={tab.key}
                    className={`tab-pane ${
                      activeTab === tab.key ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {tab.content}
                  </div>
                )
            )}
          </div>
        )}
      </Container>

        {/* Tabs content */}
        {!isScroll && (
          <div className="flex justify-center mt-4">
            {tabs.map(
              (tab) =>
                activeTab === tab.key && (
                  <div
                    key={tab.key}
                    className={`tab-pane shadow-lg rounded-full`}
                  >
                    {tab.content}
                  </div>
                )
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
