import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  db,
} from "../../config/firebase.config";
import AdminOrdersComp from "../AdminOrders";
import { Avatar, Box, Button } from "@mui/material";
import AdminSettingsModalComp from "../AdminSettingsModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import toast from "react-hot-toast";
import { MdManageHistory } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Result } from "antd";
import AdminAddPrdouctsModalComp from "../AdminAddPrdoucts";
import { Helmet } from "react-helmet-async";
import AdminProductsComp from "../AdminProducts";
import "../../index.scss";
import AdminUserReviewsComp from "../AdminUserReviews";

function AdminDashboardPage() {
  const [userIds, setUserIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminPic, setAdminPic] = useState(null);
  const [adminName, setAdminName] = useState(null);
  const [open, setOpen] = useState(false);
  const [adminAddProductsModalOpen, setAdminAddProductsModalOpen] =
    useState(false);

  useEffect(() => {
    const getAdminPic = async () => {
      try {
        const adminPicDocRef = doc(db, "adminData", "adminPic");
        const adminNameDocRef = doc(db, "adminData", "adminName");
        const adminDocSnap = await getDoc(adminPicDocRef);
        const adminNameDocSnap = await getDoc(adminNameDocRef);
        const adminImageUrl = adminDocSnap.exists()
          ? adminDocSnap.data().adminImageUrl
          : null;
        const adminName = adminNameDocSnap.exists()
          ? adminNameDocSnap.data().adminName
          : null;
        setAdminPic(adminImageUrl);
        setAdminName(adminName);
      } catch (error) {
        toast.error("Error occured in fetching Admin pic. Please! relaod Pic.");
      }
    };
    getAdminPic();
  });

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const usersIdsDocRef = collection(db, "usersUids");
        const usersUidsSnapshot = await getDocs(usersIdsDocRef);

        if (usersUidsSnapshot.empty) {
          console.log("No user IDs found.");
          setLoading(false);
          return;
        }

        const ids = usersUidsSnapshot.docs.map((doc) => doc.id);
        setUserIds(ids);
      } catch (error) {
        console.error("Error fetching user IDs: ", error);
        setLoading(false);
      }
    };
    fetchUserIds();
  }, []);
  useEffect(() => {
    if (userIds.length === 0) return;

    const fetchAllUsersOrders = async () => {
      try {
        const allOrders = [];
        for (const userId of userIds) {
          const ordersRef = collection(db, `usersProducts/${userId}/orders`);
          const ordersSnapshot = await getDocs(ordersRef);

          if (ordersSnapshot.empty) {
            console.log(`No orders found for user ${userId}.`);
            continue;
          }

          ordersSnapshot.forEach((orderDoc) => {
            allOrders.push({
              userUid: userId,
              orderId: orderDoc.id,
              ...orderDoc.data(),
            });
          });
        }
        setOrders(allOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all users' orders: ", error);
        setLoading(false);
      }
    };

    fetchAllUsersOrders();
  }, [userIds]);

  const allUsersPendingOrders = orders.filter(
    (order) => order.orderStatus === "pending"
  );
  const allUsersDeliveredOrdered = orders.filter(
    (order) => order.orderStatus === "delivered"
  );
  const allUsersCancelledOrders = orders.filter(
    (order) => order.orderStatus === "cancelled"
  );

  const handleViewDetails = () => {
    setOpen(true);
  };
  const handleAddProductsModal = () => {
    setAdminAddProductsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <Box>
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="Falavor Folio About Us"
          content="Explore our deceny dashboard."
        />
        <meta
          name="user dashboard"
          content="settings, update email, update pasword, upload picture, order profgress"
        />
      </Helmet>
      <div className="flex flex-col justify-center items-center gap-5 m-3">
        <div className="adminNavbar flex justify-between items-center w-full rounded-lg p-2">
          <div className="adminLeft adminName">
            <h2 className="text-xl font-medium text-white">
              {adminName ? adminName : "Admin"}
            </h2>
          </div>
          <div className="adminRight flex justify-center items-center gap-4">
            <div className="adminPic">
              <Avatar alt="" sx={{ width: 40, height: 40 }}>
                <LazyLoadImage
                  effect="blur"
                  src={adminPic ? adminPic : ""}
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
            <div className="adminModal">
              <Button
                startIcon={<IoIosSettings />}
                className="adminSettingsModalBtn"
                onClick={handleViewDetails}
              >
                Admin Settings
              </Button>
            </div>
            <div className="addProductBtn">
              <Button
                startIcon={<MdManageHistory />}
                className="adminAddProductsModalBtn"
                onClick={handleAddProductsModal}
              >
                Add Products
              </Button>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold">Admin Products</h2>
        <AdminProductsComp />
        <h2 className="text-xl font-bold">User Reviews</h2>
        <AdminUserReviewsComp />
        <h2 className="text-xl font-bold">Clients Orders</h2>
        {orders.length > 0 ? (
          <AdminOrdersComp
            orders={orders}
            allUsersCancelledOrders={allUsersCancelledOrders}
            allUsersDeliveredOrdered={allUsersDeliveredOrdered}
            allUsersPendingOrders={allUsersPendingOrders}
          />
        ) : (
          <div>
            <Result
              status="warning"
              title="There are some problems.Please reload page. if this error continue. Please, contact us to our team."
            />
          </div>
        )}
        <AdminSettingsModalComp open={open} setOpen={setOpen} />
        <AdminAddPrdouctsModalComp
          adminAddProductsModalOpen={adminAddProductsModalOpen}
          setAdminAddProductsModalOpen={setAdminAddProductsModalOpen}
        />
      </div>
    </Box>
  );
}

export default AdminDashboardPage;
