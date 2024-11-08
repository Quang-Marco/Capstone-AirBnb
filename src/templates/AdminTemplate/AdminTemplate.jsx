import { useContext, useEffect, useState } from "react";
import { getLocalStorage } from "../../utils/utils";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Drawer, Tooltip } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";
import { pathDefault } from "../../common/path";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // check role
  useEffect(() => {
    let dataLocal = getLocalStorage("user");
    if (dataLocal.user.role !== "ADMIN") {
      handleNotification(
        "You do not have permission to access this page",
        "error"
      );
      navigate(pathDefault.homePage);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view for width < 768px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen ">
      {isMobile ? (
        <Drawer
          title="Manage Menu"
          placement="left"
          closable={true}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: (
                  <Link
                    to={"/admin/manage-user"}
                    onClick={() => {
                      setTimeout(() => {
                        setDrawerVisible(false);
                      }, 500);
                    }}
                  >
                    User Management
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <Link
                    to={"/admin/manage-info-location"}
                    onClick={() => {
                      setTimeout(() => {
                        setDrawerVisible(false);
                      }, 500);
                    }}
                  >
                    Location Management
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: (
                  <Link
                    to={"/admin/manage-info-room"}
                    onClick={() => {
                      setTimeout(() => {
                        setDrawerVisible(false);
                      }, 500);
                    }}
                  >
                    Room Management
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <BarChartOutlined />,
                label: (
                  <Link
                    to={"/admin/manage-room-book"}
                    onClick={() => {
                      setTimeout(() => {
                        setDrawerVisible(false);
                      }, 500);
                    }}
                  >
                    Booking Management
                  </Link>
                ),
              },
            ]}
          />
        </Drawer>
      ) : (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="hidden md:block"
          breakpoint="md"
          collapsedWidth="100"
        >
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to={"/admin/manage-user"}>User Management</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <Link to={"/admin/manage-info-location"}>
                    Location Management
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: (
                  <Link to={"/admin/manage-info-room"}>Room Management</Link>
                ),
              },
              {
                key: "4",
                icon: <BarChartOutlined />,
                label: (
                  <Link to={"/admin/manage-room-book"}>Booking Management</Link>
                ),
              },
            ]}
          />
        </Sider>
      )}
      <Layout>
        {/* <Header className="p-0 bg-white flex items-center justify-between md:justify-start">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className="w-16 h-16 text-lg md:block hidden"
          />

          <div className="md:hidden grid grid-cols-2  ">
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="w-16 h-16 text-lg "
            />
            <div className="text-lg  font-bold ">Admin Dashboard</div>
          </div>
          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate(pathDefault.homePage)}
            className="bg-blue-500  hover:bg-blue-600 hover:cursor-pointer hover:text-blue-500 "
            aria-label="Go to homepage"
          ></Button>
        </Header> */}
        <Header className="p-0 bg-white flex items-start justify-between md:px-6">
          {/* Desktop Layout */}
          <div className="hidden md:flex  space-y-3 items-center justify-between w-full">
            <Tooltip title={collapsed ? "Show" : "Close "}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="w-12 h-12 text-lg"
                aria-label="Toggle sidebar"
              />
            </Tooltip>
            {/* <div className="flex-1 text-lg font-bold text-center">
              Admin Dashboard
            </div> */}
            <Tooltip title="Back to HomePage">
              <Button
                onClick={() => navigate(pathDefault.homePage)}
                className="bg-blue-500 h-10 w-10  text-xl hover:bg-blue-600 text-white p-2 rounded-full "
              >
                <i className="fa-solid fa-house"></i>
              </Button>
            </Tooltip>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center w-full justify-between mt-2">
            <Tooltip title={"Show"}>
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setDrawerVisible(true)}
                className="w-12 ml-6 h-12 text-lg"
              />
            </Tooltip>
            <div className="flex-1 text-lg font-bold text-center">
              Admin Dashboard
            </div>
            <Tooltip title="Về trang chủ">
              <Button
                onClick={() => navigate(pathDefault.homePage)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 text-md px-3 py-23 mr-6 rounded-2/3"
              >
                <i className="fa-solid fa-house"></i>
              </Button>
            </Tooltip>
          </div>
        </Header>
        <Content
          className="m-4 p-6 min-h-[280px]"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
