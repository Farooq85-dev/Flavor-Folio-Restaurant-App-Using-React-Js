import { useState, useEffect } from "react";
import { collection, getDocs, db } from "../../config/firebase.config";
import AdminOrdersComp from "../AdminOrders";
import { Avatar, Box } from "@mui/material";
import "../../index.scss";

function AdminDashboardPage() {
  const [userIds, setUserIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

        console.log("All fetched orders:", allOrders);
        setOrders(allOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all users' orders: ", error);
        setLoading(false);
      }
    };

    fetchAllUsersOrders();
  }, [userIds]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <Box sx={{ marginRight: "" }}>
      <div className="flex flex-col justify-center items-center gap-5 m-3">
        <div className="adminNavbar flex justify-between items-center w-full bg-pertiary rounded-md p-2">
          <div className="adminName">
            <h2>Muhammad Nasir</h2>
          </div>
          <div className="adminPic">
            <Avatar src="" alt="" />
          </div>
        </div>
        {orders.length > 0 ? (
          <AdminOrdersComp orders={orders} />
        ) : (
          "No orders found"
        )}
      </div>
    </Box>
  );
}

export default AdminDashboardPage;
