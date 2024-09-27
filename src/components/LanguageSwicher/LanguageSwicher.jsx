import { useTranslation } from "react-i18next";
import { Dropdown, Space } from "antd";

const LanguageSwitcher = () => {
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
      // trigger={["click"]}
      className="cursor-pointer text-gray-600 font-semibold py-3 px-4 rounded-full hover:bg-gray-100 duration-300"
    >
      <Space>{i18n.language === "en" ? "English" : "Tiếng Việt"}</Space>
    </Dropdown>
  );
};

export default LanguageSwitcher;
