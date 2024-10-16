import { useState } from "react";
import { tabs } from "./ListTabs";

const CustomTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="tab-headers dark:text-white flex gap-5 lg:gap-9 overflow-x-auto my-4">
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
      <div className="tab-content grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
