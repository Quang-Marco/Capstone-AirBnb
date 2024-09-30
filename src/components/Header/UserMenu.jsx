import React, { useState } from "react";
import { Button, Dropdown, Modal, Space, Tabs } from "antd";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwicher/LanguageSwicher";

const UserMenu = () => {
  const { t } = useTranslation();
  const { listLanguages, listCurrency } = useSelector(
    (state) => state.listSlice
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

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
                <p className=" text-sm">{item.nation}</p>
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
                <p className=" text-sm">{item.symbol}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  const itemsUser = [
    {
      key: "1",
      label: (
        <Link
          to={pathDefault.register}
          className="block p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300"
        >
          {t("header.user.signup")}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to={pathDefault.login}
          className="block p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300"
        >
          {t("header.user.login")}
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <p className="p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300">
          {t("header.user.giftCard")}
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <p className="p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300">
          {t("header.airbnbYourHome")}
        </p>
      ),
    },
    {
      key: "5",
      label: (
        <p className="p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300">
          {t("header.user.experience")}
        </p>
      ),
    },
    {
      key: "6",
      label: (
        <p className="p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300">
          {t("header.user.helpCenter")}
        </p>
      ),
    },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={toggleModal}
        className="text-gray-600 font-semibold py-2 px-3 rounded-full hover:bg-gray-100 duration-300"
      >
        <i className="fa-regular fa-globe"></i>
      </button>
      <Modal
        centered
        width={1000}
        footer={[
          <Button key="ok" type="primary" onClick={toggleModal}>
            OK
          </Button>,
        ]}
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
      >
        <Tabs defaultActiveKey="1" items={itemsLanguageCurrency}></Tabs>
      </Modal>

      <LanguageSwitcher />
      <Dropdown
        menu={{
          items: itemsUser,
        }}
        trigger={["click"]}
        className="cursor-pointer px-4 py-2 ml-2 rounded-full border hover:shadow-md duration-300"
      >
        <Space>
          <i className="fa-regular fa-bars"></i>
          <i className="fa-solid fa-circle-user text-gray-500 text-2xl ml-2"></i>
        </Space>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
