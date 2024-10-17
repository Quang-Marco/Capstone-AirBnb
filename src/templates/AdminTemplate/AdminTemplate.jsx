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
import { Button, Layout, Menu, theme, Drawer } from "antd";
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
    <Layout className="min-h-screen">
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
        <Header className="p-0 bg-white flex items-center justify-between md:justify-start">
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
