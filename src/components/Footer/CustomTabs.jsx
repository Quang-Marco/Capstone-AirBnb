import { useState } from "react";
import { useTranslation } from "react-i18next";

const CustomTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      tabName: t("footer.tabName.popular"),
      tabList: [
        {
          name: "Canmore",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "Benalmádena",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Marbella",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Mijas",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Prescott",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "Scottsdale",
          content: t("footer.tabList.rentalsWithPools"),
        },
        {
          name: "Tucson",
          content: t("footer.tabList.petFriendlyRentals"),
        },
        {
          name: "Jasper",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Mountain View",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Devonport",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "Mallacoota",
          content: t("footer.tabList.petFriendlyRentals"),
        },
        {
          name: "Ibiza",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Anaheim",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "Monterey",
          content: t("footer.tabList.bungalowRentals"),
        },
        {
          name: "Paso Robles",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Santa Barbara",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Sonoma",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "La Serena",
          content: t("footer.tabList.beachfrontRentals"),
        },
      ],
    },
    {
      tabName: t("footer.tabName.arts"),
      tabList: [
        {
          name: "Phoenix",
          content: t("footer.tabList.villaRentals"),
        },
        {
          name: "Hot Springs",
          content: t("footer.tabList.lakehouseRentals"),
        },
        {
          name: "Los Angeles",
          content: "Bed and breakfasts",
        },
        {
          name: "San Diego",
          content: t("footer.tabList.bungalowRentals"),
        },
        {
          name: "San Francisco",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Barcelona",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Prague",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Washington",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Keswick",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "London",
          content: t("footer.tabList.villaRentals"),
        },
        {
          name: "Scarborough",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Sherwood Forest",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "York",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "Paris",
          content: t("footer.tabList.villaRentals"),
        },
        {
          name: "Rhodes",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "Nashville",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Dublin",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Florence",
          content: t("footer.tabList.villaRentals"),
        },
      ],
    },
    {
      tabName: t("footer.tabName.outdoors"),
      tabList: [
        {
          name: "Lake Martin",
          content: t("footer.tabList.lakehouseRentals"),
        },
        {
          name: "Banff",
          content: t("footer.tabList.chaletRentals"),
        },
        {
          name: "Nerja",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "Greer",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Lake Havasu City",
          content: t("footer.tabList.condoRentals"),
        },
        {
          name: "Lake Powell",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "North Rim",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Payson",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Pinetop-Lakeside",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Red Rock",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Dinner Plain",
          content: t("footer.tabList.petFriendlyRentals"),
        },
        {
          name: "Streaky Bay",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Emerald Lake",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Vancouver Island",
          content: t("footer.tabList.condoRentals"),
        },
        {
          name: "Victoria",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Idyllwild-Pine Cove",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Mammoth Lakes",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Palm Desert",
          content: t("footer.tabList.petFriendlyRentals"),
        },
      ],
    },
    {
      tabName: t("footer.tabName.mountains"),
      tabList: [
        {
          name: "Mentone",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Sedona",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Helen",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Pine Mountain",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Stone Mountain",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Island Park",
          content: t("footer.tabList.cabinRentals"),
        },
        {
          name: "Blue Mountains",
          content: t("footer.tabList.chaletRentals"),
        },
        {
          name: "Asheville",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Blowing Rock",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "Boone",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Hochatown",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Pigeon Forge",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Townsend",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Wears Valley",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Cabins",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Santa Barbara",
          content: t("footer.tabList.houseRentals"),
        },
        {
          name: "Sonoma",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "Benalmádena",
          content: t("footer.tabList.houseRentals"),
        },
      ],
    },
    {
      tabName: t("footer.tabName.beach"),
      tabList: [
        {
          name: "Dauphin Island",
          content: t("footer.tabList.petFriendlyRentals"),
        },
        {
          name: "Fort Morgan",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Gulf Shores",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Bruny Island",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Crescent Head",
          content: t("footer.tabList.petFriendlyRentals"),
        },
        {
          name: "Gerringong",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Hamilton Island",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "Lancelin",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Melbourne Beach",
          content: t("footer.tabList.beachfrontRentals"),
        },
        {
          name: "Moonta Bay",
          content: t("footer.tabList.beachfrontRentals"),
        },
        {
          name: "Ocean Grove",
          content: t("footer.tabList.beachfrontRentals"),
        },
        {
          name: "Majorca",
          content: t("footer.tabList.cottageRentals"),
        },
        {
          name: "Big Sur",
          content: t("footer.tabList.beachfrontRentals"),
        },
        {
          name: "Bodega Bay",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Cambria",
          content: t("footer.tabList.petFriendlyRentals"),
        },
        {
          name: "Cayucos",
          content: t("footer.tabList.vacationRentals"),
        },
        {
          name: "Huntington Beach",
          content: t("footer.tabList.apartmentRentals"),
        },
        {
          name: "la Jolla Shores Beach",
          content: t("footer.tabList.vacationRentals"),
        },
      ],
    },
    {
      tabName: t("footer.tabName.unique"),
      tabList: [
        {
          name: "Cabins",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Treehouses",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Glamping",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Tiny Houses",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Beach Houses",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Campers and RVs",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Lakehouses",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Yurt Rentals",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Yurt Rentals",
          content: t("footer.tabList.unitedKingdom"),
        },
        {
          name: "Castle Rentals",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Houseboats",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Holiday Caravans",
          content: t("footer.tabList.unitedKingdom"),
        },
        {
          name: "Private Island Rentals",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Farm Houses",
          content: t("footer.tabList.unitedStates"),
        },
        {
          name: "Farm Cottages",
          content: t("footer.tabList.unitedKingdom"),
        },
        {
          name: t("footer.tabList.cabinRentals"),
          content: t("footer.tabList.australia"),
        },
        {
          name: "Luxury Cabins",
          content: t("footer.tabList.unitedKingdom"),
        },
        {
          name: "Luxury Cabins",
          content: t("footer.tabList.unitedStates"),
        },
      ],
    },
    {
      tabName: t("footer.tabName.categories"),
      tabList: [
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
      tabName: t("footer.tabName.things"),
      tabList: [
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
      tabName: t("footer.tabName.travelTips"),
      tabList: [
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
      tabName: t("footer.tabName.apartments"),
      tabList: [
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

  return (
    <div>
      {/* Tab Headers */}
      <div className="tabs-headers dark:text-white flex gap-5 lg:gap-7 overflow-x-auto my-4">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            className={`tab-button font-semibold whitespace-nowrap pb-2 border-b-[3px] opacity-60 hover:opacity-100 focus:opacity-100 duration-300 ${
              activeTab === index ? "border-black dark:border-white" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tabs[activeTab].tabList.map((item, index) => (
          <div key={index} className="tab-item cursor-pointer">
            <h4 className="text-sm sm:text-base dark:text-white font-semibold hover:underline duration-300">
              {item.name}
            </h4>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTabs;
