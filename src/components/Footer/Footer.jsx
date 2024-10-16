import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import LanguageSwitcher from "../LanguageSwicher";
import CustomTabs from "./CustomTabs";

const Footer = () => {
  const { t } = useTranslation();
  const { listLanguages, listCurrency } = useSelector(
    (state) => state.listSlice
  );

  // const [isModalLanguageOpen, setIsModalLanguageOpen] = useState(false);
  // const toggleModalLanguage = () => setIsModalLanguageOpen((prev) => !prev);
  const [isModalCurrencyOpen, setIsModalCurrencyOpen] = useState(false);
  const toggleModalCurrency = () => setIsModalCurrencyOpen((prev) => !prev);

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
        <h2 className="dark:text-white text-2xl sm:text-3xl font-semibold mb-3">
          {t("footer.inspiration")}
        </h2>

        <CustomTabs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 border-y-2 py-10 mt-10">
          {listFooter.map((item, index) => (
            <div key={index + 1} className="mb-5 lg:mb-0">
              <h4 className="dark:text-white text-sm sm:text-base font-semibold mb-5">
                {item.name}
              </h4>
              <ul className="space-y-3">
                {item.subList.map((subItem, subIndex) => (
                  <li
                    key={subIndex + 1}
                    className="text-sm sm:text-base text-gray-900 dark:text-white cursor-pointer hover:underline duration-300"
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
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/Quang-Marco/Capstone-AirBnb"
              >
                <i className="fa-brands fa-square-github text-xl hover:opacity-70 duration-300"></i>
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.facebook.com/airbnb"
              >
                <i className="fa-brands fa-square-facebook text-xl hover:opacity-70 duration-300"></i>
              </a>
              <a rel="noreferrer" target="_blank" href="https://x.com/airbnb">
                <i className="fa-brands fa-square-twitter text-xl hover:opacity-70 duration-300"></i>
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.instagram.com/airbnb"
              >
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
