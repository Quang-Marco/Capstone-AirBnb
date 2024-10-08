import { useTranslation } from "react-i18next";
import { Dropdown, Space } from "antd";

const LanguageSwitcher = ({ trigger = ["click"], classContent = "" }) => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const items = [
    {
      key: "en",
      label: (
        <button onClick={handleChange} value="en">
          English
        </button>
      ),
    },
    {
      key: "vi",
      label: (
        <button onClick={handleChange} value="vi">
          Tiếng Việt
        </button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={trigger}
      className={`cursor-pointer dark:text-white font-semibold py-2 px-4 rounded-full duration-300 ${classContent}`}
    >
      <Space>
        <i className="fa-regular fa-globe"></i>
        {i18n.language === "en" ? "English" : "Tiếng Việt"}
      </Space>
    </Dropdown>
  );
};

export default LanguageSwitcher;
