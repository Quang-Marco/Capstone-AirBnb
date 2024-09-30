import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import Body from "../components/Body/Body";
import LocationRooms from "../pages/LocationRooms/LocationRooms";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        {
          index: true,
          element: <Body />,
        },
        {
          path: "/location-rooms",
          element: <LocationRooms />,
        },
      ],
    },
    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },
    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
