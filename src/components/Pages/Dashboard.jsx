import { useState } from "react";
import { Button, Menu } from "antd";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { RiLogoutCircleLine, RiMenu3Fill, RiMenu2Line } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { GiAstronautHelmet } from "react-icons/gi";
import { MdContacts } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import DashboardNavbarComp from "../DashboardNavbar";
import { auth } from "../../config/firebase.config";
import "../../index.scss";

const DashboardComp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("Logout Successfully.");
        navigate("/signin");
      })
      .catch((error) => {
        toast.error("Please try again.");
      });
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/dashboard/orders");
        break;
      case "3":
        navigate("/contact-us");
        break;
      case "4":
        navigate("/verification");
        break;
      case "5":
        logout();
        break;
      case "6":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

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
      icon: <GiAstronautHelmet color="white" className="w-7 h-7" />,
      label: "Verify",
    },
    {
      key: "5",
      icon: <RiLogoutCircleLine color="white" className="w-7 h-7" />,
      label: "Logout",
    },
    {
      key: "6",
      icon: <IoIosSettings color="white" className="w-7 h-7" />,
      label: "Settings",
    },
  ];

  return (
    <div className="flex">
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
          onClick={handleMenuClick}
        />
      </div>
      <Outlet />
      <DashboardNavbarComp />
    </div>
  );
};

export default DashboardComp;
