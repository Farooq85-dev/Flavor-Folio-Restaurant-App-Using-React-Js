import { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { RiLogoutCircleLine, RiMenu3Fill, RiMenu2Line } from "react-icons/ri";
import { FaBoxOpen, FaStore } from "react-icons/fa";
import { GiAstronautHelmet } from "react-icons/gi";
import { MdContacts, MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../config/firebase.config";
import SettingsModalComp from "../SettingsModal";
import { Avatar } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useUser } from "../../context/Store";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import BasicLineChart from "../Chart";
import CircularProgressComp from "../CircularProgress";
import AdminSigninModalComp from "../AdminSignin";
import "../../index.scss";

const DashboardComp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartLength, setCartlength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();
  useEffect(() => {
    setCartlength(cartItems.length);
  }, [cartItems]);

  const [maxOrders, setMaxOrders] = useState(30);
  const [userPlacedOrders, setUserPlacedOrders] = useState(0);
  const [userPendingOrders, setUserPendingOrders] = useState(0);
  const [userDeliveredOrders, setUserDeliveredOrders] = useState(0);
  const [userCancelledOrders, setUserCancelledOrders] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user) {
      setUserPlacedOrders(user ? user.userPlacedOrders : userPlacedOrders);
      setUserPendingOrders(user ? user.userPendingOrders : userPendingOrders);
      setUserDeliveredOrders(
        user ? user.userDeilveredOrders : userDeliveredOrders
      );
      setUserCancelledOrders(
        user ? user.userCancelledOrders : userCancelledOrders
      );
      setLoading(false);
    }
  }, [user]);

  const handleAdminOpen = () => {
    setAdminOpen(!adminOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully.");
      navigate("/signin");
    } catch (error) {
      toast.error("Please try again");
    }
  };

  const toSignin = () => {
    navigate("/signin");
  };

  const showCloseModal = () => {
    setOpen(!open);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/visit-store");
        break;
      case "3":
        navigate("/orders");
        break;
      case "4":
        navigate("/contact-us");
        break;
      case "5":
        navigate("/verification");
        break;
      case "6":
        handleLogout();
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
      icon: <FaStore color="white" className="w-7 h-7" />,
      label: "Visit Store",
    },
    {
      key: "3",
      icon: <FaBoxOpen color="white" className="w-7 h-7" />,
      label: "Your Orders",
    },
    {
      key: "4",
      icon: <MdContacts color="white" className="w-7 h-7" />,
      label: "Contact",
    },
    {
      key: "5",
      icon: <GiAstronautHelmet color="white" className="w-7 h-7" />,
      label: "Verify",
    },
    {
      key: "6",
      icon: <RiLogoutCircleLine color="white" className="w-7 h-7" />,
      label: "Logout",
    },
    {
      key: "7",
      icon: (
        <IoIosSettings
          onClick={showCloseModal}
          color="white"
          className="w-7 h-7"
        />
      ),
      label: "Settings",
    },
    {
      key: "8",
      icon: (
        <MdAdminPanelSettings
          onClick={handleAdminOpen}
          color="white"
          className="w-7 h-7"
        />
      ),
      label: "Admin",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="z-[10000]" style={{ width: 150 }}>
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
            <RiMenu3Fill color="white" className="w-7 h-7" />
          ) : (
            <RiMenu2Line color="white" className="w-7 h-7" />
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
          className="dashboardLeftSideNavbar"
          inlineCollapsed={collapsed}
          items={items}
          onClick={handleMenuClick}
        />
        <AdminSigninModalComp
          adminOpen={adminOpen}
          setAdminOpen={setAdminOpen}
        />
        <SettingsModalComp open={open} setOpen={setOpen} />
      </div>
      <div className=" flex-1 p-2">
        <div className="dashboardRightUpperNavbar rounded-lg shadow-md p-2 mb-4">
          <div className="dashboardNavbar flex justify-between items-center gap-4">
            <div className="dashboardNavbarRightSide">
              <p className="text-xl text-white font-semibold">Dashboard</p>
            </div>
            <div className="dashboardNavbarLeftSide flex justify-center items-center gap-2">
              <div className="cartIcon relative cursor-pointer ">
                <CiShoppingCart color="white" className="w-10 h-10" />
                <div className="cartLengthDiv w-6 h-6 text-white bg-secondary rounded-full absolute top-0 left-4 text-center pt-1">
                  {cartLength}
                </div>
              </div>
              <div className="userIcon cursor-pointer">
                <CiUser
                  color="white"
                  onClick={toSignin}
                  className="w-10 h-10"
                />
              </div>
              <div className="cursor-pointer">
                <Avatar alt="" sx={{ width: 40, height: 40 }}>
                  <LazyLoadImage
                    effect="blur"
                    src={user ? user.userPic : ""}
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    width="100%"
                    height="100%"
                  />
                </Avatar>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 gap-4">
          <div className="flex-1 bg-[#f3f3f3] rounded-lg shadow-md p-2">
            <div className="ordersCircle flex justify-evenly items-center">
              <div className="orrdrsPlaced flex flex-col justify-center items-center gap-1">
                <CircularProgressComp
                  totalOrders={userPlacedOrders}
                  maxOrders={maxOrders}
                />
                <p className="font-bold ">Placed Orders</p>
              </div>
              <div className="pendingOrders flex flex-col justify-center items-center gap-1">
                <CircularProgressComp
                  totalOrders={userPendingOrders}
                  maxOrders={maxOrders}
                />
                <p className="font-bold">Pending Orders</p>
              </div>
              <div className="deliveredOrders flex flex-col justify-center items-center gap-1">
                <CircularProgressComp
                  totalOrders={userDeliveredOrders}
                  maxOrders={maxOrders}
                />
                <p className="font-bold">Delivered Orders</p>
              </div>
              <div className="deliveredOrders flex flex-col justify-center items-center gap-1">
                <CircularProgressComp
                  totalOrders={userCancelledOrders}
                  maxOrders={maxOrders}
                />
                <p className="font-bold">Cancelled Orders</p>
              </div>
            </div>
          </div>
          <div className="flex-1 chartsDiv bg-[#f3f3f3] rounded-lg shadow-md p-2 mt-4">
            <h2 className="text-lg font-bold mb-2">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <BasicLineChart />
                </div>
                <div>
                  <p className="font-bold">Charts are Coming Soon!</p>
                </div>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardComp;
