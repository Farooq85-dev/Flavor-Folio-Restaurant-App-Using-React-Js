import { useState } from "react";
import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { RiMenu2Line } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { MdContacts } from "react-icons/md";

import "../../index.scss";

const items = [
  {
    key: "1",
    icon: <IoMdHome color="white" className="w-7 h-7" />,
    label: "Home",
  },
  {
    key: "2",
    icon: <FaBoxOpen color="white" className="w-7 h-7" />,
    label: "Orders",
  },
  {
    key: "3",
    icon: <MdContacts color="white" className="w-7 h-7" />,
    label: "Contact",
  },
  {
    key: "4",
    icon: <RiLogoutCircleLine color="white" className="w-7 h-7" />,
    label: "Logout",
  },
  {
    key: "5",
    icon: <IoIosSettings color="white" className="w-7 h-7" />,
    label: "Setting",
  },
];

const DashboardComp = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: 150,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          position: "absolute",
          top: "1%",
          left: "0.7%",
        }}
      >
        {collapsed ? (
          <RiMenu3Fill color="white" className="w-7 h-7 " />
        ) : (
          <RiMenu2Line color="white" className="w-7 h-7 " />
        )}
      </Button>
      <Menu
        style={{
          paddingTop: "60px",
          height: "100vh",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default DashboardComp;
