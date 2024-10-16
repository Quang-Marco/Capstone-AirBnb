import { useContext } from "react";
import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import LanguageSwitcher from "../LanguageSwicher";
import { ThemeContext } from "../ThemeContext";
import { getLocalStorage } from "../../utils/utils";
import { NotificationContext } from "../../App";
import { useTranslation } from "react-i18next";

const UserMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);
  const { toggleTheme } = useContext(ThemeContext);
  const user = getLocalStorage("user");

  const itemsUser = [
    {
      key: "1",
      label: !user ? (
        <Link
          to={pathDefault.register}
          className="block p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300"
        >
          {t("header.user.signup")}
        </Link>
      ) : null,
    },
    {
      key: "2",
      label: !user ? (
        <Link
          to={pathDefault.login}
          className="block p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300"
        >
          {t("header.user.login")}
        </Link>
      ) : null,
    },
    {
      key: "3",
      label: user ? (
        <Link
          to={pathDefault.profile}
          className="block p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300"
        >
          {t("header.user.profile")}
        </Link>
      ) : null,
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
    {
      key: "7",
      label: user ? (
        <div
          onClick={() => {
            localStorage.removeItem("user");
            handleNotification("User logged out successfully", "success");
            navigate(pathDefault.homePage);
          }}
          className="p-2 cursor-pointer text-sm hover:bg-gray-100 duration-300"
        >
          {t("header.user.logout")}
        </div>
      ) : null,
    },
  ];

  return (
    <div>
      <LanguageSwitcher classContent="hidden sm:inline-flex text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" />

      <button
        onClick={toggleTheme}
        className="px-2.5 py-2 rounded-full text-gray-600 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 duration-300"
      >
        <i className="fa-regular fa-lightbulb-on text-orange-500 dark:hidden"></i>
        <i className="fa-regular fa-lightbulb w-5 hidden dark:inline-block"></i>
      </button>

      <Dropdown
        menu={{
          items: itemsUser.filter((item) => item.label !== null),
        }}
        trigger={["click"]}
        className="cursor-pointer px-2 sm:px-4 py-1 sm:py-2 ml-2 rounded-full border hover:shadow-md duration-300"
      >
        <Space>
          <i className="fa-regular fa-bars dark:text-white"></i>
          {user?.user.avatar ? (
            <img
              className="w-8 h-8 rounded-full"
              src={user?.user.avatar}
              alt="avatar"
            />
          ) : (
            <i className="fa-solid fa-circle-user text-gray-500 dark:text-white text-2xl ml-1 sm:ml-2"></i>
          )}
        </Space>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
