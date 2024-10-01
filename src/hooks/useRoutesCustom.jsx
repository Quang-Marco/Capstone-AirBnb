import { useRoutes } from "react-router-dom";
import { pathDefault } from "../common/path";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import Body from "../components/Body/Body";
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
  ]);
  return routes;
};

export default useRoutesCustom;
