import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import LanguageSwitcher from "../LanguageSwicher";

const Footer = () => {
  const { t } = useTranslation();
  const { listLanguages, listCurrency } = useSelector(
    (state) => state.listSlice
  );

  const [isModalLanguageOpen, setIsModalLanguageOpen] = useState(false);
  const toggleModalLanguage = () => setIsModalLanguageOpen((prev) => !prev);
  const [isModalCurrencyOpen, setIsModalCurrencyOpen] = useState(false);
  const toggleModalCurrency = () => setIsModalCurrencyOpen((prev) => !prev);

  const listTabs = [
    {
      tabName: "Popular",
      subList: [
        {
          name: "Canmore",
          content: "Apartment rentals",
        },
        {
          name: "Benalmádena",
          content: "House rentals",
        },
        {
          name: "Marbella",
          content: "House rentals",
        },
        {
          name: "Mijas",
          content: "House rentals",
        },
        {
          name: "Prescott",
          content: "Cottage rentals",
        },
        {
          name: "Scottsdale",
          content: "Rentals with pools",
        },
        {
          name: "Tucson",
          content: "Pet-friendly rentals",
        },
        {
          name: "Jasper",
          content: "Cabin rentals",
        },
        {
          name: "Mountain View",
          content: "Cabin rentals",
        },
        {
          name: "Devonport",
          content: "Cottage rentals",
        },
        {
          name: "Mallacoota",
          content: "Beach house rentals",
        },
        {
          name: "Ibiza",
          content: "Vacation rentals",
        },
        {
          name: "Anaheim",
          content: "Family-friendly rentals",
        },
        {
          name: "Monterey",
          content: "Bungalow rentals",
        },
        {
          name: "Paso Robles",
          content: "House rentals",
        },
        {
          name: "Santa Barbara",
          content: "House rentals",
        },
        {
          name: "Sonoma",
          content: "Cottage rentals",
        },
        {
          name: "La Serena",
          content: "Beachfront rentals",
        },
      ],
    },
    {
      tabName: "Arts & culture",
      subList: [
        {
          name: "Phoenix",
          content: "Villa rentals",
        },
        {
          name: "Hot Springs",
          content: "Lakehouse rentals",
        },
        {
          name: "Los Angeles",
          content: "Bed and breakfasts",
        },
        {
          name: "San Diego",
          content: "Bungalow rentals",
        },
        {
          name: "San Francisco",
          content: "Vacation rentals",
        },
        {
          name: "Barcelona",
          content: "Vacation rentals",
        },
        {
          name: "Prague",
          content: "Vacation rentals",
        },
        {
          name: "Washington",
          content: "House rentals",
        },
        {
          name: "Keswick",
          content: "Apartment rentals",
        },
        {
          name: "London",
          content: "Villa rentals",
        },
        {
          name: "Scarborough",
          content: "Vacation rentals",
        },
        {
          name: "Sherwood Forest",
          content: "Cabin rentals",
        },
        {
          name: "York",
          content: "Apartment rentals",
        },
        {
          name: "Paris",
          content: "Villa rentals",
        },
        {
          name: "Rhodes",
          content: "Cottage rentals",
        },
        {
          name: "Nashville",
          content: "Vacation rentals",
        },
        {
          name: "Dublin",
          content: "House rentals",
        },
        {
          name: "Florence",
          content: "Villa rentals",
        },
      ],
    },
    {
      tabName: "Outdoors",
      subList: [
        {
          name: "Lake Martin",
          content: "Lakehouse rentals",
        },
        {
          name: "Banff",
          content: "Chalet rentals",
        },
        {
          name: "Nerja",
          content: "Apartment rentals",
        },
        {
          name: "Greer",
          content: "Cabin rentals",
        },
        {
          name: "Lake Havasu City",
          content: "Condo rentals",
        },
        {
          name: "Lake Powell",
          content: "Vacation rentals",
        },
        {
          name: "North Rim",
          content: "Vacation rentals",
        },
        {
          name: "Payson",
          content: "Vacation rentals",
        },
        {
          name: "Pinetop-Lakeside",
          content: "Cabin rentals",
        },
        {
          name: "Red Rock",
          content: "Cabin rentals",
        },
        {
          name: "Dinner Plain",
          content: "Pet-friendly rentals",
        },
        {
          name: "Streaky Bay",
          content: "Vacation rentals",
        },
        {
          name: "Emerald Lake",
          content: "Cabin rentals",
        },
        {
          name: "Vancouver Island",
          content: "Condo rentals",
        },
        {
          name: "Victoria",
          content: "Cabin rentals",
        },
        {
          name: "Idyllwild-Pine Cove",
          content: "Cabin rentals",
        },
        {
          name: "Mammoth Lakes",
          content: "Vacation rentals",
        },
        {
          name: "Palm Desert",
          content: "Pet-friendly rentals",
        },
      ],
    },
    {
      tabName: "Mountains",
      subList: [
        {
          name: "Mentone",
          content: "Cabin rentals",
        },
        {
          name: "Sedona",
          content: "House rentals",
        },
        {
          name: "Helen",
          content: "Cabin rentals",
        },
        {
          name: "Pine Mountain",
          content: "Vacation rentals",
        },
        {
          name: "Stone Mountain",
          content: "Cabin rentals",
        },
        {
          name: "Island Park",
          content: "Cabin rentals",
        },
        {
          name: "Blue Mountains",
          content: "Chalet rentals",
        },
        {
          name: "Asheville",
          content: "House rentals",
        },
        {
          name: "Blowing Rock",
          content: "Cottage rentals",
        },
        {
          name: "Boone",
          content: "Vacation rentals",
        },
        {
          name: "Hochatown",
          content: "Vacation rentals",
        },
        {
          name: "Pigeon Forge",
          content: "Vacation rentals",
        },
        {
          name: "Townsend",
          content: "Vacation rentals",
        },
        {
          name: "Wears Valley",
          content: "Vacation rentals",
        },
        {
          name: "Cabins",
          content: "Vacation rentals",
        },
        {
          name: "Santa Barbara",
          content: "House rentals",
        },
        {
          name: "Sonoma",
          content: "Cottage rentals",
        },
        {
          name: "Benalmádena",
          content: "House rentals",
        },
      ],
    },
    {
      tabName: "Beach",
      subList: [
        {
          name: "Dauphin Island",
          content: "Pet-friendly rentals",
        },
        {
          name: "Fort Morgan",
          content: "Vacation rentals",
        },
        {
          name: "Gulf Shores",
          content: "Vacation rentals",
        },
        {
          name: "Bruny Island",
          content: "Vacation rentals",
        },
        {
          name: "Crescent Head",
          content: "Pet-friendly rentals",
        },
        {
          name: "Gerringong",
          content: "Vacation rentals",
        },
        {
          name: "Hamilton Island",
          content: "Apartment rentals",
        },
        {
          name: "Lancelin",
          content: "Vacation rentals",
        },
        {
          name: "Melbourne Beach",
          content: "Beach condo rentals",
        },
        {
          name: "Moonta Bay",
          content: "Beachfront rentals",
        },
        {
          name: "Ocean Grove",
          content: "Beachfront rentals",
        },
        {
          name: "Majorca",
          content: "Cottage rentals",
        },
        {
          name: "Big Sur",
          content: "Beach house rentals",
        },
        {
          name: "Bodega Bay",
          content: "Vacation rentals",
        },
        {
          name: "Cambria",
          content: "Pet-friendly rentals",
        },
        {
          name: "Cayucos",
          content: "Vacation rentals",
        },
        {
          name: "Huntington Beach",
          content: "Apartment rentals",
        },
        {
          name: "la Jolla Shores Beach",
          content: "Vacation rentals",
        },
      ],
    },
    {
      tabName: "Unique stays",
      subList: [
        {
          name: "Cabins",
          content: "United States",
        },
        {
          name: "Treehouses",
          content: "United States",
        },
        {
          name: "Glamping",
          content: "United States",
        },
        {
          name: "Tiny Houses",
          content: "United States",
        },
        {
          name: "Beach Houses",
          content: "United States",
        },
        {
          name: "Campers and RVs",
          content: "United States",
        },
        {
          name: "Lakehouses",
          content: "United States",
        },
        {
          name: "Yurt Rentals",
          content: "United States",
        },
        {
          name: "Yurt Rentals",
          content: "United Kingdom",
        },
        {
          name: "Castle Rentals",
          content: "United States",
        },
        {
          name: "Houseboats",
          content: "United States",
        },
        {
          name: "Holiday Caravans",
          content: "United Kingdom",
        },
        {
          name: "Private Island Rentals",
          content: "United States",
        },
        {
          name: "Farm Houses",
          content: "United States",
        },
        {
          name: "Farm Cottages",
          content: "United Kingdom",
        },
        {
          name: "Cabin Rentals",
          content: "Australia",
        },
        {
          name: "Luxury Cabins",
          content: "United Kingdom",
        },
        {
          name: "Luxury Cabins",
          content: "United States",
        },
      ],
    },
    {
      tabName: "Categories",
      subList: [
        {
          name: "Rooms",
          content: "",
        },
        {
          name: "Amazing pools",
          content: "",
        },
        {
          name: "Arctic",
          content: "",
        },
        {
          name: "Camping",
          content: "",
        },
        {
          name: "Campers",
          content: "",
        },
        {
          name: "Castles",
          content: "",
        },
        {
          name: "Containers",
          content: "",
        },
        {
          name: "Countryside",
          content: "",
        },
        {
          name: "Design",
          content: "",
        },
        {
          name: "Earth homes",
          content: "",
        },
        {
          name: "Farms",
          content: "",
        },
        {
          name: "National parks",
          content: "",
        },
        {
          name: "Vineyards",
          content: "",
        },
        {
          name: "OMG!",
          content: "",
        },
        {
          name: "Tiny homes",
          content: "",
        },
        {
          name: "Towers",
          content: "",
        },
        {
          name: "Windmills",
          content: "",
        },
        {
          name: "Luxe",
          content: "",
        },
      ],
    },
    {
      tabName: "Things to do",
      subList: [
        {
          name: "London",
          content: "England",
        },
        {
          name: "Paris",
          content: "Île-de-France",
        },
        {
          name: "New York",
          content: "New York",
        },
        {
          name: "Barcelona",
          content: "Catalonia",
        },
        {
          name: "İstanbul",
          content: "İstanbul",
        },
        {
          name: "Bali",
          content: "Indonesia",
        },
        {
          name: "Amsterdam",
          content: "North Holland",
        },
        {
          name: "Miami",
          content: "Florida",
        },
        {
          name: "Madrid",
          content: "Community of Madrid",
        },
        {
          name: "Los Angeles",
          content: "California",
        },
        {
          name: "Rome",
          content: "Lazio",
        },
        {
          name: "Lisbon",
          content: "Lisbon",
        },
        {
          name: "Tokyo",
          content: "Tokyo",
        },
        {
          name: "Vienna",
          content: "Vienna",
        },
        {
          name: "Athens",
          content: "Greece",
        },
        {
          name: "Prague",
          content: "Czechia",
        },
        {
          name: "Orlando",
          content: "Florida",
        },
        {
          name: "San Francisco",
          content: "California",
        },
      ],
    },
    {
      tabName: "Travel tips & inspiration",
      subList: [
        {
          name: "Family travel hub",
          content: "Tips and inspiration",
        },
        {
          name: "Family budget travel",
          content: "Get there for less",
        },
        {
          name: "Vacation ideas for any budget",
          content: "Make it special without making it spendy",
        },
        {
          name: "Travel Europe on a budget",
          content: "How to take the kids to Europe for less",
        },
        {
          name: "Outdoor adventure",
          content: "Explore nature with the family",
        },
        {
          name: "Bucket list national parks",
          content: "Must-see parks for family travel",
        },
        {
          name: "Kid-friendly state parks",
          content: "Check out these family-friendly hikes",
        },
      ],
    },
    {
      tabName: "Airbnb-friendly apartments",
      subList: [
        {
          name: "Atlanta Metro",
          content: "Georgia",
        },
        {
          name: "Augusta",
          content: "Georgia",
        },
        {
          name: "Austin Metro",
          content: "Texas",
        },
        {
          name: "Birmingham",
          content: "Alabama",
        },
        {
          name: "Boise",
          content: "Idaho",
        },
        {
          name: "Boston Metro",
          content: "Massachusetts",
        },
        {
          name: "Boulder",
          content: "Colorado",
        },
        {
          name: "Charlotte",
          content: "North Carolina",
        },
        {
          name: "Cincinnati",
          content: "Ohio",
        },
        {
          name: "Columbia",
          content: "South Carolina",
        },
        {
          name: "Columbus",
          content: "Ohio",
        },
        {
          name: "Dallas",
          content: "Texas",
        },
        {
          name: "Denver",
          content: "Colorado",
        },
        {
          name: "Fort Worth",
          content: "Texas",
        },
        {
          name: "Frankfort",
          content: "Kentucky",
        },
        {
          name: "Gainesville",
          content: "Florida",
        },
        {
          name: "Greeley",
          content: "Colorado",
        },
        {
          name: "Hoboken",
          content: "New Jersey",
        },
      ],
    },
  ];
  const listFooter = [
    {
      id: 1,
      name: t("footer.support"),
      subList: [
        { id: 1, subName: t("footer.supportSubList.helpCenter") },
        { id: 2, subName: t("footer.supportSubList.airCover") },
        { id: 3, subName: t("footer.supportSubList.antiDiscrimination") },
        { id: 4, subName: t("footer.supportSubList.disabilitySupport") },
        { id: 5, subName: t("footer.supportSubList.cancellationOptions") },
        { id: 6, subName: t("footer.supportSubList.reportConcern") },
      ],
    },
    {
      id: 2,
      name: t("footer.hosting"),
      subList: [
        { id: 1, subName: t("footer.hostingSubList.airbnbYourHome") },
        { id: 2, subName: t("footer.hostingSubList.airCoverHosts") },
        { id: 3, subName: t("footer.hostingSubList.hostingResources") },
        { id: 4, subName: t("footer.hostingSubList.communityForum") },
        { id: 5, subName: t("footer.hostingSubList.hostingResponsibly") },
        { id: 6, subName: t("footer.hostingSubList.airbnbFriendly") },
        { id: 7, subName: t("footer.hostingSubList.hostingClass") },
      ],
    },
    {
      id: 3,
      name: t("footer.airbnb"),
      subList: [
        { id: 1, subName: t("footer.airbnbSubList.newsroom") },
        { id: 2, subName: t("footer.airbnbSubList.newFeatures") },
        { id: 3, subName: t("footer.airbnbSubList.careers") },
        { id: 4, subName: t("footer.airbnbSubList.investors") },
        { id: 5, subName: t("footer.airbnbSubList.giftCards") },
        { id: 6, subName: t("footer.airbnbSubList.emergencyStays") },
      ],
    },
  ];
  const itemsLanguageCurrency = [
    {
      key: "1",
      label: "Language and region",
      children: (
        <>
          <h3 className="text-2xl font-semibold my-5">
            Choose a language and region
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {listLanguages.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg p-3 hover:bg-gray-100 duration-300 ${
                  !index ? "border border-black" : ""
                }`}
              >
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.nation}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Currency",
      children: (
        <>
          <h3 className="text-2xl font-semibold my-5">Choose a currency</h3>
          <div className="grid grid-cols-5 gap-5">
            {listCurrency.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg p-3 hover:bg-gray-100 duration-300 ${
                  !index ? "border border-black" : ""
                }`}
              >
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.symbol}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-10 pb-5">
      <Container>
        <h2 className="dark:text-white text-2xl font-semibold mb-3">
          {t("footer.inspiration")}
        </h2>
        <Tabs
          defaultActiveKey="1"
          items={listTabs.map((item, index) => ({
            key: index + 1,
            label: <h3 className="dark:text-white">{item.tabName}</h3>,
            children: (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {item.subList.map((subItem, subIndex) => (
                  <div key={subIndex + 1} className="cursor-pointer">
                    <h4 className="dark:text-white font-semibold hover:underline duration-300">
                      {subItem.name}
                    </h4>
                    <p className="text-gray-700 dark:text-white">
                      {subItem.content}
                    </p>
                  </div>
                ))}
              </div>
            ),
          }))}
        ></Tabs>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 border-y-2 py-10 mt-10">
          {listFooter.map((item, index) => (
            <div key={index + 1} className="mb-5 lg:mb-0">
              <h4 className="dark:text-white text-sm font-semibold mb-5">
                {item.name}
              </h4>
              <ul className="space-y-3">
                {item.subList.map((subItem, subIndex) => (
                  <li
                    key={subIndex + 1}
                    className="text-sm text-gray-900 dark:text-white cursor-pointer hover:underline duration-300"
                  >
                    {subItem.subName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-between gap-6 flex-col lg:flex-row">
          <div className="text-sm text-gray-700 flex flex-col lg:flex-row gap-6">
            <span className="dark:text-white">© 2024 Airbnb, Inc.</span>
            <span className="dark:text-white">© 2024 Airbnb, Inc.</span>
            <ol className="list-disc flex flex-wrap gap-6">
              <li className="dark:text-white cursor-pointer hover:underline duration-300">
                {t("footer.term")}
              </li>

              <li className="dark:text-white cursor-pointer hover:underline duration-300">
                {t("footer.sitemap")}
              </li>

              <li className="dark:text-white cursor-pointer hover:underline duration-300">
                {t("footer.privacy")}
              </li>

              <li className="dark:text-white cursor-pointer hover:underline duration-300">
                <span className="flex items-center gap-4">
                  {t("footer.yourPrivacy")}{" "}
                  <svg width="26" height="12" fill="none">
                    <rect
                      x="0.5"
                      y="0.5"
                      width="25"
                      height="11"
                      rx="5.5"
                      fill="#fff"
                    ></rect>
                    <path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path>
                    <path
                      d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5"
                      stroke="#06F"
                    ></path>
                    <path
                      d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5"
                      stroke="#fff"
                    ></path>
                    <rect
                      x="0.5"
                      y="0.5"
                      width="25"
                      height="11"
                      rx="5.5"
                      stroke="#06F"
                    ></rect>
                  </svg>
                </span>
              </li>
            </ol>
          </div>
          <div className="text-sm flex items-center gap-5 order-first lg:order-last">
            {/* <button
              onClick={toggleModalLanguage}
              className="dark:text-white font-semibold hover:underline duration-300"
              className="dark:text-white font-semibold hover:underline duration-300"
            >
              <i className="fa-regular fa-globe"></i> {t("footer.language")}
            </button>
            <Modal
              centered
              width={1000}
              footer={[
                <Button key="ok" type="primary" onClick={toggleModalLanguage}>
                  OK
                </Button>,
              ]}
              open={isModalLanguageOpen}
              onOk={toggleModalLanguage}
              onCancel={toggleModalLanguage}
            >
              <Tabs items={itemsLanguageCurrency.slice(0, 1)}></Tabs>
            </Modal> */}

            <LanguageSwitcher classContent="hover:underline" />

            {/* Currency */}
            <button
              onClick={toggleModalCurrency}
              className="dark:text-white font-semibold"
            >
              $ <span className="hover:underline duration-300">USD</span>
            </button>
            <Modal
              centered
              width={1000}
              footer={[
                <Button key="ok" type="primary" onClick={toggleModalCurrency}>
                  OK
                </Button>,
              ]}
              open={isModalCurrencyOpen}
              onOk={toggleModalCurrency}
              onCancel={toggleModalCurrency}
            >
              <Tabs items={itemsLanguageCurrency.slice(1)}></Tabs>
            </Modal>

            <div className="dark:text-white space-x-5 hidden lg:block">
              <a target="_blank" href="https://www.facebook.com/airbnb">
                <i className="fa-brands fa-square-facebook text-xl hover:opacity-70 duration-300"></i>
              </a>
              <a target="_blank" href="https://x.com/airbnb">
                <i className="fa-brands fa-square-twitter text-xl hover:opacity-70 duration-300"></i>
              </a>
              <a target="_blank" href="https://www.instagram.com/airbnb">
                <i className="fa-brands fa-square-instagram text-xl hover:opacity-70 duration-300"></i>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
