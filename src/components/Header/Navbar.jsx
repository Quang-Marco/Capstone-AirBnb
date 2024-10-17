import { useTranslation } from "react-i18next";

const Navbar = ({ setLocationOpen }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLocationOpen(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="hidden sm:block border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between text-gray-600 dark:text-white">
          <div className="text-sm font-semibold px-6">
            {t("header.navbar.anywhere")}
          </div>
          <div className="text-sm font-semibold px-6 border-x flex-1 text-center">
            {t("header.navbar.anyweek")}
          </div>
          <div className="text-sm pl-6 pr-2 flex items-center justify-between gap-3">
            <div>{t("header.navbar.addGuests")}</div>
            <button className="bg-[#FF385C] text-white p-[10px] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                style={{
                  display: "block",
                  fill: "none",
                  height: 12,
                  width: 12,
                  stroke: "currentColor",
                  strokeWidth: "5.333333333333333",
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
    </>
  );
};

export default Navbar;
