import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import Body from "../components/Body/Body";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import ManageUser from "../pages/Manage/ManageUser";
import ManageInfoLocation from "../pages/Manage/ManageInfoLocation";
import ManageInfoRoom from "../pages/Manage/ManageInfoRoom";
import ManageRoomBook from "../pages/Manage/ManageRoomBook";
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
      children: [
        {
          index: true,
          element: <ManageUser />,
        },
        {
          path: "manage-user",
          element: <ManageUser />,
        },
        {
          path: "manage-info-location",
          element: <ManageInfoLocation />,
        },
        {
          path: "manage-info-room",
          element: <ManageInfoRoom />,
        },
        {
          path: "manage-room-book",
          element: <ManageRoomBook />,
        },
      ],
    },
    // {
    //   path: "/admin-login",
    //   element: <AdminLogin />,
    // },
  ]);
  return routes;
};

export default useRoutesCustom;
