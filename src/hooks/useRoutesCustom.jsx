import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import Body from "../components/Body/Body";
import LocationRooms from "../pages/LocationRooms/LocationRooms";
import UserProfile from "../pages/User/UserProfile";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import NotFound from "../pages/NotFound/NotFound";
import ListRoomsPage from "../pages/ListRoomsPage/ListRoomsPage";
import RoomDetail from "../pages/RoomDetail/RoomDetail";

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
        {
          path: "/user-profile",
          element: <UserProfile />,
        },
        {
          path: pathDefault.listRooms,
          element: <ListRoomsPage />,
        },
        {
          path: pathDefault.roomDetail,
          element: <RoomDetail />,
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
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
