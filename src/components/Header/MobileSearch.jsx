import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { Calendar, Collapse, Drawer, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { viTriService } from "../../services/viTri.service";
import dayjs from "dayjs";

const removeAccents = (str) =>
  str
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const MobileSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [listLocation, setListLocation] = useState([]);
  const [idLocation, setIdLocation] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState("Add dates");
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleOpenLocation = (open) => {
    setLocationOpen(open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${pathDefault.listRooms}?idLocation=${idLocation}`);
    setOpen(false);
  };

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

  const tabs = [
    {
      label: t("header.navbar.stays"),
      content: "home",
    },
    {
      label: t("header.navbar.experiences"),
      content: "homse",
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <p className="text-gray-600 font-semibold">
          {t("header.navbar.where")}
        </p>
      ),
      children: (
        <form
          onSubmit={handleSubmit}
          className="text-gray-600 dark:text-white border rounded-md"
        >
          <div className="sm:col-span-2 px-2 sm:px-6 py-2 sm:py-4 rounded-full flex items-center justify-between">
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
                <button
                  type="submit"
                  className="bg-[#FF385C] text-white p-2 mr-2 rounded-full"
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
                <input
                  className="text-xs bg-transparent focus-visible:outline-none"
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
              onClick={() => {
                setSearchValue("");
                setLocationOpen(true);
              }}
              className={`w-6 h-6 justify-center items-center rounded-full ${
                searchValue ? "flex" : "hidden"
              }`}
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
        </form>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex justify-between">
          <p className="text-gray-600 font-semibold">
            {t("header.navbar.when")}
          </p>
          <p className="font-semibold">{dates}</p>
        </div>
      ),
      children: (
        <Calendar
          fullscreen={false}
          onSelect={(date) => setDates(dayjs(date).format("DD/MM/YYYY"))}
        />
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex justify-between">
          <p className="text-gray-600 font-semibold">
            {t("header.navbar.who")}
          </p>
          <p className="font-semibold">
            {guests.adults + guests.children + guests.infants + guests.pets > 0
              ? `${guests.adults + guests.children} guests, ${
                  guests.infants
                } infants, ${guests.pets} pets`
              : t("header.navbar.addGuests")}
          </p>
        </div>
      ),
      children: itemsGuest.map((item, index) => (
        <div key={index} className="p-2">
          {item.label}
        </div>
      )),
    },
  ];

  useEffect(() => {
    viTriService
      .getLocations()
      .then((res) => {
        setListLocation(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sm:hidden">
      <button
        onClick={handleToggle}
        className="flex items-center px-4 py-2 border rounded-full shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="block fill-none h-4 w-4 stroke-current stroke-[4] overflow-visible"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path
            fill="none"
            d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
          />
        </svg>
        <span className="text-xs font-semibold">Where to?</span>
      </button>
      <Drawer
        title={
          <div className="tab-headers dark:text-white flex justify-evenly">
            {tabs.map((tab, index) => (
              <button
                type="button"
                key={index}
                className={`tab-button font-semibold whitespace-nowrap pb-2 border-b-[3px] opacity-60 hover:opacity-100 focus:opacity-100 duration-300 ${
                  activeTab === index ? "border-black dark:border-white" : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        }
        onClose={handleToggle}
        open={open}
        placement="top"
        size="large"
      >
        {/* Tab Content */}
        <div className="tab-content">
          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            ghost
          />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileSearch;
